import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { LightboxComponent } from '@app/shared/ui/lightbox/lightbox.component';

type GalleryCategory = 'todas' | 'trancas' | 'cabelo' | 'cuidado';

interface GalleryImage {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, 'todas'>;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [SmartImageComponent, SectionHeadingComponent, PillButtonComponent, LightboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="intro section section-y">
        <div class="container-max">
          <app-section-heading
            eyebrow="Galeria"
            title="Texturas, técnica e identidade."
            size="display-l"
            eyebrowColor="gold"
          />
          <p class="lead">
            Uma selecção visual de penteados, cabelo natural e momentos de cuidado Afro Dourado.
          </p>
        </div>
      </section>

      <section class="gallery-section section section-y" aria-label="Galeria de imagens">
        <div class="container-max">
          <div class="filters" aria-label="Filtrar imagens da galeria">
            @for (filter of filters; track filter.value) {
              <button
                type="button"
                class="filter"
                [class.active]="activeCategory() === filter.value"
                [attr.aria-pressed]="activeCategory() === filter.value"
                (click)="activeCategory.set(filter.value)"
              >
                {{ filter.label }}
              </button>
            }
          </div>

          <div class="grid">
            @for (image of visibleImages(); track image.src) {
              <figure class="item">
                <button
                  type="button"
                  class="image-trigger"
                  [attr.aria-label]="'Ampliar imagem: ' + image.alt"
                  (click)="lightbox.openLightbox($index)"
                >
                  <app-smart-image [src]="image.src" [alt]="image.alt" aspectRatio="4 / 5" />
                  <span class="zoom-hint" aria-hidden="true">Ver imagem</span>
                </button>
                <figcaption>{{ image.alt }}</figcaption>
              </figure>
            }
          </div>

          <app-lightbox
            #lightbox
            [images]="lightboxImages()"
            [captions]="lightboxCaptions()"
          />

          <div class="cta">
            <p>Queres conversar sobre o estilo ou o cuidado mais indicado para ti?</p>
            <app-pill-button href="/agendamento" variant="primary" size="lg" label="Agendar atendimento"></app-pill-button>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .intro {
      background: var(--color-brand-green-900);
      color: var(--color-cream-50);
    }
    .lead {
      max-width: 62ch;
      margin: 1.25rem 0 0;
      line-height: 1.7;
      opacity: 0.85;
    }
    .gallery-section {
      background: var(--color-cream-50);
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      margin-bottom: 2rem;
    }
    .filter {
      padding: 0.6rem 1rem;
      border: 1px solid rgba(14, 59, 49, 0.2);
      border-radius: var(--radius-pill);
      background: transparent;
      color: var(--color-ink-900);
      font: 600 var(--text-small) var(--font-sans);
      cursor: pointer;
      transition: background-color var(--duration-micro) var(--ease-out-3), color var(--duration-micro) var(--ease-out-3);
    }
    .filter.active,
    .filter:hover {
      background: var(--color-brand-green-900);
      color: var(--color-cream-50);
      border-color: var(--color-brand-green-900);
    }
    .filter:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 3px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .item {
      min-width: 0;
      margin: 0;
      overflow: hidden;
      border-radius: var(--radius-card);
      background: var(--color-white);
    }
    .item app-smart-image {
      display: block;
      overflow: hidden;
    }
    .image-trigger {
      position: relative;
      display: block;
      width: 100%;
      padding: 0;
      overflow: hidden;
      border: 0;
      background: transparent;
      cursor: zoom-in;
      text-align: inherit;
    }
    .image-trigger app-smart-image {
      transition: transform var(--duration-ui) var(--ease-out-3);
    }
    .image-trigger:hover app-smart-image {
      transform: scale(1.035);
    }
    .image-trigger:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: -2px;
    }
    .zoom-hint {
      position: absolute;
      right: 0.75rem;
      bottom: 0.75rem;
      padding: 0.4rem 0.7rem;
      border: 1px solid rgba(247, 243, 236, 0.45);
      border-radius: var(--radius-pill);
      background: rgba(14, 59, 49, 0.82);
      color: var(--color-cream-50);
      font: 600 var(--text-caption) var(--font-sans);
      opacity: 0;
      transition: opacity var(--duration-micro) var(--ease-out-3);
      pointer-events: none;
    }
    .image-trigger:hover .zoom-hint,
    .image-trigger:focus-visible .zoom-hint {
      opacity: 1;
    }
    figcaption {
      padding: 0.85rem 1rem;
      font-size: var(--text-small);
      line-height: 1.5;
    }
    .cta {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(14, 59, 49, 0.12);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .cta p {
      margin: 0;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.25rem;
      }
    }
    @media (min-width: 1280px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  `],
})
export class GalleryPage {
  readonly activeCategory = signal<GalleryCategory>('todas');
  readonly filters: { value: GalleryCategory; label: string }[] = [
    { value: 'todas', label: 'Todas' },
    { value: 'trancas', label: 'Tranças' },
    { value: 'cabelo', label: 'Cabelo natural' },
    { value: 'cuidado', label: 'Cuidado' },
  ];

  private readonly images: GalleryImage[] = [
    {
      src: 'https://images.pexels.com/photos/16089262/pexels-photo-16089262.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Tranças protectivas em cabelo afro',
      category: 'trancas',
    },
    {
      src: 'https://images.pexels.com/photos/11441103/pexels-photo-11441103.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Detalhe de tranças e textura natural',
      category: 'trancas',
    },
    {
      src: 'https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Cabelo afro natural em destaque',
      category: 'cabelo',
    },
    {
      src: 'https://images.pexels.com/photos/3190174/pexels-photo-3190174.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Textura e movimento do cabelo natural',
      category: 'cabelo',
    },
    {
      src: 'https://images.pexels.com/photos/3115708/pexels-photo-3115708.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Momento de cuidado capilar',
      category: 'cuidado',
    },
    {
      src: 'https://images.pexels.com/photos/3998012/pexels-photo-3998012.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Rotina de cuidado para cabelo com textura',
      category: 'cuidado',
    },
    {
      src: 'https://images.pexels.com/photos/17043160/pexels-photo-17043160.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Penteado entrançado de inspiração natural',
      category: 'trancas',
    },
    {
      src: 'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=900&q=80',
      alt: 'Cuidado e bem-estar em ambiente tranquilo',
      category: 'cuidado',
    },
  ];

  readonly visibleImages = computed(() => {
    const category = this.activeCategory();
    return category === 'todas' ? this.images : this.images.filter((image) => image.category === category);
  });

  readonly lightboxImages = computed(() =>
    this.visibleImages().map((image) => image.src.replace('w=900', 'w=1800')),
  );
  readonly lightboxCaptions = computed(() => this.visibleImages().map((image) => image.alt));
}
