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

function getSimulatedResponse(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('queda') || normalized.includes('quedas')) {
    return 'A queda capilar pode ter várias causas. Recomendamos uma avaliação tricológica para identificar o melhor tratamento para o seu caso.';
  }
  if (normalized.includes('trança') || normalized.includes('pentear') || normalized.includes('protecção')) {
    return 'Temos várias técnicas de tranças e penteados protectivos. Agende uma avaliação para escolhermos o estilo mais adequado.';
  }
  if (normalized.includes('produto') || normalized.includes('óleo') || normalized.includes('shampoo')) {
    return 'A nossa linha de produtos naturais foi pensada para o cabelo afro. Na consulta, indicamos os mais indicados para si.';
  }
  if (normalized.includes('marcar') || normalized.includes('agendar') || normalized.includes('atendimento') || normalized.includes('horário')) {
    return 'Pode marcar diretamente no nosso sistema de agendamento ou falar connosco por WhatsApp.';
  }
  if (normalized.includes('preço') || normalized.includes('valor') || normalized.includes('custo')) {
    return 'Os valores variam conforme o tratamento. Durante a primeira consulta, apresentamos o plano e os valores antes de qualquer procedimento.';
  }
  if (normalized.includes('morada') || normalized.includes('localização') || normalized.includes('unidade') || normalized.includes('luanda') || normalized.includes('huambo')) {
    return 'Estamos em Luanda e Huambo. Pode escolher a unidade mais próxima na página de Contacto.';
  }
  if (normalized.includes('obrigado') || normalized.includes('obrigada')) {
    return 'De nada! Estamos aqui para ajudar. Se precisar de mais informações, não hesite em perguntar.';
  }
  if (normalized.includes('olá') || normalized.includes('oi') || normalized.includes('bom dia') || normalized.includes('boa tarde')) {
    return 'Olá! Como posso ajudá-lo hoje? Pode escolher uma das opções abaixo ou escrever a sua questão.';
  }

  return 'Para uma avaliação adequada, fale com a nossa equipa. Cada caso é único e requer atenção personalizada.';
}

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

  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private modeQuery: MediaQueryList | null = null;
  private resizeHandler: (() => void) | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.modeQuery = window.matchMedia('(min-width: 1024px)');
      this.isSplit.set(this.modeQuery.matches);

      const onModeChange = (e: MediaQueryListEvent) => {
        this.isSplit.set(e.matches);
        if (this.open()) {
          this.updateSbw();
        }
        this.updateCssVariables();
      };

      this.modeQuery.addEventListener('change', onModeChange);

      this.resizeHandler = () => {
        if (this.open()) {
          this.updateSbw();
          this.updateCssVariables();
        }
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

    if (open && split) {
      root.style.setProperty('--assistant-w', '50vw');
      root.setAttribute('data-assistant', 'open');
      root.setAttribute('data-assistant-mode', 'split');
    } else if (open) {
      root.style.setProperty('--assistant-w', '0px');
      root.setAttribute('data-assistant', 'open');
      root.setAttribute('data-assistant-mode', 'full');
    } else {
      root.style.setProperty('--assistant-w', '0px');
      root.setAttribute('data-assistant', 'closed');
      root.removeAttribute('data-assistant-mode');
    }
  }

  openAssistant(): void {
    this.open.set(true);
  }

  closeAssistant(): void {
    this.open.set(false);
  }

  sendMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed || this.isTyping()) return;

    this.messages.update((current) => [
      ...current,
      { sender: 'user', text: trimmed, timestamp: new Date() },
    ]);
    this.input.set('');
    this.isTyping.set(true);

    setTimeout(() => {
      const response = getSimulatedResponse(trimmed);
      this.messages.update((current) => [
        ...current,
        { sender: 'assistant', text: response, timestamp: new Date() },
      ]);
      this.isTyping.set(false);
    }, 700);
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
