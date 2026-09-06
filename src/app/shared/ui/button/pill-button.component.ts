import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pill-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (href()) {
      <a
        [href]="href()"
        [class]="classes()"
        [attr.rel]="href()?.startsWith('http') ? 'noopener noreferrer' : null"
        [attr.target]="href()?.startsWith('http') ? '_blank' : null"
        (click)="clicked.emit($event)"
      >
        {{ label() }}
      </a>
    } @else {
      <button
        type="button"
        [class]="classes()"
        (click)="clicked.emit($event)"
      >
        {{ label() }}
      </button>
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    .base {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: var(--font-sans);
      font-weight: 600;
      letter-spacing: 0.02em;
      text-decoration: none;
      border-radius: var(--radius-pill);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background-color var(--duration-micro) var(--ease-out-3),
                  color var(--duration-micro) var(--ease-out-3),
                  border-color var(--duration-micro) var(--ease-out-3),
                  transform var(--duration-micro) var(--ease-out-3);
    }
    .md { padding-block: 0.75rem; padding-inline: 1.5rem; font-size: var(--text-small); }
    .lg { padding-block: 1rem; padding-inline: 2rem; font-size: var(--text-body); }
    .primary {
      background-color: var(--color-brand-green-900);
      color: var(--color-cream-50);
      border-color: var(--color-brand-green-900);
    }
    .primary:hover {
      background-color: var(--color-brand-gold-500);
      color: var(--color-ink-900);
      border-color: var(--color-brand-gold-500);
      transform: translateY(-1px);
    }
    .secondary {
      background-color: transparent;
      color: var(--color-ink-900);
      border-color: var(--color-brand-gold-500);
    }
    .secondary:hover {
      background-color: rgba(199, 162, 75, 0.08);
      transform: translateY(-1px);
    }
    .secondary-light {
      background-color: transparent;
      color: var(--color-cream-50);
      border-color: var(--color-brand-gold-500);
    }
    .secondary-light:hover {
      background-color: rgba(199, 162, 75, 0.12);
      transform: translateY(-1px);
    }
  `]
})
export class PillButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'secondary-light'>('primary');
  readonly size = input<'md' | 'lg'>('md');
  readonly href = input<string | null>(null);
  readonly label = input<string>('');
  readonly clicked = output<Event>();

  classes(): string {
    const variant = this.variant();
    const size = this.size();
    return `base ${variant} ${size}`;
  }
}
