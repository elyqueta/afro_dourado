import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BeforeAfterImageComponent } from '@app/shared/ui/before-after-image/before-after-image.component';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [RouterLink, BeforeAfterImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="'/testemunhos'" class="card" [class.horizontal]="horizontal()" aria-label="Ler testemunho de {{ testimonial().name }}">
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
  `]
})
export class TestimonialCardComponent {
  readonly testimonial = input.required<{ name: string; role: string; quote: string; photoBefore: string; photoAfter: string }>();
  readonly horizontal = input(false);
}
