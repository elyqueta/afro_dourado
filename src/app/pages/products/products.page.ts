import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, BookingCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="hero">
        <div class="container-max">
          <app-section-heading
            eyebrow="Produtos Naturais"
            title="Cuidado pensado para a rotina real."
            size="display-m"
          />
          <p class="lead">
            Seleccionámos produtos que respeitam a textura, a hidratação e a identidade do cabelo afro.
          </p>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <div class="grid">
            @for (product of products; track product.name) {
              <div class="card">
                <app-smart-image [src]="product.image" [alt]="product.name" aspectRatio="1 / 1" />
                <div class="info">
                  <h4 class="name">{{ product.name }}</h4>
                  <p class="benefits">{{ product.benefits }}</p>
                  <p class="usage">{{ product.usage }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-white);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Rotina"
            title="Como usar no dia a dia."
            size="display-m"
          />
          <div class="steps">
            @for (step of steps; track $index) {
              <div class="step">
                <span class="number">{{ $index + 1 }}</span>
                <div class="text">
                  <h4 class="title">{{ step.title }}</h4>
                  <p class="desc">{{ step.text }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <app-booking-cta headline="Queres experimentar os produtos?" />
    </main>
  `,
  styles: [
    `
      .hero {
        padding-block: var(--space-section-y);
        background-color: var(--color-white);
      }
      .hero .container-max {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .lead {
        font-size: var(--text-body);
        line-height: 1.6;
        max-width: 56ch;
        margin: 0;
        opacity: 0.85;
      }

      .grid {
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
      .info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .name {
        font-family: var(--font-display);
        font-size: var(--text-heading);
        margin: 0;
      }
      .benefits {
        font-size: var(--text-body);
        line-height: 1.5;
        margin: 0;
        opacity: 0.9;
      }
      .usage {
        font-size: var(--text-small);
        line-height: 1.5;
        margin: 0;
        opacity: 0.7;
      }
      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .steps {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .step {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .number {
        font-family: var(--font-display);
        font-size: var(--text-display-m);
        line-height: 1;
        color: var(--color-brand-gold-500);
      }
      .title {
        font-family: var(--font-sans);
        font-size: var(--text-heading);
        font-weight: 600;
        margin: 0 0 0.25rem;
      }
      .desc {
        font-size: var(--text-body);
        line-height: 1.6;
        margin: 0;
        opacity: 0.85;
        max-width: 56ch;
      }
    `,
  ],
})
export class ProductsPage {
  readonly products = [
    {
      name: 'Óleo Capilar Nutritivo',
      benefits: 'Hidrata profundamente, reduz quebra e facilita o desembaraço. Ideal para cabelos secos e frágeis.',
      usage: 'Aplicar no couro cabeludo e comprimentos antes do shampoo. Massajar suavemente.',
      image: 'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Shampoo Natural',
      benefits: 'Limpa suavemente sem ressecar. Respeita a oleosidade natural do cabelo afro.',
      usage: 'Massajar no couro cabeludo molhado e enxaguar abundantemente.',
      image: 'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Finalizador',
      benefits: 'Define cachos e tranças, controla o frizz e protege da humidade tropical.',
      usage: 'Aplicar uma pequena quantidade nas pontas e moldar com as mãos.',
      image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=format&fit=crop&w=600&q=80',
    },
  ];

  readonly steps = [
    {
      title: 'Limpeza suave',
      text: 'Comece por um shampoo natural, sem sulfatos agressivos. Massaje o couro cabeludo com movimentos circulares suaves.',
    },
    {
      title: 'Hidratação',
      text: 'Aplique o óleo capilar ou máscara hidratante nos comprimentos e pontas. Deixe actuar alguns minutos antes de enxaguar.',
    },
    {
      title: 'Finalização',
      text: 'Use o finalizador para definir os cachos ou tranças. Aplique uma pequena quantidade e modele com as mãos.',
    },
    {
      title: 'Rotina',
      text: 'Repita a hidratação 1–2 vezes por semana e proteja o cabelo durante a noite com uma touca de seda ou fronha.',
    },
  ];
}
