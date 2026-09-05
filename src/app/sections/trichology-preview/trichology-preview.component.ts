import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { OrganicDividerComponent } from '@app/shared/ui/divider-organic/divider-organic.component';

@Component({
  selector: 'app-trichology-preview',
  standalone: true,
  imports: [SmartImageComponent, SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
      <div class="container-max grid">
        <div class="media">
          <app-smart-image
            [src]="imageSrc()"
            alt="Fotografia macro de cabelo — Tricologia AfroDourado"
            aspectRatio="4 / 5"
          />
        </div>
        <div class="text">
          <app-section-heading
            eyebrow="Tricologia"
            eyebrowColor="gold"
            title="Ciência para compreender.<br/>Cuidado para transformar."
             [titleParts]="titleParts()"
            size="display-m"
          />
          <p class="desc">{{ description() }}</p>
          <app-pill-button href="/tricologia" variant="secondary-light" size="md">Ver Tricologia &rarr;</app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      align-items: center;
    }
    .media {
      overflow: hidden;
      border-radius: var(--radius-card);
    }
    .desc {
      font-size: var(--text-body);
      line-height: 1.6;
      opacity: 0.85;
      max-width: 56ch;
      margin: 1.5rem 0;
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `]
})
export class TrichologyPreviewComponent {
  readonly imageSrc = input.required<string>();
  readonly description = input.required<string>();
  readonly titleParts = input<{ text: string; gold?: boolean }[]>([]);
}
