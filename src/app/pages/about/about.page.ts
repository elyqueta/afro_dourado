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
      <app-section-heading eyebrow="Sobre Nós" title="Cuidar do cabelo é também cuidar daquilo que somos." size="display-m" />

      <div class="content">
        <div class="text">
          <p class="body">[[PENDENTE-CLIENTE]] <!-- TODO: aguardar validação AfroDourado --></p>
          <p class="body">[[PENDENTE-CLIENTE]] <!-- TODO: aguardar validação AfroDourado --></p>
        </div>
        <div class="media">
          <app-smart-image src="/media/about.jpg" alt="Fotografia editorial AfroDourado" aspectRatio="4 / 5" />
        </div>
      </div>
    </main>
  `,
  styles: [`
    .content {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: center;
    }
    .body {
      font-size: var(--text-body);
      line-height: 1.6;
      max-width: 56ch;
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
  `]
})
export class AboutPage {}
