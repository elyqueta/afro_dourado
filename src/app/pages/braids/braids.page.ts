import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';
import { VideoBackgroundComponent } from '@app/shared/ui/video-background/video-background.component';

@Component({
  selector: 'app-braids',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, PillButtonComponent, BookingCtaComponent, VideoBackgroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="hero">
        <app-video-background
          videoSrc="https://videos.pexels.com/video-files/6698744/6698744-uhd_2732_1440_25fps.mp4"
          posterSrc="https://images.pexels.com/photos/16089262/pexels-photo-16089262.jpeg?auto=format&fit=crop&w=1920&q=80"
        />
        <div class="overlay"></div>
        <div class="content container-max">
          <app-section-heading
            eyebrow="Tranças & Estética"
            title="O teu cabelo. A tua expressão."
            size="display-m"
            eyebrowColor="gold"
          />
          <p class="lead">
            Técnica, identidade e expressão em cada entrelaçado.
          </p>
          <app-pill-button href="#galeria" variant="secondary-light" size="lg" label="Ver galeria &rarr;"></app-pill-button>
        </div>
      </section>

      <section id="galeria" class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Galeria"
            title="Estilos que contam histórias."
            size="display-m"
          />

          <div class="gallery">
            @for (img of gallery; track $index) {
              <div class="item">
                <app-smart-image
                  [src]="img"
                  alt="Galeria de tranças e estética Afro Dourado"
                  aspectRatio="3 / 4"
                />
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-white);">
        <div class="container-max">
          <div class="grid">
            <div class="text">
              <app-section-heading
                eyebrow="Técnica"
                title="Cuidado antes, durante e depois."
                size="display-m"
              />
              <p class="body">
                Cada estilo de trança exige uma avaliação prévia do estado do cabelo e do couro cabeludo.
                A nossa equipa analisa a resistência, hidratação e saúde da haste antes de iniciar qualquer
                entrelaçado, para garantir um resultado durável sem agravar a queda ou a quebra.
              </p>
              <p class="body">
                Trabalhamos com técnicas adaptadas ao cabelo afro: tranças Nagô, box braids, twists e
                penteados protectivos, sempre com produtos que respeitam a textura natural.
              </p>
            </div>
            <div class="media">
              <app-smart-image
                src="https://images.pexels.com/photos/11441103/pexels-photo-11441103.jpeg?auto=format&fit=crop&w=800&q=80"
                alt="Técnica de tranças — detalhe de entrelaçado"
                aspectRatio="4 / 5"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <div class="grid reverse">
            <div class="media">
              <app-smart-image
                src="https://images.pexels.com/photos/17043160/pexels-photo-17043160.jpeg?auto=format&fit=crop&w=800&q=80"
                alt="Manutenção de tranças — cuidados posteriores"
                aspectRatio="4 / 5"
              />
            </div>
            <div class="text">
              <app-section-heading
                eyebrow="Manutenção"
                title="O resultado dura mais com rotina."
                size="display-m"
              />
              <p class="body">
                Depois da sessão, a durabilidade das tranças depende da rotina de cuidados. Recomendamos
                hidratação regular, protecção nocturna e acompanhamento periódico para manter o
                entrelaçado firme sem danificar o cabelo natural.
              </p>
              <p class="body">
                Na consulta, indicamos os produtos e a frequência ideal para o seu tipo de cabelo e estilo
                escolhido. O objectivo é que cada sessão seja um investimento na saúde e na expressão do
                seu cabelo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <app-booking-cta headline="Pronto para expressar o teu estilo?" />
    </main>
  `,
  styles: [
    `
      .hero {
        position: relative;
        height: 100svh;
        min-height: 640px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
      }
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(14, 59, 49, 0.6), rgba(14, 59, 49, 0.2), transparent);
        z-index: 1;
      }
      .content {
        position: relative;
        z-index: 2;
        padding-bottom: 6rem;
        color: var(--color-cream-50);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .lead {
        font-size: var(--text-body);
        line-height: 1.6;
        max-width: 540px;
        opacity: 0.9;
        margin: 0;
      }

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

      .grid {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
        align-items: center;
      }
      .grid.reverse {
        direction: rtl;
      }
      .grid.reverse > * {
        direction: ltr;
      }
      .text {
        max-width: 60ch;
      }
      .body {
        font-size: var(--text-body);
        line-height: 1.7;
        margin: 0 0 1rem;
      }
      .media {
        overflow: hidden;
        border-radius: var(--radius-card);
      }
      @media (min-width: 1024px) {
        .grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ],
})
export class BraidsPage {
  readonly gallery = [
    'https://images.pexels.com/photos/16089262/pexels-photo-16089262.jpeg?auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/11441103/pexels-photo-11441103.jpeg?auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/17043160/pexels-photo-17043160.jpeg?auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/8429081/pexels-photo-8429081.jpeg?auto=format&fit=crop&w=800&q=80',
  ];
}
