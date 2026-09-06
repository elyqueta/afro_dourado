import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-products-preview',
  standalone: true,
  imports: [SmartImageComponent, SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y" style="background-color: var(--color-white);">
      <div class="container-max">
        <app-section-heading eyebrow="Produtos Naturais" title="Cuidado pensado para a rotina real." size="display-m" />
        <div class="grid">
          @for (product of products(); track product.name) {
            <div class="card">
              <app-smart-image [src]="product.image" [alt]="product.name" aspectRatio="1 / 1" />
              <h4 class="name">{{ product.name }}</h4>
              <p class="benefits">{{ product.benefits }}</p>
            </div>
          }
        </div>
        <div class="cta">
           <app-pill-button href="/produtos" variant="secondary" size="md" label="Ver todos &rarr;"></app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .card app-smart-image {
      border-radius: var(--radius-card);
      overflow: hidden;
    }
    .name {
      font-family: var(--font-sans);
      font-size: var(--text-heading);
      font-weight: 600;
      margin: 0;
    }
    .benefits {
      font-size: var(--text-small);
      line-height: 1.5;
      margin: 0;
      opacity: 0.75;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .cta {
      margin-top: 2.5rem;
    }
  `]
})
export class ProductsPreviewComponent {
  readonly products = input.required<{ name: string; benefits: string; image: string }[]>();
}
