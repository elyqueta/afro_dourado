import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-braids-gallery-preview',
  standalone: true,
  imports: [SmartImageComponent, SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y">
      <div class="container-max">
        <app-section-heading
          eyebrow="Tranças & Estética"
          title="O teu cabelo. A tua expressão."
          size="display-m"
        />
        <div class="gallery">
          @for (img of visible(); track $index) {
            <div class="item" [class.hero]="$index === 0">
              <app-smart-image
                [src]="img"
                alt="Galeria de tranças Afro Dourado"
              />
            </div>
          }
        </div>
        <div class="cta">
          <app-pill-button
            href="/trancas-estetica"
            variant="secondary"
            size="md"
            label="Ver galeria &rarr;"
          ></app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .gallery {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 2rem;
        width: 100%;
        height: auto;
      }
      .item {
        border-radius: var(--radius-card);
        overflow: hidden;
        min-height: 0;
        height: auto;
      }
      .item.hero {
        grid-column: span 2;
        aspect-ratio: 4 / 5;
      }
      .item:not(.hero) {
        aspect-ratio: 3 / 4;
      }
      @media (min-width: 768px) {
        .gallery {
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          height: clamp(520px, 62vw, 760px);
        }
        .item {
          height: 100%;
        }
        .item.hero {
          grid-column: 1 / span 2;
          grid-row: 1 / span 2;
          aspect-ratio: auto;
        }
        .item:not(.hero) {
          aspect-ratio: auto;
        }
        :host ::ng-deep app-smart-image {
          display: block;
          width: 100%;
          height: 100%;
          aspect-ratio: auto !important;
        }
        :host ::ng-deep app-smart-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .cta {
        margin-top: 2rem;
      }
    `,
  ],
})
export class BraidsGalleryPreviewComponent {
  readonly images = input.required<string[]>();
  visible() {
    return this.images().slice(0, 5);
  }
}
