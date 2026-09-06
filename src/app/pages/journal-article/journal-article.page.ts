import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';

@Component({
  selector: 'app-journal-article',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading
        eyebrow="Journal"
        title="Queda capilar: quando procurar ajuda"
        size="display-m"
      />
      <div class="article">
        <app-smart-image
          src="https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=1200&q=80"
          alt="Queda capilar: quando procurar ajuda"
          aspectRatio="16 / 9"
        />
        <div class="body">
          <p>
            A queda capilar é uma preocupação comum entre pessoas com cabelo afro. É normal perder
            entre 50 e 100 fios por dia, mas quando a quantidade aumenta de forma visível, é
            importante procurar orientação profissional.
          </p>
          <p>
            Na Afro Dourado, a avaliação tricológica começa por um exame detalhado do couro cabeludo
            e da haste capilar. A partir daí, identificamos causas possíveis, como stress, défices
            nutricionais, tratamentos químicos ou factores genéticos.
          </p>
          <p>
            Os tratamentos podem incluir terapias capilares personalizadas, microagulhamento e
            recomendações de rotina em casa. O importante é não esperar: quanto mais cedo a
            avaliação, melhores as chances de preservar o cabelo existente e estimular o crescimento
            saudável.
          </p>
          <p>
            Se estás a notar mais fios no travesseiro, na escova ou no ralo, marca a tua consulta em
            Luanda ou Huambo. A primeira consulta é o primeiro passo para compreender o que está a
            acontecer e definir um plano de cuidado.
          </p>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .article {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .article app-smart-image {
        border-radius: var(--radius-card);
        overflow: hidden;
      }
      .body {
        max-width: 70ch;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .body p {
        font-size: var(--text-body);
        line-height: 1.7;
        margin: 0;
      }
    `,
  ],
})
export class JournalArticlePage {}
