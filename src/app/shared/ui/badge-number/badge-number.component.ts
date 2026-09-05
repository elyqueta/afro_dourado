import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-badge-number',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" aria-hidden="true">{{ number() }}</span>
  `,
  styles: [`
    .badge {
      font-family: var(--font-display);
      font-size: clamp(3rem, 2rem + 5vw, 7rem);
      line-height: 1;
      color: var(--color-brand-gold-500);
      opacity: 0.9;
    }
  `]
})
export class BadgeNumberComponent {
  readonly number = input.required<string | number>();
}
