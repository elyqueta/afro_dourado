import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BeforeAfterImageComponent } from '@app/shared/ui/before-after-image/before-after-image.component';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [RouterLink, BeforeAfterImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="'/testemunhos'"
      class="card"
      [class.horizontal]="horizontal()"
      [class.desktop-featured]="desktopLayout() === 'featured'"
      [class.desktop-horizontal]="desktopLayout() === 'horizontal'"
      [class.desktop-overlay]="desktopLayout() === 'overlay'"
      aria-label="Ler testemunho de {{ testimonial().name }}"
    >
      <div class="photo">
        <app-before-after-image
          [beforeSrc]="testimonial().photoBefore"
          [afterSrc]="testimonial().photoAfter"
          altBefore="Antes — cabelo de {{ testimonial().name }}"
          altAfter="Depois — cabelo de {{ testimonial().name }}"
        />
      </div>
      <div class="text">
        <h3 class="name">{{ testimonial().name }}</h3>
        <p class="role">{{ testimonial().role }}</p>
        <p class="quote">{{ testimonial().quote }}</p>
        <span class="link">Ler mais &rarr;</span>
      </div>
    </a>
  `,
  styles: [`
    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
      text-decoration: none;
      color: inherit;
      background-color: var(--color-white);
      border-radius: var(--radius-card);
      overflow: hidden;
      border: 1px solid rgba(14, 59, 49, 0.08);
      transition: transform var(--duration-micro) var(--ease-out-3);
    }

    @media (hover: hover) and (pointer: fine) {
      .card:hover {
        transform: translateY(-4px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }
    }

    .card.horizontal {
      flex-direction: row;
    }

    .card.horizontal .photo {
      flex: 0 0 40%;
    }

    .card.horizontal .text {
      flex: 1;
    }

    .photo {
      overflow: hidden;
    }

    .photo app-before-after-image {
      display: block;
    }

    .text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 1.5rem;
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

    .quote {
      font-size: var(--text-small);
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .link {
      margin-top: auto;
      display: inline-block;
      font-size: var(--text-small);
      font-weight: 600;
      color: var(--color-brand-gold-500);
      text-decoration: none;
      letter-spacing: 0.02em;
    }

    @media (min-width: 1024px) {
      .card.desktop-featured,
      .card.desktop-horizontal,
      .card.desktop-overlay {
        border: 0;
        border-radius: 1.25rem;
      }

      .card.desktop-featured .photo {
        flex: 1 1 auto;
        min-height: 0;
      }

      .card.desktop-featured .photo app-before-after-image,
      .card.desktop-horizontal .photo app-before-after-image {
        width: 100%;
        height: 100%;
        aspect-ratio: auto !important;
        border-radius: 0;
      }

      .card.desktop-featured .text {
        flex: 0 0 auto;
      }

      .card.desktop-horizontal {
        flex-direction: row;
      }

      .card.desktop-horizontal .photo {
        flex: 0 0 40%;
      }

      .card.desktop-horizontal .text {
        padding: 1.25rem;
      }

      .card.desktop-overlay {
        position: relative;
        display: block;
      }

      .card.desktop-overlay .photo {
        position: absolute;
        inset: 0;
      }

      .card.desktop-overlay .photo app-before-after-image {
        width: 100%;
        height: 100%;
        aspect-ratio: auto !important;
        border-radius: 0;
      }

      .card.desktop-overlay .text {
        position: absolute;
        z-index: 3;
        inset: auto 0 0;
        padding: 2rem 1.5rem 4rem;
        color: var(--color-cream-50);
        justify-content: flex-end;
        background: linear-gradient(
          180deg,
          transparent 0%,
          rgba(16, 20, 16, 0.24) 30%,
          rgba(16, 20, 16, 0.88) 100%
        );
      }

      .card.desktop-overlay .role,
      .card.desktop-overlay .quote {
        display: none;
      }

      .card.desktop-overlay .link {
        color: var(--color-brand-gold-300);
      }
    }
  `]
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<{ name: string; role: string; quote: string; photoBefore: string; photoAfter: string }>();
  readonly horizontal = input(false);
  readonly desktopLayout = input<'featured' | 'horizontal' | 'overlay'>('horizontal');
}
