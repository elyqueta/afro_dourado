import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Journal" title="Histórias e cuidados." size="display-m" />
      <div class="grid">
        @for (article of articles; track article.title) {
          <a [routerLink]="article.slug ? ['/journal', article.slug] : '/journal'" class="card">
            <app-smart-image [src]="article.image" [alt]="article.title" aspectRatio="16 / 9" />
            <h4 class="title">{{ article.title }}</h4>
            <p class="excerpt">{{ article.excerpt }}</p>
          </a>
        }
      </div>
    </main>
  `,
  styles: [`
    .grid {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .card {
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .card app-smart-image {
      border-radius: var(--radius-card);
      overflow: hidden;
    }
    .title {
      font-family: var(--font-display);
      font-size: var(--text-heading);
      margin: 0;
    }
    .excerpt {
      font-size: var(--text-small);
      line-height: 1.5;
      margin: 0;
      opacity: 0.7;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class JournalPage {
  readonly articles = [
    { title: 'Queda capilar: o que precisa de saber', excerpt: '[[PENDENTE-CLIENTE]]', image: '/media/journal-1.jpg', slug: 'queda-capilar' },
    { title: 'Cuidados com cabelo afro no dia a dia', excerpt: '[[PENDENTE-CLIENTE]]', image: '/media/journal-2.jpg', slug: 'cuidados-cabelo-afro' },
    { title: 'Tranças: estilo e protecção', excerpt: '[[PENDENTE-CLIENTE]]', image: '/media/journal-3.jpg', slug: 'trancas-estilo-proteccao' },
  ];
}
