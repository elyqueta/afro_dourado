import {
  Component,
  inject,
  ChangeDetectionStrategy,
  viewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  PLATFORM_ID,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AssistantService, AssistantMessage } from '@app/core/assistant.service';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';

@Component({
  selector: 'app-afro-assistant-panel',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './afro-assistant-panel.component.html',
  styleUrl: './afro-assistant-panel.component.css',
})
export class AfroAssistantPanelComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  readonly assistant = inject(AssistantService);
  readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');
  readonly panelShell = viewChild<ElementRef<HTMLDivElement>>('panelShell');
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly platformId = inject(PLATFORM_ID);
  private focusTimeout: ReturnType<typeof setTimeout> | null = null;
  private wasOpen = false;
  private previousSplit: boolean | null = null;
  private resizingPointerId: number | null = null;

  constructor() {
    effect(() => {
      const open = this.assistant.open();
      const split = this.assistant.isSplit();
      if (!isPlatformBrowser(this.platformId)) return;

      this.adjustForVisualViewport();
      if (open && !split) {
        this.smoothScroll.stop();
      } else {
        this.smoothScroll.start();
      }

      if (open && (!this.wasOpen || (this.previousSplit === true && !split))) {
        this.schedulePanelFocus();
      } else if (this.wasOpen && !open) {
        this.scheduleFocusOnLauncher();
      }

      this.wasOpen = open;
      this.previousSplit = split;
    });
  }

  private lastMessageCount = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.addEventListener('keydown', this.onDocumentKeydown);
    window.addEventListener('resize', this.adjustForVisualViewport);
    window.visualViewport?.addEventListener('resize', this.adjustForVisualViewport);
    window.visualViewport?.addEventListener('scroll', this.adjustForVisualViewport);
    this.adjustForVisualViewport();
  }

  ngAfterViewChecked(): void {
    const count = this.assistant.messages().length;
    if (count !== this.lastMessageCount) {
      this.lastMessageCount = count;
      this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.onDocumentKeydown);
      window.removeEventListener('resize', this.adjustForVisualViewport);
      window.visualViewport?.removeEventListener('resize', this.adjustForVisualViewport);
      window.visualViewport?.removeEventListener('scroll', this.adjustForVisualViewport);
    }
    if (this.focusTimeout !== null) clearTimeout(this.focusTimeout);
  }

  private onDocumentKeydown = (event: KeyboardEvent): void => {
    if (!this.assistant.open()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.assistant.closeAssistant();
      return;
    }
    if (event.key !== 'Tab' || this.assistant.isSplit()) return;
    const shell = this.panelShell();
    if (!shell) return;

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = shell.nativeElement.querySelectorAll<HTMLElement>(focusableSelector);

    if (focusableElements.length === 0) {
      event.preventDefault();
      shell.nativeElement.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      if (activeElement === first || !shell.nativeElement.contains(activeElement)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (activeElement === last || !shell.nativeElement.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  onSubmit(): void {
    this.assistant.sendMessage(this.assistant.input());
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.assistant.input.set(target.value);
  }

  startResize(event: PointerEvent): void {
    if (event.button !== 0) return;
    event.preventDefault();
    this.resizingPointerId = event.pointerId;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.assistant.setResizing(true);
    this.assistant.resizePanel(event.clientX);
  }

  resize(event: PointerEvent): void {
    if (this.resizingPointerId !== event.pointerId) return;
    this.assistant.resizePanel(event.clientX);
  }

  stopResize(event: PointerEvent): void {
    if (this.resizingPointerId !== event.pointerId) return;
    this.resizingPointerId = null;
    this.assistant.setResizing(false);
  }

  resizeWithKeyboard(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const currentWidth = window.innerWidth * this.assistant.panelWidthPercent() / 100;
    const delta = event.key === 'ArrowLeft' ? 24 : -24;
    this.assistant.resizePanel(window.innerWidth - currentWidth - delta);
  }

  trackByTimestamp(index: number, message: AssistantMessage): string {
    return `${message.sender}-${message.timestamp.getTime()}-${index}`;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer();
    if (!container) return;
    const element = container.nativeElement as HTMLDivElement;
    element.scrollTop = element.scrollHeight;
  }

  private schedulePanelFocus(): void {
    this.scheduleFocus(() => {
      const shell = this.panelShell()?.nativeElement;
      if (!shell || shell.contains(document.activeElement)) return;
      shell.querySelector<HTMLElement>('.close')?.focus();
    });
  }

  private scheduleFocusOnLauncher(): void {
    this.scheduleFocus(() => {
      document.querySelector<HTMLElement>('app-afro-assistant-launcher button')?.focus();
    });
  }

  private scheduleFocus(callback: () => void): void {
    if (this.focusTimeout !== null) clearTimeout(this.focusTimeout);
    this.focusTimeout = setTimeout(() => {
      this.focusTimeout = null;
      callback();
    });
  }

  private adjustForVisualViewport = (): void => {
    if (!isPlatformBrowser(this.platformId)) return;
    const shell = this.panelShell();
    if (!shell) return;

    if (this.assistant.isSplit()) {
      shell.nativeElement.style.removeProperty('--assistant-viewport-height');
      shell.nativeElement.style.removeProperty('--assistant-viewport-top');
      return;
    }

    const viewport = window.visualViewport;
    shell.nativeElement.style.setProperty(
      '--assistant-viewport-height',
      `${viewport?.height ?? window.innerHeight}px`,
    );
    shell.nativeElement.style.setProperty(
      '--assistant-viewport-top',
      `${viewport?.offsetTop ?? 0}px`,
    );
  };
}
