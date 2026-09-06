import { Component, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JournalService } from '@app/core/journal.service';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, SmartImageComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Journal" title="Histórias e cuidados." size="display-m" />

      @if (featured(); as featured) {
        <a [routerLink]="featured.slug" class="featured">
          <app-smart-image [src]="featured.image" [alt]="featured.title" aspectRatio="16 / 9" />
          <div class="featured-text">
            <app-section-heading eyebrow="Em destaque" title="{{ featured.title }}" size="display-m" />
            <p class="excerpt">{{ featured.excerpt }}</p>
            <app-pill-button variant="secondary" size="md" label="Ler artigo &rarr;"></app-pill-button>
          </div>
        </a>
      }

      <div class="grid">
        @for (article of rest(); track article.slug) {
          <a [routerLink]="article.slug" class="card">
            <app-smart-image [src]="article.image" [alt]="article.title" aspectRatio="16 / 9" />
            <h4 class="title">{{ article.title }}</h4>
            <p class="excerpt">{{ article.excerpt }}</p>
          </a>
        }
      </div>
    </main>
  `,
  styles: [
    `
      .featured {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
      }
      .featured app-smart-image {
        border-radius: var(--radius-card);
        overflow: hidden;
      }
      .featured-text {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .excerpt {
        font-size: var(--text-body);
        line-height: 1.6;
        margin: 0;
        max-width: 70ch;
      }

      .grid {
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
        .featured {
          flex-direction: row;
          align-items: center;
          gap: 2rem;
        }
        .featured app-smart-image {
          width: 50%;
          flex-shrink: 0;
        }
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `,
  ],
})
export class JournalPage {
  private readonly journal = inject(JournalService);

  featured = computed(() => this.journal.featured());
  rest = computed(() => this.journal.rest());
}
