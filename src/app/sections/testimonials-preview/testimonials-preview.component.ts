import { Component, input, ChangeDetectionStrategy, DestroyRef, inject, afterNextRender } from '@angular/core';
import { TestimonialCardComponent } from '@app/shared/ui/testimonial-card/testimonial-card.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { RevealService } from '@app/motion/reveal';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-testimonials-preview',
  standalone: true,
  imports: [TestimonialCardComponent, SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y" style="background-color: var(--color-white);">
      <div class="container-max">
        <app-section-heading
          eyebrow="Testemunhos"
          title="Quem já cuidou do cabelo connosco."
          size="display-m"
        />
        <div class="carousel" data-lenis-prevent>
          @for (t of testimonials(); track $index) {
            <div
              class="carousel-card"
              [class.featured]="$first"
            >
              <app-testimonial-card
                [testimonial]="t"
                [desktopLayout]="$first ? 'featured' : $last ? 'overlay' : 'horizontal'"
              />
            </div>
          }
        </div>
        <div class="cta">
          <app-pill-button href="/testemunhos" variant="secondary" size="md" label="Ver mais &rarr;"></app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .carousel {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 0.5rem;
      align-items: stretch;
    }

    .carousel::-webkit-scrollbar {
      display: none;
    }

    .carousel-card {
      flex: 0 0 82%;
      scroll-snap-align: start;
      height: 100%;
    }

    .carousel-card app-testimonial-card {
      height: 100%;
    }

    .cta {
      margin-top: 2.5rem;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .carousel {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        overflow-x: visible;
        scroll-snap-type: none;
        align-items: stretch;
      }

      .carousel-card {
        flex: none;
        height: auto;
      }
    }

    @media (min-width: 1024px) {
      .carousel {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(2, minmax(0, 1fr));
        overflow-x: visible;
        scroll-snap-type: none;
        gap: 1.5rem;
        align-items: stretch;
        height: 31rem;
      }

      .carousel-card {
        flex: none;
        height: auto;
      }

      .carousel-card.featured {
        grid-row: span 2;
      }
    }

    :host-context(html[data-assistant='open'][data-assistant-mode='split']) .carousel {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
      :host-context(html[data-assistant='open'][data-assistant-mode='split']) .carousel {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: none;
        height: auto;
      }

      :host-context(html[data-assistant='open'][data-assistant-mode='split']) .carousel-card.featured {
        grid-row: auto;
      }
    }
  `]
})
export class TestimonialsPreviewComponent {
  private readonly revealService = inject(RevealService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly testimonials = input.required<{ name: string; role: string; quote: string; photoBefore: string; photoAfter: string }[]>();

  private cards: HTMLElement[] = [];
  private tween: ReturnType<typeof this.revealService.revealStagger> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.setupReveal();
      });
    }
  }

  private setupReveal(): void {
    const cardsEls = document.querySelectorAll('.carousel-card');
    this.cards = Array.from(cardsEls) as HTMLElement[];

    if (this.cards.length > 0) {
      this.tween = this.revealService.revealStagger(this.cards, { stagger: 0.08 });
    }
  }

  ngOnDestroy(): void {
    if (this.tween) {
      this.tween.kill?.();
      this.tween = null;
    }
    this.cards = [];
  }
}
