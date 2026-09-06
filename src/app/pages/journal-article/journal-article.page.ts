import { Component, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { JournalService, Article } from '@app/core/journal.service';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-journal-article',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      @if (article(); as article) {
        <article>
          <app-section-heading eyebrow="Journal" title="{{ article.title }}" size="display-m" />
          <app-smart-image [src]="article.image" [alt]="article.title" aspectRatio="16 / 9" />
          <div class="body">
            @for (paragraph of paragraphs(); track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>

          <div class="related">
            <h3 class="related-title">Artigos relacionados</h3>
            <div class="related-grid">
              @for (item of related(); track item.slug) {
                <a [routerLink]="item.slug" class="related-card">
                  <app-smart-image [src]="item.image" [alt]="item.title" aspectRatio="16 / 9" />
                  <h4 class="related-name">{{ item.title }}</h4>
                </a>
              }
            </div>
          </div>
        </article>
      } @else {
        <p class="not-found">Artigo não encontrado.</p>
      }
    </main>
  `,
  styles: [
    `
      article {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      article app-smart-image {
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
      .related {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(14, 59, 49, 0.08);
      }
      .related-title {
        font-family: var(--font-display);
        font-size: var(--text-heading);
        margin: 0 0 1.5rem;
      }
      .related-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .related-card {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .related-card app-smart-image {
        border-radius: var(--radius-card);
        overflow: hidden;
      }
      .related-name {
        font-family: var(--font-display);
        font-size: var(--text-heading);
        margin: 0;
      }
      .not-found {
        font-size: var(--text-body);
        opacity: 0.7;
      }
      @media (min-width: 768px) {
        .related-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class JournalArticlePage {
  private readonly route = inject(ActivatedRoute);
  private readonly journal = inject(JournalService);

  slug = computed(() => this.route.snapshot.paramMap.get('slug') || '');

  article = computed(() => this.journal.bySlug(this.slug()));

  paragraphs = computed(() => {
    const body = this.article()?.body || '';
    return body.split('\n').filter(Boolean);
  });

  related = computed(() => {
    const current = this.article()?.slug;
    if (!current) return [];
    return this.journal.articles().filter((a: Article) => a.slug !== current).slice(0, 2);
  });
}
