import { Component, inject, ChangeDetectionStrategy, viewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AssistantService, AssistantMessage } from '@app/core/assistant.service';

@Component({
  selector: 'app-afro-assistant-panel',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (assistant.open()) {
      <div class="overlay" (click)="assistant.closeAssistant()">
        <div class="panel" (click)="$event.stopPropagation()">
          <div class="header">
            <div>
              <p class="eyebrow">Afro Dourado Assist</p>
              <h3 class="title">Como podemos ajudar?</h3>
            </div>
            <div class="header-actions">
              <button type="button" class="reset" (click)="assistant.resetChat()" aria-label="Reiniciar conversa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 3v5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button type="button" class="close" aria-label="Fechar assistente" (click)="assistant.closeAssistant()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="suggestions">
            @for (option of assistant.options(); track option.label) {
              <button type="button" class="chip" (click)="assistant.sendMessage(option.label)">
                {{ option.label }}
              </button>
            }
          </div>

          <div class="messages" #messagesContainer>
            @for (message of assistant.messages(); track trackByTimestamp($index, message)) {
              <div class="message" [class.user]="message.sender === 'user'">
                <div class="bubble">
                  <p class="text">{{ message.text }}</p>
                  <span class="time">{{ formatTime(message.timestamp) }}</span>
                </div>
              </div>
            }
            @if (assistant.isTyping()) {
              <div class="message assistant">
                <div class="bubble typing">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
              </div>
            }
          </div>

          <form class="input-area" (ngSubmit)="onSubmit()">
            <input
              type="text"
              [value]="assistant.input()"
              (input)="onInput($event)"
              placeholder="Escreva a sua mensagem..."
              class="input"
              autocomplete="off"
            />
            <button
              type="submit"
              class="send"
              [disabled]="!assistant.canSend()"
              aria-label="Enviar mensagem"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 8500;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 1rem;
      background-color: rgba(14, 59, 49, 0.4);
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .panel {
      width: 100%;
      max-width: 420px;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      background-color: var(--color-cream-50);
      border-radius: var(--radius-card);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid rgba(14, 59, 49, 0.08);
      flex-shrink: 0;
    }
    .eyebrow {
      font-family: var(--font-sans);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-brand-gold-500);
      margin: 0 0 0.2rem;
    }
    .title {
      font-family: var(--font-display);
      font-size: var(--text-heading);
      margin: 0;
    }
    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .reset, .close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.35rem;
      color: var(--color-ink-900);
      border-radius: var(--radius-pill);
      transition: background-color var(--duration-micro) var(--ease-out-3);
    }
    .reset:hover, .close:hover {
      background-color: rgba(14, 59, 49, 0.06);
    }
    .reset:focus-visible, .close:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }

    .suggestions {
      padding: 0.75rem 1.25rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      border-bottom: 1px solid rgba(14, 59, 49, 0.06);
      flex-shrink: 0;
    }
    .chip {
      padding: 0.45rem 0.9rem;
      border-radius: var(--radius-pill);
      border: 1px solid rgba(14, 59, 49, 0.12);
      background: var(--color-white);
      font-family: var(--font-sans);
      font-size: var(--text-small);
      color: var(--color-ink-900);
      cursor: pointer;
      transition: background-color var(--duration-micro) var(--ease-out-3), border-color var(--duration-micro) var(--ease-out-3);
    }
    .chip:hover {
      background-color: rgba(199, 162, 75, 0.1);
      border-color: var(--color-brand-gold-500);
    }

    .messages {
      flex: 1 1 auto;
      overflow-y: auto;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      min-height: 0;
    }
    .message {
      display: flex;
      width: 100%;
    }
    .message.user {
      justify-content: flex-end;
    }
    .message.assistant {
      justify-content: flex-start;
    }
    .bubble {
      max-width: 82%;
      padding: 0.8rem 1rem;
      border-radius: var(--radius-card);
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .message.assistant .bubble {
      background-color: var(--color-white);
      border: 1px solid rgba(14, 59, 49, 0.08);
      border-bottom-left-radius: 4px;
    }
    .message.user .bubble {
      background-color: var(--color-brand-green-900);
      color: var(--color-cream-50);
      border-bottom-right-radius: 4px;
    }
    .text {
      font-size: var(--text-body);
      line-height: 1.55;
      margin: 0;
    }
    .time {
      font-size: 0.65rem;
      opacity: 0.6;
      align-self: flex-end;
    }
    .typing {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      padding: 0.9rem 1rem;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--color-ink-900);
      opacity: 0.6;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.75); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }

    .input-area {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-top: 1px solid rgba(14, 59, 49, 0.08);
      flex-shrink: 0;
      background-color: var(--color-cream-50);
    }
    .input {
      flex: 1 1 auto;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-pill);
      border: 1px solid rgba(14, 59, 49, 0.18);
      background-color: var(--color-white);
      font-family: var(--font-sans);
      font-size: var(--text-body);
      color: var(--color-ink-900);
      outline: none;
    }
    .input:focus {
      border-color: var(--color-brand-gold-500);
    }
    .send {
      width: 42px;
      height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background-color: var(--color-brand-green-900);
      color: var(--color-cream-50);
      cursor: pointer;
      transition: background-color var(--duration-micro) var(--ease-out-3), transform var(--duration-micro) var(--ease-out-3);
      flex-shrink: 0;
    }
    .send:hover:not(:disabled) {
      background-color: var(--color-ink-900);
      transform: translateY(-1px);
    }
    .send:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .send:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
  `]
})
export class AfroAssistantPanelComponent implements AfterViewChecked {
  readonly assistant = inject(AssistantService);
  readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  ngAfterViewChecked(): void {
    this.scrollToBottom();
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
    if (!container) {
      return;
    }
    const element = container.nativeElement as HTMLDivElement;
    element.scrollTop = element.scrollHeight;
  }
}
