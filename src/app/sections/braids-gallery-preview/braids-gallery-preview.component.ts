import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
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
        <app-section-heading eyebrow="Tranças & Estética" title="O teu cabelo. A tua expressão." size="display-m" />
        <div class="gallery">
          @for (img of images(); track $index) {
            <div class="item">
              <app-smart-image [src]="img" alt="Galeria de tranças AfroDourado" aspectRatio="3 / 4" />
            </div>
          }
        </div>
        <div class="cta">
          <app-pill-button href="/trancas-estetica" variant="secondary" size="md">Ver galeria &rarr;</app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 2rem;
      overflow-x: auto;
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
      .item:first-child {
        grid-column: span 2;
      }
    }
    .cta {
      margin-top: 2rem;
    }
  `]
})
export class BraidsGalleryPreviewComponent {
  readonly images = input.required<string[]>();
}
