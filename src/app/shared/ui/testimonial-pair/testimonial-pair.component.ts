import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { BeforeAfterImageComponent } from '@app/shared/ui/before-after-image/before-after-image.component';

@Component({
  selector: 'app-testimonial-pair',
  standalone: true,
  imports: [BeforeAfterImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pair" [class.text-first]="layout() === 'text-first'">
      <div class="image-cell">
        <app-before-after-image
          [beforeSrc]="testimonial().photoBefore"
          [afterSrc]="testimonial().photoAfter"
          altBefore="cabelo de {{ testimonial().name }}"
          altAfter="cabelo de {{ testimonial().name }}"
          aspectRatio="1 / 1"
          [comparisonMode]="true"
        />
      </div>
      <div class="text-cell">
        <div class="text-inner" [class.inverted]="isInvertedCell()">
          <h3 class="name">{{ testimonial().name }}</h3>
          <p class="role">{{ testimonial().role }}</p>
          <p class="quote">{{ testimonial().quote }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pair {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 0.75rem;
      height: 100%;
    }

    .image-cell {
      position: relative;
      overflow: hidden;
      min-width: 0;
      border-radius: 0.75rem;
      background-color: var(--color-cream-50);
    }

    .image-cell app-before-after-image {
      display: block;
      width: 100%;
      height: 100%;
    }

    .text-cell {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .text-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
      padding: clamp(1rem, 1.5vw, 1.5rem);
      border-radius: 0.75rem;
      text-align: left;
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
      font-size: clamp(0.8rem, 0.9vw, 0.95rem);
      line-height: 1.55;
      margin: 0;
      flex: 1;
    }

    @media (min-width: 768px) {
      .pair {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        grid-template-rows: minmax(16rem, 19rem);
      }

      .image-cell {
        min-width: 0;
      }

      .pair.text-first .image-cell {
        order: 2;
      }

      .pair.text-first .text-cell {
        order: 1;
      }

      .image-cell app-before-after-image {
        height: 100%;
        aspect-ratio: auto !important;
      }
    }

    @media (max-width: 767px) {
      .image-cell {
        aspect-ratio: 16 / 10;
      }

      .image-cell app-before-after-image {
        aspect-ratio: auto !important;
      }

      .text-inner {
        padding: 1.1rem;
        align-items: center;
        text-align: center;
      }

      .quote {
        font-size: var(--text-small);
      }
    }

    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .pair {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto;
    }

    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .image-cell {
      aspect-ratio: 16 / 10;
    }

    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .pair.text-first .image-cell,
    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .pair.text-first .text-cell {
      order: 0;
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

  isInvertedCell(): boolean {
    return this.layout() === 'text-first';
  }
}
