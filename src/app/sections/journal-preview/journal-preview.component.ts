import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-journal-preview',
  standalone: true,
  imports: [RouterLink, SmartImageComponent, SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y" style="background-color: var(--color-cream-50);">
      <div class="container-max">
        <app-section-heading eyebrow="Journal" title="Histórias e cuidados." size="display-m" />
        <div class="grid">
          @for (article of articles(); track article.title) {
            <a [routerLink]="article.slug ? ['/journal', article.slug] : '/journal'" class="card">
              <app-smart-image [src]="article.image" [alt]="article.title" aspectRatio="16 / 9" />
              <h4 class="title">{{ article.title }}</h4>
              <p class="excerpt">{{ article.excerpt }}</p>
            </a>
          }
        </div>
        <div class="cta">
           <app-pill-button href="/journal" variant="secondary" size="md" label="Ver todos &rarr;"></app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .card {
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: transform var(--duration-micro) var(--ease-out-3);
    }
    .card:hover {
      transform: translateY(-4px);
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
    .cta {
      margin-top: 2.5rem;
    }
  `]
})
export class JournalPreviewComponent {
  readonly articles = input.required<{ title: string; excerpt: string; image: string; slug?: string }[]>();
}
