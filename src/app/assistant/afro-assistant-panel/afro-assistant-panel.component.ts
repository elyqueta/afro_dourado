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

  constructor() {
    effect(() => {
      const open = this.assistant.open();
      if (!this.assistant.isSplit()) {
        if (open) {
          this.smoothScroll.stop();
        } else {
          this.smoothScroll.start();
        }
      } else {
        this.smoothScroll.start();
      }
    });
  }

  private lastMessageCount = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (window.visualViewport) {
      this.adjustForVisualViewport();
      window.visualViewport.addEventListener('resize', this.adjustForVisualViewport);
    }
  }

  ngAfterViewChecked(): void {
    const count = this.assistant.messages().length;
    if (count !== this.lastMessageCount) {
      this.lastMessageCount = count;
      this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.adjustForVisualViewport);
    }
  }

  onEscape(): void {
    if (this.assistant.open()) {
      this.assistant.closeAssistant();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab' || this.assistant.isSplit()) return;

    const shell = this.panelShell();
    if (!shell) return;

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = shell.nativeElement.querySelectorAll<HTMLElement>(focusableSelector);

    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first || !shell.nativeElement.contains(document.activeElement)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !shell.nativeElement.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  onSubmit(): void {
    this.assistant.sendMessage(this.assistant.input());
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.assistant.input.set(target.value);
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

  private adjustForVisualViewport = (): void => {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.assistant.isSplit()) return;
    if (!window.visualViewport) return;

    const offset = window.innerHeight - window.visualViewport.height;
    const shell = this.panelShell();
    if (shell) {
      shell.nativeElement.style.setProperty('--viewport-offset', `${Math.max(0, offset)}px`);
    }
  };
}
