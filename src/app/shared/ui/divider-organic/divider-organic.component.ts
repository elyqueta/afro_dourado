import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-organic-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      aria-hidden="true"
      focusable="false"
      class="divider"
      [class]="sizeClass"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 20 Q50 5 100 20 T190 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <circle cx="100" cy="20" r="3" fill="currentColor" opacity="0.6"/>
      <path d="M85 12 Q90 6 95 10" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
      <path d="M105 28 Q110 34 115 30" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
    </svg>
  `,
  styles: [`
    .divider {
      display: block;
      color: var(--color-brand-gold-500);
    }
    .sm { width: 80px; height: auto; }
    .md { width: 140px; height: auto; }
    .lg { width: 220px; height: auto; }
  `]
})
export class OrganicDividerComponent {
  readonly sizeClass = 'md';
}
