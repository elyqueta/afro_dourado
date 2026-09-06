import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Sobre Nós"
            title="Cuidar do cabelo é também cuidar daquilo que somos."
            size="display-l"
            eyebrowColor="gold"
          />
          <p class="lead">
            A Afro Dourado nasceu da vontade de criar um espaço onde o cabelo afro seja compreendido,
            respeitado e celebrado. Em Luanda e Huambo, combinamos tricologia, técnica e produtos
            naturais para oferecer cuidados que vão além da estética.
          </p>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max grid">
          <div class="media">
            <app-smart-image
              src="https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=800&q=80"
              alt="Espaço Afro Dourado — ambiente de cuidado capilar"
              aspectRatio="4 / 5"
            />
          </div>
          <div class="text">
            <app-section-heading
              eyebrow="Origem"
              title="De Angola, para Angola."
              size="display-m"
            />
            <p class="body">
              A marca nasceu da observação de uma necessidade real: poucos espaços em Angola unem
              ciência capilar, identidade afro e produtos naturais num mesmo percurso de cuidado.
              A Afro Dourado surgiu para responder a essa lacuna, com uma equipa que entende a
              diversidade do cabelo angolano.
            </p>
            <p class="body">
              Hoje, operamos em Luanda e Huambo, mantendo o mesmo princípio: cada atendimento começa
              por uma escuta e uma avaliação personalizada.
            </p>
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-white);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Valores"
            title="O que nos move."
            size="display-m"
          />
          <div class="values">
            @for (value of values; track $index) {
              <div class="value">
                <h4 class="title">{{ value.title }}</h4>
                <p class="text">{{ value.text }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Espaços"
            title="Luanda e Huambo."
            size="display-m"
          />
          <div class="locations">
            <div class="location">
              <h4 class="name">Luanda</h4>
              <p class="address">Rua Principal, Talatona, Luanda, Angola</p>
              <p class="hours">Segunda a Sexta: 08h00 às 18h00 | Sábado: 09h00 às 14h00</p>
            </div>
            <div class="location">
              <h4 class="name">Huambo</h4>
              <p class="address">Avenida da Independência, Huambo, Angola</p>
              <p class="hours">Segunda a Sexta: 08h00 às 17h30 | Sábado: 09h00 às 13h00</p>
            </div>
          </div>
          <div class="cta">
            <app-pill-button href="/equipa" variant="secondary" size="lg" label="Conhecer a equipa &rarr;"></app-pill-button>
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

      .grid {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2.5rem;
        align-items: center;
      }
      .media {
        overflow: hidden;
        border-radius: var(--radius-card);
        order: -1;
      }
      .text {
        max-width: 60ch;
      }
      .body {
        font-size: var(--text-body);
        line-height: 1.7;
        margin: 0 0 1rem;
      }
      @media (min-width: 1024px) {
        .grid {
          grid-template-columns: 1fr 1fr;
        }
        .media {
          order: 0;
        }
      }

      .values {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      .value {
        padding: 1.5rem;
        background-color: var(--color-cream-50);
        border-radius: var(--radius-card);
        border: 1px solid rgba(14, 59, 49, 0.08);
      }
      .title {
        font-family: var(--font-display);
        font-size: var(--text-heading);
        margin: 0 0 0.5rem;
      }
      .text {
        font-size: var(--text-small);
        line-height: 1.6;
        margin: 0;
        opacity: 0.85;
      }
      @media (min-width: 768px) {
        .values {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .locations {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .location {
        padding: 1.5rem;
        background-color: var(--color-white);
        border-radius: var(--radius-card);
        border: 1px solid rgba(14, 59, 49, 0.08);
      }
      .name {
        font-family: var(--font-display);
        font-size: var(--text-heading);
        margin: 0 0 0.5rem;
      }
      .address, .hours {
        font-size: var(--text-small);
        line-height: 1.5;
        margin: 0 0 0.25rem;
        opacity: 0.85;
      }
      @media (min-width: 768px) {
        .locations {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .cta {
        margin-top: 2.5rem;
      }
    `,
  ],
})
export class AboutPage {
  readonly values = [
    {
      title: 'Ciência',
      text: 'Avaliamos com rigor o couro cabeludo e a haste capilar para personalizar cada tratamento.',
    },
    {
      title: 'Identidade',
      text: 'Respeitamos a história e a textura do cabelo afro como parte fundamental da autoestima.',
    },
    {
      title: 'Natureza',
      text: 'Priorizamos produtos e rotinas que respeitam a oleosidade natural e a saúde do fio.',
    },
    {
      title: 'Cuidado',
      text: 'Cada atendimento é acompanhado de perto, com atenção aos resultados e à manutenção em casa.',
    },
  ];
}
