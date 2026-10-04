import { Component, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-after-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['beforeSrc', 'afterSrc', 'altBefore', 'altAfter', 'forceState', 'aspectRatio', 'comparisonMode'],
  host: {
    '[style.aspectRatio]': 'aspectRatio',
  },
  template: `
    <div
      class="wrapper"
      [class.comparison-mode]="comparisonMode"
      (mouseenter)="onHover(true)"
      (mouseleave)="onMouseLeave()"
      (focus-within)="onHover(true)"
    >
      <img
        class="layer layer-after"
        [src]="afterSrc"
        alt="Depois — {{ altAfter }}"
        [class.visible]="comparisonMode || !showBefore()"
      />
      <img
        class="layer layer-before"
        [src]="beforeSrc"
        alt="Antes — {{ altBefore }}"
        [class.visible]="comparisonMode || showBefore()"
        [style.clip-path]="comparisonMode ? 'inset(0 ' + (100 - sliderPosition()) + '% 0 0)' : null"
      />

      <span class="illustrative-label" aria-hidden="true">Imagens ilustrativas</span>

      @if (comparisonMode) {
        <span class="comparison-label before-label" aria-hidden="true">Antes</span>
        <span class="comparison-label after-label" aria-hidden="true">Depois</span>
        <span class="comparison-divider" [style.left.%]="sliderPosition()" aria-hidden="true">
          <span class="comparison-handle">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </span>
        </span>
        <input
          class="comparison-slider"
          type="range"
          min="0"
          max="100"
          step="1"
          [value]="sliderPosition()"
          [attr.aria-label]="'Comparar antes e depois — ' + altBefore"
          [attr.aria-valuetext]="sliderValueText()"
          (input)="updateSlider($event)"
        />
      } @else {
        <span class="chip" aria-hidden="true">{{ showBefore() ? 'Antes' : 'Depois' }}</span>
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
      }
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

    .wrapper.comparison-mode .illustrative-label {
      top: auto;
      bottom: 0.75rem;
    }

    .comparison-label {
      position: absolute;
      top: 0.75rem;
      z-index: 10;
      padding: 0.3rem 0.55rem;
      border: 1px solid rgba(247, 243, 236, 0.3);
      border-radius: var(--radius-pill);
      background: rgba(14, 59, 49, 0.72);
      color: var(--color-cream-50);
      font-family: var(--font-sans);
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      line-height: 1;
      text-transform: uppercase;
      pointer-events: none;
      user-select: none;
    }

    .before-label {
      left: 0.75rem;
    }

    .after-label {
      right: 0.75rem;
    }

    .comparison-divider {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 4;
      width: 2px;
      background: var(--color-cream-50);
      box-shadow: 0 0 8px rgba(16, 20, 16, 0.3);
      pointer-events: none;
      transform: translateX(-50%);
    }

    .comparison-handle {
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      width: 2.25rem;
      height: 2.25rem;
      place-items: center;
      border: 1px solid rgba(247, 243, 236, 0.8);
      border-radius: 50%;
      background: var(--color-brand-green-900);
      color: var(--color-cream-50);
      transform: translate(-50%, -50%);
    }

    .comparison-handle svg {
      width: 1rem;
      height: 1rem;
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.75;
    }

    .comparison-slider {
      position: absolute;
      inset: 0;
      z-index: 5;
      width: 100%;
      height: 100%;
      margin: 0;
      appearance: none;
      background: transparent;
      cursor: ew-resize;
      touch-action: pan-y;
    }

    .comparison-slider::-webkit-slider-runnable-track {
      height: 100%;
      background: transparent;
    }

    .comparison-slider::-webkit-slider-thumb {
      width: 2.75rem;
      height: 100%;
      appearance: none;
      background: transparent;
    }

    .comparison-slider::-moz-range-track {
      height: 100%;
      background: transparent;
    }

    .comparison-slider::-moz-range-thumb {
      width: 2.75rem;
      height: 100%;
      border: 0;
      border-radius: 0;
      background: transparent;
    }

    .comparison-slider:focus-visible {
      outline: 2px solid var(--color-brand-gold-300);
      outline-offset: -4px;
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
      .chip {
        display: none;
      }

      .segmented-control {
        display: flex;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .layer {
        transition: none;
      }

      .comparison-divider {
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
  comparisonMode = false;

  // Internal state
  readonly showBefore = signal(false);
  readonly sliderPosition = signal(50);

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

  updateSlider(event: Event): void {
    this.sliderPosition.set(Number((event.target as HTMLInputElement).value));
  }

  sliderValueText(): string {
    return `${this.sliderPosition()}% Antes, ${100 - this.sliderPosition()}% Depois`;
  }
}
