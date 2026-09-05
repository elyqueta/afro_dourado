import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-eyebrow-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">{{ text() }}</span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    .base {
      font-family: var(--font-sans);
      font-size: var(--text-caption);
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      line-height: 1;
    }
    .ink { color: var(--color-ink-900); }
    .gold { color: var(--color-brand-gold-500); }
    .cream { color: var(--color-cream-50); }
    .green { color: var(--color-brand-green-900); }
  `]
})
export class EyebrowLabelComponent {
  readonly text = input.required<string>();
  readonly color = input<'ink' | 'gold' | 'cream' | 'green'>('ink');

  classes(): string {
    return `base ${this.color()}`;
  }
}
