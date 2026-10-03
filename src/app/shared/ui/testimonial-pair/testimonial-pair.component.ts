import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BeforeAfterImageComponent } from '@app/shared/ui/before-after-image/before-after-image.component';

@Component({
  selector: 'app-testimonial-pair',
  standalone: true,
  imports: [BeforeAfterImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pair" [class.text-first]="layout() === 'text-first'">
      <div class="image-cell" (mouseenter)="onHover(true)" (mouseleave)="onHover(false)" (focus-within)="onHover(true)">
        <app-before-after-image
          [beforeSrc]="testimonial().photoBefore"
          [afterSrc]="testimonial().photoAfter"
          altBefore="Antes — cabelo de {{ testimonial().name }}"
          altAfter="Depois — cabelo de {{ testimonial().name }}"
          aspectRatio="1 / 1"
        />
      </div>
      <div class="text-cell" (mouseenter)="onHover(true)" (mouseleave)="onHover(false)" (focus-within)="onHover(true)">
        <div class="text-inner" [class.inverted]="isInvertedCell()">
          <h3 class="name">{{ testimonial().name }}</h3>
          <p class="role">{{ testimonial().role }}</p>
          <p class="quote">{{ testimonial().quote }}</p>
          <div class="mini-strip" role="group" aria-label="Ver antes ou depois">
            <button
              type="button"
              class="mini-btn"
              [class.active]="showBefore()"
              [attr.aria-pressed]="showBefore()"
              (click)="setState(true)"
            >
              <span class="mini-thumb" [class.active]="showBefore()">
                <img [src]="testimonial().photoBefore" alt="" aria-hidden="true" />
              </span>
              <span class="mini-label">Antes</span>
            </button>
            <button
              type="button"
              class="mini-btn"
              [class.active]="!showBefore()"
              [attr.aria-pressed]="!showBefore()"
              (click)="setState(false)"
            >
              <span class="mini-thumb" [class.active]="!showBefore()">
                <img [src]="testimonial().photoAfter" alt="" aria-hidden="true" />
              </span>
              <span class="mini-label">Depois</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pair {
      display: grid;
      grid-template-columns: 1fr;
      border-radius: var(--radius-card);
      overflow: hidden;
      border: 1px solid rgba(14, 59, 49, 0.08);
      min-height: 100%;
    }

    .image-cell {
      position: relative;
      overflow: hidden;
    }

    .image-cell app-before-after-image {
      display: block;
    }

    .text-cell {
      display: flex;
      flex-direction: column;
    }

    .text-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1.5rem;
    }

    .text-inner.inverted {
      background-color: var(--color-brand-green-900);
      color: var(--color-cream-50);
    }

    .text-inner:not(.inverted) {
      background-color: var(--color-white);
    }

    .name {
      font-family: var(--font-display);
      font-size: var(--text-heading);
      font-weight: 400;
      margin: 0;
    }

    .role {
      font-size: var(--text-small);
      margin: 0;
      opacity: 0.7;
    }

    .text-inner.inverted .role {
      opacity: 0.75;
    }

    .quote {
      font-size: var(--text-body);
      line-height: 1.7;
      margin: 0;
      flex: 1;
    }

    .mini-strip {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .mini-btn {
      appearance: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
      background: none;
      border: 1px solid rgba(14, 59, 49, 0.15);
      border-radius: var(--radius-card);
      padding: 0.4rem;
      cursor: pointer;
      transition: border-color var(--duration-micro) var(--ease-out-3), background-color var(--duration-micro) var(--ease-out-3);
      outline: none;
      flex: 1;
    }

    .mini-btn:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }

    .mini-btn.active {
      border-color: var(--color-brand-gold-500);
    }

    .text-inner.inverted .mini-btn {
      border-color: rgba(247, 243, 236, 0.2);
    }

    .text-inner.inverted .mini-btn.active {
      border-color: var(--color-brand-gold-500);
    }

    .mini-thumb {
      display: block;
      width: 56px;
      height: 56px;
      border-radius: 0.25rem;
      overflow: hidden;
      border: 1px solid transparent;
      transition: border-color var(--duration-micro) var(--ease-out-3);
      flex-shrink: 0;
    }

    .mini-thumb.active {
      border-color: var(--color-brand-gold-500);
    }

    .mini-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .mini-label {
      font-family: var(--font-sans);
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.8;
    }

    /* Desktop: image first, text second */
    @media (min-width: 768px) {
      .pair {
        grid-template-columns: 1fr 1fr;
      }

      .image-cell {
        aspect-ratio: 4 / 3;
      }

      .pair.text-first .image-cell {
        order: 2;
      }

      .pair.text-first .text-cell {
        order: 1;
      }
    }

    /* Desktop large: square tiles */
    @media (min-width: 1280px) {
      .image-cell {
        aspect-ratio: 1 / 1;
      }
    }

    /* Mobile: unified card, image on top */
    @media (max-width: 767px) {
      .image-cell {
        aspect-ratio: 4 / 5;
      }
    }

    /* Even-indexed pairs inverted on desktop-large */
    @media (min-width: 1280px) {
      .pair:nth-child(even) {
        direction: rtl;
      }

      .pair:nth-child(even) > * {
        direction: ltr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .mini-btn,
      .mini-thumb {
        transition: none;
      }
    }

    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .pair {
      grid-template-columns: 1fr 1fr;
    }
  `]
})
export class TestimonialPairComponent {
  readonly testimonial = input.required<{
    name: string;
    role: string;
    quote: string;
    photoBefore: string;
    photoAfter: string;
  }>();
  readonly layout = input<'image-first' | 'text-first'>('image-first');

  readonly showBefore = signal(false);

  isInvertedCell(): boolean {
    return this.layout() === 'text-first';
  }

  onHover(_entering: boolean): void {
    // Hover handled by image component for now
  }

  setState(value: boolean): void {
    this.showBefore.set(value);
  }
}
