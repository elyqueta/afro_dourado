import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, BookingCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Produtos Naturais" title="Cuidado pensado para a rotina real." size="display-m" />

      <div class="grid">
        @for (product of products; track product.name) {
          <div class="card">
            <app-smart-image [src]="product.image" [alt]="product.name" aspectRatio="1 / 1" />
            <h4 class="name">{{ product.name }}</h4>
            <p class="benefits">{{ product.benefits }}</p>
            <p class="usage">{{ product.usage }}</p>
          </div>
        }
      </div>

      <app-booking-cta headline="Queres experimentar os produtos?" />
    </main>
  `,
  styles: [`
    .grid {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
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
      font-size: var(--text-body);
      line-height: 1.5;
      margin: 0;
      opacity: 0.85;
    }
    .usage {
      font-size: var(--text-small);
      line-height: 1.5;
      margin: 0;
      opacity: 0.65;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class ProductsPage {
  readonly products = [
    { name: 'Óleo Capilar Nutritivo', benefits: 'Hidrata profundamente, reduz quebra e facilita o desembaraço. Ideal para cabelos secos e frágeis.', usage: 'Aplicar no couro cabeludo e comprimentos antes do shampoo. Massajar suavemente.', image: 'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=600&q=80' },
    { name: 'Shampoo Natural', benefits: 'Limpa suavemente sem ressecar. Respeita a oleosidade natural do cabelo afro.', usage: 'Massajar no couro cabeludo molhado e enxaguar abundantemente.', image: 'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=600&q=80' },
    { name: 'Finalizador', benefits: 'Define cachos e tranças, controla o frizz e protege da humidade tropical.', usage: 'Aplicar uma pequena quantidade nas pontas e moldar com as mãos.', image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=format&fit=crop&w=600&q=80' },
  ];
}
