import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Serviços"
            title="Ciência, técnica e identidade no mesmo espaço."
            size="display-l"
            eyebrowColor="gold"
          />
          <p class="lead">
            Cada serviço foi pensado para responder a uma necessidade real do cabelo afro.
            Começa sempre por uma avaliação personalizada e segue com um plano claro.
          </p>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <div class="service">
            <div class="media">
              <app-smart-image
                src="https://images.pexels.com/photos/3115708/pexels-photo-3115708.jpeg?auto=format&fit=crop&w=800&q=80"
                alt="Fotografia macro de cabelo — Tricologia Afro Dourado"
                aspectRatio="4 / 5"
              />
            </div>
            <div class="text">
              <app-section-heading
                eyebrow="Tricologia"
                title="Ciência para compreender.<br/>Cuidado para transformar."
                size="display-m"
              />
              <p class="body">
                Avaliação tricológica, terapia capilar, microagulhamento e protocolos específicos
                para queda, quebra e crescimento — sempre com acompanhamento próximo.
              </p>
              <app-pill-button href="/tricologia" variant="primary" size="md" label="Ver Tricologia &rarr;"></app-pill-button>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-white);">
        <div class="container-max">
          <div class="service service-reverse">
            <div class="media">
              <app-smart-image
                src="https://images.pexels.com/photos/16089262/pexels-photo-16089262.jpeg?auto=format&fit=crop&w=800&q=80"
                alt="Galeria de tranças e penteados protectivos Afro Dourado"
                aspectRatio="4 / 5"
              />
            </div>
            <div class="text">
              <app-section-heading
                eyebrow="Tranças & Estética"
                title="O teu cabelo.<br/>A tua expressão."
                size="display-m"
              />
              <p class="body">
                Tranças Nagô, twists, box braids e penteados protectivos — feitos com técnica,
                protecção e respeito pelo cabelo afro.
              </p>
              <app-pill-button href="/trancas-estetica" variant="secondary" size="md" label="Ver Tranças &rarr;"></app-pill-button>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <div class="cta">
            <app-section-heading
              eyebrow="Próximo passo"
              title="Queremos perceber o que procura."
              size="display-m"
              eyebrowColor="gold"
            />
            <p class="lead">Marque uma avaliação ou fale directamente com a nossa equipa.</p>
            <div class="actions">
              <app-pill-button href="/agendamento" variant="secondary-light" size="lg" label="Agendar atendimento"></app-pill-button>
              <app-pill-button href="/contacto" variant="secondary-light" size="lg" label="Contactar"></app-pill-button>
            </div>
          </div>
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

      .service {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
        align-items: center;
      }
      .service-reverse {
        direction: rtl;
      }
      .service-reverse > * {
        direction: ltr;
      }
      .media {
        overflow: hidden;
        border-radius: var(--radius-card);
      }
      .text {
        max-width: 60ch;
      }
      .body {
        font-size: var(--text-body);
        line-height: 1.7;
        margin: 1rem 0 1.5rem;
        opacity: 0.9;
      }
      @media (min-width: 1024px) {
        .service {
          grid-template-columns: 1fr 1fr;
        }
        .service-reverse {
          grid-template-columns: 1fr 1fr;
        }
      }

      .cta {
        margin-top: 2.5rem;
        text-align: center;
      }
      .actions {
        margin-top: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
      }
    `,
  ],
})
export class ServicesPage {}
