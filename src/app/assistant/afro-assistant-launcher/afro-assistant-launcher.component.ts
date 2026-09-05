import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-afro-assistant-launcher',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <button
        type="button"
        class="launcher"
        aria-label="Abrir assistente AfroDourado"
        (click)="open()"
      >
        <span class="icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5-1.34C8.47 21.51 10.18 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/>
          </svg>
        </span>
        <span class="label">AfroDourado Assist</span>
      </button>
    }
  `,
  styles: [`
    .launcher {
      position: fixed;
      bottom: 5rem;
      right: 1rem;
      z-index: 6000;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius-pill);
      background-color: var(--color-brand-green-900);
      color: var(--color-cream-50);
      border: 1px solid var(--color-brand-gold-500);
      font-family: var(--font-sans);
      font-size: var(--text-small);
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(14, 59, 49, 0.2);
      transition: transform var(--duration-micro) var(--ease-out-3), box-shadow var(--duration-micro) var(--ease-out-3);
    }
    .launcher:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(14, 59, 49, 0.3);
    }
    .launcher:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-brand-gold-500);
    }
    @media (max-width: 767px) {
      .launcher {
        bottom: 5.5rem;
        right: 1rem;
        padding: 0.6rem 1rem;
      }
      .label {
        display: none;
      }
    }
  `]
})
export class AfroAssistantLauncherComponent {
  readonly visible = signal(true);

  open(): void {
    this.visible.set(false);
  }
}
