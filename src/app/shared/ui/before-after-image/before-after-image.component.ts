import { Component, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-after-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['beforeSrc', 'afterSrc', 'altBefore', 'altAfter', 'forceState', 'aspectRatio'],
  host: {
    '[style.aspectRatio]': 'aspectRatio',
  },
  template: `
    <div
      class="wrapper"
      (mouseenter)="onHover(true)"
      (mouseleave)="onMouseLeave()"
      (focus-within)="onHover(true)"
    >
      <img
        class="layer layer-after"
        [src]="afterSrc"
        alt="Depois — {{ altAfter }}"
        [class.visible]="!showBefore()"
      />
      <img
        class="layer layer-before"
        [src]="beforeSrc"
        alt="Antes — {{ altBefore }}"
        [class.visible]="showBefore()"
      />

      <span class="chip" aria-hidden="true">{{ showBefore() ? 'Antes' : 'Depois' }}</span>

      <span class="illustrative-label" aria-hidden="true">Ilustrativo</span>

      <div class="segmented-control" role="group" aria-label="Ver antes ou depois">
        <button
          type="button"
          class="seg-btn"
          [class.active]="showBefore()"
          [attr.aria-pressed]="showBefore()"
          (click)="setState(true)"
        >
          Antes
        </button>
        <button
          type="button"
          class="seg-btn"
          [class.active]="!showBefore()"
          [attr.aria-pressed]="!showBefore()"
          (click)="setState(false)"
        >
          Depois
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-card);
      aspect-ratio: var(--aspect-ratio, 4 / 3);
    }

    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: opacity var(--duration-ui) var(--ease-out-3);
      opacity: 0;
    }

    .layer.visible {
      opacity: 1;
    }

    .layer-before {
      z-index: 2;
    }

    .layer-after {
      z-index: 1;
    }

    .chip {
      position: absolute;
      bottom: 0.75rem;
      left: 0.75rem;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-pill);
      background: rgba(14, 59, 49, 0.82);
      color: var(--color-cream-50);
      font-family: var(--font-sans);
      font-size: var(--text-caption);
      font-weight: 600;
      letter-spacing: 0.06em;
      pointer-events: none;
      user-select: none;
    }

    .illustrative-label {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-pill);
      background: rgba(14, 59, 49, 0.55);
      color: var(--color-cream-50);
      font-family: var(--font-sans);
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      pointer-events: none;
      user-select: none;
    }

    .segmented-control {
      position: absolute;
      bottom: 0.75rem;
      right: 0.75rem;
      z-index: 10;
      display: flex;
      border-radius: var(--radius-pill);
      overflow: hidden;
      border: 1px solid rgba(14, 59, 49, 0.15);
    }

    .seg-btn {
      appearance: none;
      border: none;
      background: rgba(14, 59, 49, 0.82);
      color: var(--color-cream-50);
      font-family: var(--font-sans);
      font-size: var(--text-caption);
      font-weight: 600;
      letter-spacing: 0.04em;
      padding: 0.35rem 0.8rem;
      cursor: pointer;
      transition: background-color var(--duration-micro) var(--ease-out-3), color var(--duration-micro) var(--ease-out-3);
      outline: none;
    }

    .seg-btn:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: -2px;
    }

    .seg-btn.active {
      background: var(--color-brand-green-900);
      color: var(--color-cream-50);
    }

    .seg-btn:not(.active) {
      background: rgba(14, 59, 49, 0.55);
      color: rgba(247, 243, 236, 0.75);
    }

    @media (hover: hover) and (pointer: fine) {
      .segmented-control {
        display: none;
      }
      .wrapper:hover .segmented-control,
      .wrapper:focus-within .segmented-control {
        display: flex;
      }
    }

    @media (hover: none) {
      .segmented-control {
        display: flex;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .layer {
        transition: none;
      }
    }
  `]
})
export class BeforeAfterImageComponent implements OnInit {
  // Inputs
  beforeSrc = '';
  afterSrc = '';
  altBefore = '';
  altAfter = '';
  forceState: boolean | null = null;
  aspectRatio = '4 / 3';

  // Internal state
  readonly showBefore = signal(false);

  ngOnInit(): void {
    if (this.forceState !== null) {
      this.showBefore.set(this.forceState);
    }
  }

  onHover(entering: boolean): void {
    if (entering) {
      this.showBefore.set(true);
    }
  }

  onMouseLeave(): void {
    this.showBefore.set(false);
  }

  setState(value: boolean): void {
    this.showBefore.set(value);
  }
}
