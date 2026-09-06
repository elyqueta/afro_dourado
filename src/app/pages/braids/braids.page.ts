import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';

@Component({
  selector: 'app-braids',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, BookingCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading
        eyebrow="Tranças & Estética"
        title="O teu cabelo. A tua expressão."
        size="display-m"
      />

      <div class="gallery">
        @for (img of images; track $index) {
          <div class="item">
            <app-smart-image
              [src]="img"
              alt="Galeria de tranças Afro Dourado"
              aspectRatio="3 / 4"
            />
          </div>
        }
      </div>

      <app-booking-cta headline="Pronto para cuidar do teu cabelo?" />
    </main>
  `,
  styles: [
    `
      .gallery {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .item {
        border-radius: var(--radius-card);
        overflow: hidden;
      }
      .item:first-child {
        grid-column: span 2;
      }
      @media (min-width: 768px) {
        .gallery {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    `,
  ],
})
export class BraidsPage {
  readonly images = [
    '/media/braids-1.jpg',
    '/media/braids-2.jpg',
    '/media/braids-3.jpg',
    '/media/braids-4.jpg',
  ];
}
