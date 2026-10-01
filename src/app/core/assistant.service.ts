import { Injectable, signal, computed, DestroyRef, inject, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export interface AssistantMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface AssistantOption {
  label: string;
  response: string;
}

const INITIAL_OPTIONS: AssistantOption[] = [
  {
    label: 'Tenho queda capilar',
    response: 'Para uma avaliação adequada, fale com a nossa equipa. Cada caso é único e requer atenção personalizada.',
  },
  {
    label: 'Quero cuidar do meu cabelo',
    response: 'Temos rotinas de cuidado adaptadas ao teu tipo de cabelo. Para uma avaliação adequada, fale com a nossa equipa.',
  },
  {
    label: 'Quero fazer tranças',
    response: 'As nossas técnicas de tranças respeitam a saúde do teu cabelo. Para uma avaliação adequada, fale com a nossa equipa.',
  },
  {
    label: 'Quero conhecer os produtos',
    response: 'A nossa linha de produtos naturais está pensada para a rotina real. Para uma avaliação adequada, fale com a nossa equipa.',
  },
  {
    label: 'Quero marcar atendimento',
    response: 'Pode marcar directamente através do nosso sistema de agendamento ou falar connosco por WhatsApp.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  readonly open = signal(false);
  readonly messages = signal<AssistantMessage[]>([
    {
      sender: 'assistant',
      text: 'Olá! Sou o assistente da Afro Dourado. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
    },
  ]);
  readonly input = signal('');
  readonly isTyping = signal(false);
  readonly options = signal<AssistantOption[]>(INITIAL_OPTIONS);
  readonly canSend = computed(() => this.input().trim().length > 0 && !this.isTyping());

  readonly isSplit = signal(false);
  readonly sbw = signal(0);
  readonly panelWidthPercent = signal(50);

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private modeQuery: MediaQueryList | null = null;
  private resizeHandler: (() => void) | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.modeQuery = window.matchMedia('(min-width: 1024px)');
      this.isSplit.set(this.modeQuery.matches);

      const onModeChange = (e: MediaQueryListEvent) => {
        this.setResizing(false);
        this.isSplit.set(e.matches);
        this.updateSbw();
        this.updateCssVariables();
      };

      this.modeQuery.addEventListener('change', onModeChange);

      this.resizeHandler = () => {
        this.updateSbw();
        this.updateCssVariables();
      };
      window.addEventListener('resize', this.resizeHandler);

      this.destroyRef.onDestroy(() => {
        this.modeQuery?.removeEventListener('change', onModeChange);
        if (this.resizeHandler) {
          window.removeEventListener('resize', this.resizeHandler);
        }
      });
    }

    effect(() => {
      this.open();
      if (isPlatformBrowser(this.platformId) && this.open()) {
        this.updateSbw();
      }
      this.updateCssVariables();
    });

    effect(() => {
      this.isSplit();
      if (isPlatformBrowser(this.platformId) && this.open()) {
        this.updateSbw();
      }
      this.updateCssVariables();
    });
  }

  private updateSbw(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.sbw.set(window.innerWidth - document.documentElement.clientWidth);
  }

  private updateCssVariables(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const root = document.documentElement;
    const open = this.open();
    const split = this.isSplit();

    root.style.setProperty('--assistant-viewport-width', `${window.innerWidth}px`);
    root.style.setProperty('--sbw', `${this.sbw()}px`);
    const assistantWidth = window.innerWidth * this.panelWidthPercent() / 100;
    root.style.setProperty('--assistant-panel-width', `${assistantWidth}px`);
    root.style.setProperty('--assistant-w', open && split ? `${assistantWidth}px` : '0px');
    root.style.setProperty('--assistant-sbw-comp', open && split ? `${this.sbw()}px` : '0px');
    root.setAttribute('data-assistant', open ? 'open' : 'closed');
    root.setAttribute('data-assistant-mode', split ? 'split' : 'full');
  }

  openAssistant(): void {
    this.open.set(true);
  }

  closeAssistant(): void {
    this.open.set(false);
  }

  resizePanel(edgeX: number): void {
    if (!isPlatformBrowser(this.platformId) || !this.isSplit()) return;
    const minColumnWidth = Math.min(320, window.innerWidth / 2);
    const panelWidth = Math.min(
      window.innerWidth - minColumnWidth,
      Math.max(minColumnWidth, window.innerWidth - edgeX),
    );
    this.panelWidthPercent.set((panelWidth / window.innerWidth) * 100);
    this.updateCssVariables();
  }

  setResizing(resizing: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const root = document.documentElement;
    if (resizing) {
      root.setAttribute('data-assistant-resizing', '');
    } else {
      root.removeAttribute('data-assistant-resizing');
    }
  }

  sendMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed || this.isTyping()) return;

    const now = new Date();
    this.messages.update((current) => [
      ...current,
      { sender: 'user', text: trimmed, timestamp: now },
      {
        sender: 'assistant',
        text: 'A funcionalidade de conversa ainda está em desenvolvimento. Para obter ajuda, fale com a nossa equipa.',
        timestamp: new Date(now.getTime() + 1),
      },
    ]);
    this.input.set('');
  }

  resetChat(): void {
    this.messages.set([
      {
        sender: 'assistant',
        text: 'Olá! Sou o assistente da Afro Dourado. Como posso ajudá-lo hoje?',
        timestamp: new Date(),
      },
    ]);
    this.input.set('');
    this.isTyping.set(false);
  }
}
