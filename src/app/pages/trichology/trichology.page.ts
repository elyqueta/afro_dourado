import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { BadgeNumberComponent } from '@app/shared/ui/badge-number/badge-number.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { VideoBackgroundComponent } from '@app/shared/ui/video-background/video-background.component';

@Component({
  selector: 'app-trichology',
  standalone: true,
  imports: [SectionHeadingComponent, BadgeNumberComponent, SmartImageComponent, PillButtonComponent, VideoBackgroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="hero">
        <app-video-background
          videoSrc="https://videos.pexels.com/video-files/6698744/6698744-uhd_2732_1440_25fps.mp4"
          posterSrc="https://images.pexels.com/photos/3115708/pexels-photo-3115708.jpeg?auto=format&fit=crop&w=1920&q=80"
        />
        <div class="overlay"></div>
        <div class="content container-max">
          <app-section-heading
            eyebrow="Tricologia"
            title="Compreender o cabelo é o primeiro passo para cuidar dele."
            size="display-m"
            eyebrowColor="gold"
          />
          <p class="lead">
            Avaliação especializada do couro cabeludo e da haste capilar, com protocolos personalizados.
          </p>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <div class="treatments">
            @for (treatment of treatments; track treatment.id) {
              <div class="treatment" [class.expanded]="expanded() === treatment.id">
                <app-badge-number [number]="treatment.id" />
                <div class="info">
                  <div class="header">
                    <div>
                      <h3 class="name">{{ treatment.name }}</h3>
                      <p class="desc">{{ treatment.description }}</p>
                    </div>
                    <div class="media">
                      <app-smart-image
                        [src]="treatment.image"
                        [alt]="treatment.name"
                        aspectRatio="4 / 5"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    class="details-toggle"
                    (click)="toggle(treatment.id)"
                    [attr.aria-expanded]="expanded() === treatment.id"
                  >
                    {{ expanded() === treatment.id ? 'Menos detalhes' : 'Mais detalhes' }}
                  </button>

                   @if (expanded() === treatment.id) {
                     <div class="details">
                       <p><strong>Problema:</strong> {{ treatment.details.problema }}</p>
                       <p><strong>Abordagem:</strong> {{ treatment.details.abordagem }}</p>
                       <p><strong>Benefícios:</strong> {{ treatment.details.beneficios }}</p>
                       <p><strong>Processo:</strong> {{ treatment.details.processo }}</p>
                       <p><strong>Duração:</strong> {{ treatment.details.duracao }}</p>
                       <p><strong>Preparação:</strong> {{ treatment.details.preparacao }}</p>
                       <p><strong>Cuidados posteriores:</strong> {{ treatment.details.cuidadosPosteriores }}</p>
                     </div>
                   }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="cta-sticky">
        <app-pill-button href="/agendamento" variant="primary" size="lg" label="Agendar avaliação"></app-pill-button>
      </section>
    </main>
  `,
  styles: [
    `
      .hero {
        position: relative;
        height: 60svh;
        min-height: 480px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
      }
      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(14, 59, 49, 0.7), rgba(14, 59, 49, 0.3), transparent);
        z-index: 1;
      }
      .content {
        position: relative;
        z-index: 2;
        padding-bottom: 3rem;
        color: var(--color-cream-50);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .lead {
        font-size: var(--text-body);
        line-height: 1.6;
        max-width: 640px;
        opacity: 0.9;
        margin: 0;
      }

      .treatments {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .treatment {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        padding-bottom: 2rem;
        border-bottom: 1px solid rgba(14, 59, 49, 0.08);
      }
      .treatment:last-child {
        border-bottom: none;
      }
      .info {
        flex: 1;
      }
      .header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .name {
        font-family: var(--font-display);
        font-size: var(--text-display-m);
        margin: 0 0 0.5rem;
      }
      .desc {
        font-size: var(--text-body);
        line-height: 1.6;
        margin: 0;
        max-width: 56ch;
      }
      .media {
        border-radius: var(--radius-card);
        overflow: hidden;
        display: none;
      }
      .details-toggle {
        background: none;
        border: none;
        padding: 0;
        font-family: var(--font-sans);
        font-size: var(--text-small);
        font-weight: 600;
        color: var(--color-brand-gold-500);
        cursor: pointer;
        margin-top: 1rem;
      }
      .details-toggle:focus-visible {
        outline: 2px solid var(--color-brand-gold-500);
        outline-offset: 2px;
      }
      .details {
        margin-top: 1rem;
        padding: 1rem;
        background-color: var(--color-white);
        border-radius: var(--radius-card);
        border: 1px solid rgba(14, 59, 49, 0.08);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .details p {
        font-size: var(--text-small);
        line-height: 1.5;
        margin: 0;
      }

      @media (min-width: 768px) {
        .hero {
          height: 70svh;
          min-height: 560px;
        }
        .header {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .media {
          display: block;
          width: 220px;
          flex-shrink: 0;
        }
        .desc {
          margin: 0;
        }
      }

      .cta-sticky {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--color-brand-green-900);
        padding: 1rem var(--space-container-x);
        display: flex;
        justify-content: center;
        z-index: 40;
        box-shadow: 0 -4px 20px rgba(14, 59, 49, 0.15);
      }
      .cta-sticky app-pill-button {
        width: 100%;
        max-width: var(--container-max);
      }
      @media (min-width: 1024px) {
        .cta-sticky {
          display: none;
        }
      }
    `,
  ],
})
export class TrichologyPage {
  readonly treatments = [
    {
      id: '01',
      name: 'Avaliação Tricológica',
      description: 'Consulta inicial com análise do couro cabeludo e haste capilar para diagnóstico personalizado.',
      image: 'https://images.pexels.com/photos/3735643/pexels-photo-3735643.jpeg?auto=format&fit=crop&w=600&q=80',
      details: {
        problema: 'Necessidade de diagnóstico preciso do couro cabeludo e haste capilar para identificar alterações.',
        abordagem: 'Análise visual e tecnológica para identificar causas de queda, quebra ou outras alterações capilares.',
        beneficios: 'Conhecimento detalhado do estado capilar para plano de tratamento eficaz e personalizado.',
        processo: 'Consulta individualizada com análise e discussão pormenorizada dos resultados com o especialista.',
        duracao: '45 a 60 minutos.',
        preparacao: 'Chegar com o cabelo limpo e sem produtos para análise em condições naturais.',
        cuidadosPosteriores: 'Seguir as recomendações do especialista para manutenção dos resultados.',
      },
    },
    {
      id: '02',
      name: 'Terapia Capilar',
      description: 'Tratamento intensivo para queda, quebra e danos químicos, com protocolo personalizado.',
      image: 'https://images.pexels.com/photos/3998012/pexels-photo-3998012.jpeg?auto=format&fit=crop&w=600&q=80',
      details: {
        problema: 'Queda, quebra ou danos químicos que necessitam de intervenção especializada e contínua.',
        abordagem: 'Protocolo personalizado com produtos e técnicas adequadas ao tipo de cabelo e diagnóstico.',
        beneficios: 'Redução da queda, fortalecimento da estrutura capilar e recuperação da vitalidade.',
        processo: 'Aplicação de produtos específicos seguida de massagem e técnica de estimulação do couro cabeludo.',
        duracao: '60 a 90 minutos.',
        preparacao: 'Não usar produtos fixadores no dia da sessão para garantir a eficácia do tratamento.',
        cuidadosPosteriores: 'Evitar lavagens excessivas e usar produtos recomendados em casa para prolongar resultados.',
      },
    },
    {
      id: '03',
      name: 'Microagulhamento',
      description: 'Procedimento minimamente invasivo para estimular a regeneração do couro cabeludo.',
      image: 'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=600&q=80',
      details: {
        problema: 'Necessidade de estimular a regeneração e melhorar a absorção de ativos no couro cabeludo.',
        abordagem: 'Procedimento com agulhas finas para criar microcanais e estimular a produção natural de colagénio.',
        beneficios: 'Melhora da absorção de produtos, estímulo de crescimento e redução de quedas.',
        processo: 'Limpeza da área, aplicação de anestésico local se necessário e passagem do equipamento de microagulhamento.',
        duracao: '30 a 45 minutos.',
        preparacao: 'Evitar exposição solar intensa nos dias anteriores ao procedimento.',
        cuidadosPosteriores: 'Não molhar o couro cabeludo nas primeiras 12 horas e evitar exercício intenso por 48 horas.',
      },
    },
    {
      id: '04',
      name: 'Tratamentos Específicos',
      description: 'Protocolos personalizados conforme diagnóstico: hidratação, controlo de oleosidade, anti-queda.',
      image: 'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=600&q=80',
      details: {
        problema: 'Necessidade de protocolos direcionados para hidratação, controlo de oleosidade ou queda.',
        abordagem: 'Diagnóstico prévio e seleção de técnicas e produtos específicos para cada caso.',
        beneficios: 'Equilíbrio do couro cabeludo e melhoria da qualidade e aparência da haste capilar.',
        processo: 'Aplicação personalizada conforme protocolo definido na avaliação inicial.',
        duracao: 'Variável conforme protocolo (45 a 90 minutos).',
        preparacao: 'Manter o cabelo limpo e sem produtos no dia do tratamento para melhor absorção.',
        cuidadosPosteriores: 'Seguir a rotina de manutenção indicada para prolongar os resultados entre sessões.',
      },
    },
  ];
  readonly expanded = signal<string | null>(null);

  toggle(id: string): void {
    this.expanded.update((current: string | null) => (current === id ? null : id));
  }
}
