import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (item of items(); track item.id) {
      <div class="item" [class.open]="expanded() === item.id">
        <button
          type="button"
          class="trigger"
          [attr.aria-expanded]="expanded() === item.id"
          [attr.aria-controls]="'panel-' + item.id"
          (click)="toggle(item.id)"
        >
          <span class="label">{{ item.label }}</span>
          <span class="icon" [class.open]="expanded() === item.id">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
        </button>
        <div
          [id]="'panel-' + item.id"
          role="region"
          class="panel-wrapper"
          [class.open]="expanded() === item.id"
        >
          <div class="panel">
            <p class="content">{{ item.content }}</p>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .item {
      border-bottom: 1px solid var(--color-brand-green-900, #0E3B31);
    }
    .trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-block: 1.25rem;
      background: none;
      border: none;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: var(--text-heading);
      font-weight: 600;
      color: var(--color-ink-900);
      text-align: left;
    }
    .trigger:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .label {
      flex: 1;
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--duration-micro) var(--ease-out-3);
      flex-shrink: 0;
    }
    .icon.open {
      transform: rotate(45deg);
    }
    .panel-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--duration-ui) var(--ease-out-3);
    }
    .panel-wrapper.open {
      grid-template-rows: 1fr;
    }
    .panel {
      overflow: hidden;
    }
    .content {
      padding-bottom: 1.25rem;
      font-size: var(--text-body);
      line-height: 1.6;
      color: var(--color-ink-900);
      opacity: 0;
      transform: translateY(-8px);
      transition: opacity var(--duration-ui) var(--ease-out-3), transform var(--duration-ui) var(--ease-out-3);
    }
    .panel-wrapper.open .content {
      opacity: 1;
      transform: translateY(0);
    }
  `]
})
export class AccordionComponent {
  readonly items = input.required<{ id: string | number; label: string; content: string }[]>();
  readonly expanded = signal<string | number | null>(null);

  toggle(id: string | number): void {
    this.expanded.update(current => current === id ? null : id);
  }
}
