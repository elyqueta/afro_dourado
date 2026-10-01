import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Resultados"
            title="Resultados reais.<br/>Histórias verdadeiras."
            size="display-l"
            eyebrowColor="gold"
          />
          <p class="lead">
            Cada atendimento é único. Estes são alguns dos percursos de cuidado partilhados
            por quem já passou pela Afro Dourado.
          </p>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <div class="grid">
            @for (story of stories; track $index) {
              <div class="card">
                <div class="photo">
                  <app-smart-image
                    [src]="story.photo"
                    [alt]="story.name"
                    aspectRatio="4 / 5"
                  />
                </div>
                <div class="text">
                  <h3 class="name">{{ story.name }}</h3>
                  <p class="role">{{ story.role }}</p>
                  <p class="quote">{{ story.quote }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-white);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Antes & Depois"
            title="O acompanhamento faz a diferença."
            size="display-m"
          />
          <p class="lead">
            As imagens seguintes ilustram resultados reais obtidos ao longo do tempo.
            Cada caso tem o seu próprio ritmo e necessidades.
          </p>
          <div class="gallery">
            @for (img of beforeAfterImages; track $index) {
              <div class="item">
                <app-smart-image
                  [src]="img"
                  alt="Antes e depois — resultado real Afro Dourado"
                  aspectRatio="1 / 1"
                />
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max cta">
          <app-section-heading
            eyebrow="Quer o seu resultado"
            title="Vamos conversar sobre o seu cabelo."
            size="display-m"
            eyebrowColor="gold"
          />
          <app-pill-button href="/agendamento" variant="secondary-light" size="lg" label="Agendar avaliação"></app-pill-button>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .lead {
        font-size: var(--text-body);
        line-height: 1.7;
        max-width: 70ch;
        margin: 1.5rem 0 0;
        opacity: 0.85;
      }

      .grid {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .card {
        background-color: var(--color-white);
        border-radius: var(--radius-card);
        overflow: hidden;
        border: 1px solid rgba(14, 59, 49, 0.08);
      }
      .photo {
        overflow: hidden;
      }
      .text {
        padding: 1.5rem;
      }
      .name {
        font-family: var(--font-display);
        font-size: var(--text-heading);
        margin: 0 0 0.25rem;
      }
      .role {
        font-size: var(--text-small);
        margin: 0 0 1rem;
        opacity: 0.7;
      }
      .quote {
        font-size: var(--text-body);
        line-height: 1.7;
        margin: 0;
        opacity: 0.9;
      }
      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 1024px) {
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .gallery {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .item {
        border-radius: var(--radius-card);
        overflow: hidden;
      }
      @media (min-width: 768px) {
        .gallery {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .cta {
        text-align: center;
      }
      :host-context(html[data-assistant='open'][data-assistant-mode='split']) .grid {
        grid-template-columns: 1fr;
        max-width: 560px;
      }
      :host-context(html[data-assistant='open'][data-assistant-mode='split']) .gallery {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    `,
  ],
})
export class ResultsPage {
  readonly stories = [
    {
      name: 'Ana Luísa M.',
      role: 'Cliente — Luanda',
      quote: 'Depois de anos de queda, finalmente entendi o que o meu cabelo precisava. O acompanhamento fez toda a diferença.',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Joana K.',
      role: 'Cliente — Huambo',
      quote: 'As tranças ficaram impecáveis e o cabelo não sofreu. Pela primeira vez senti que estava a cuidar dele a sério.',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Marcela S.',
      role: 'Cliente — Luanda',
      quote: 'A avaliação tricológica mudou a minha rotina. Hoje sei exactamente o que usar e o que evitar.',
      photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=format&fit=crop&w=600&q=80',
    },
  ];

  readonly beforeAfterImages = [
    'https://images.pexels.com/photos/3735643/pexels-photo-3735643.jpeg?auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/3998012/pexels-photo-3998012.jpeg?auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/3115708/pexels-photo-3115708.jpeg?auto=format&fit=crop&w=800&q=80',
  ];
}
