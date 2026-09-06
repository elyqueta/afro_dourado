import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading
        eyebrow="Sobre Nós"
        title="Cuidar do cabelo é também cuidar daquilo que somos."
        size="display-m"
      />

      <div class="content">
        <div class="text">
          <p class="body">
            A Afro Dourado nasceu da vontade de criar um espaço onde o cabelo afro seja
            compreendido, respeitado e celebrado. Em Luanda e Huambo, combinamos tricologia, técnica
            e produtos naturais para oferecer cuidados que vão além da estética.
          </p>
          <p class="body">
            Acreditamos que cada cabelo conta uma história. Por isso, a nossa abordagem começa por
            ouvir, avalia e personaliza cada tratamento, seja para queda capilar, quebra, hidratação
            ou para expressar identidade através de tranças e penteados protectivos.
          </p>
          <p class="body">
            A nossa missão é unir ciência, cultura e natureza num mesmo espaço, com profissionais
            que entendem a diversidade do cabelo angolano.
          </p>
        </div>
        <div class="media">
          <app-smart-image
            src="https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=800&q=80"
            alt="Fotografia editorial Afro Dourado — detalhe de cabelo natural"
            aspectRatio="4 / 5"
          />
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .content {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: center;
      }
      .body {
        font-size: var(--text-body);
        line-height: 1.7;
        max-width: 60ch;
        margin: 0 0 1rem;
      }
      .media {
        overflow: hidden;
        border-radius: var(--radius-card);
      }
      @media (min-width: 1024px) {
        .content {
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ],
})
export class AboutPage {}
