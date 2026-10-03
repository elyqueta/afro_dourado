import { Component, ChangeDetectionStrategy, inject, afterNextRender, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestimonialPairComponent } from '@app/shared/ui/testimonial-pair/testimonial-pair.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { EyebrowLabelComponent } from '@app/shared/ui/eyebrow-label/eyebrow-label.component';
import { SeoService } from '@app/core/seo.service';
import { TESTIMONIALS } from '@app/core/testimonials.data';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-testimonials-page',
  standalone: true,
  imports: [TestimonialPairComponent, SectionHeadingComponent, PillButtonComponent, EyebrowLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="hero" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-eyebrow-label text="Testemunhos" color="gold" class="eyebrow" />
          <h1 class="title">Histórias de cuidado.</h1>
          <p class="lead">
            Cada pessoa tem o seu ritmo. Estas são algumas das histórias de cuidado partilhadas
            por quem já passou pela Afro Dourado. As imagens são ilustrativas — os resultados
            variam conforme cada caso.
            <!-- TODO: aguardar validação Afro Dourado -->
          </p>
        </div>
      </section>

      <section class="section section-y mosaic" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <div class="mosaic-grid">
            @for (t of TESTIMONIALS; track $index) {
              <app-testimonial-pair
                [testimonial]="t"
                layout="image-first"
              />
            }
          </div>
        </div>
      </section>

      <section class="cta-block" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Vamos conversar"
            title="Vamos conversar sobre o seu cabelo."
            size="display-m"
            eyebrowColor="gold"
          />
          <app-pill-button href="/agendamento" variant="secondary-light" size="lg" label="Agendar avaliação"></app-pill-button>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .hero {
      padding-block: var(--space-section-y);
    }

    .eyebrow {
      display: block;
      margin-bottom: 1rem;
    }

    .title {
      font-family: var(--font-display);
      font-size: var(--text-display-l);
      font-weight: 400;
      line-height: 1.1;
      margin: 0 0 1.25rem;
    }

    .lead {
      font-size: var(--text-body);
      line-height: 1.7;
      max-width: 70ch;
      margin: 0;
      opacity: 0.85;
    }

    .mosaic {
      background-color: var(--color-cream-50);
    }

    .mosaic-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    /* Mobile: 1 coluna, unified cards */
    @media (max-width: 767px) {
      .mosaic-grid {
        gap: 1.25rem;
      }
    }

    /* Tablet small: 2 cols, unified cards */
    @media (min-width: 768px) and (max-width: 1023px) {
      .mosaic-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }

    /* Laptop small: 2 cols, each pair on one row alternating order */
    @media (min-width: 1024px) and (max-width: 1279px) {
      .mosaic-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      app-testimonial-pair {
        grid-column: 1 / -1;
      }
    }

    /* Desktop: 4-col checkerboard */
    @media (min-width: 1280px) {
      .mosaic-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }

      /* Even-indexed pairs: swap via CSS (no template logic needed) */
      app-testimonial-pair:nth-child(even) {
        direction: rtl;
      }

      app-testimonial-pair:nth-child(even) > .pair {
        direction: ltr;
      }

      app-testimonial-pair:nth-child(even) .text-inner {
        background-color: var(--color-brand-green-900);
        color: var(--color-cream-50);
      }

      app-testimonial-pair:nth-child(even) .role {
        opacity: 0.75;
      }
    }

    .cta-block {
      padding-block: var(--space-section-y);
      text-align: center;
    }

    .cta-block app-section-heading {
      margin-bottom: 1.5rem;
    }

    /* Split assistant: treat as tablet */
    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .mosaic-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    :host-context(html[data-assistant='open'][data-assistant-mode='split']) app-testimonial-pair {
      grid-column: auto;
    }
  `]
})
export class TestimonialsPage {
  readonly TESTIMONIALS = TESTIMONIALS;

  constructor() {
    const seo = inject(SeoService);
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      afterNextRender(() => {
        seo.update({
          title: 'Testemunhos — Afro Dourado',
          description: 'Histórias reais de cuidado capilar na Afro Dourado. Descubra os percursos de quem já passou pela nossa clínica em Luanda e Huambo.',
        });
      });
    }
  }
}
