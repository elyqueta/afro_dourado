import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-journal-article',
  standalone: true,
  imports: [SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Journal" title="Artigo" size="display-m" />
      <p class="body">[[PENDENTE-CLIENTE]] <!-- TODO: aguardar validação AfroDourado --></p>
    </main>
  `,
  styles: [`
    .body {
      margin-top: 1.5rem;
      max-width: 56ch;
    }
  `]
})
export class JournalArticlePage {}
