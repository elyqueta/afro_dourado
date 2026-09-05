import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-team-preview',
  standalone: true,
  imports: [SmartImageComponent, SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y">
      <div class="container-max">
        <app-section-heading eyebrow="Equipa" title="Quem cuida de ti." size="display-m" />
        <div class="grid">
          @for (member of members(); track member.name) {
            <div class="member">
              <app-smart-image [src]="member.photo" [alt]="member.name" aspectRatio="3 / 4" />
              <div class="info">
                <h4 class="name">{{ member.name }}</h4>
                <p class="role">{{ member.role }}</p>
              </div>
            </div>
          }
        </div>
        <div class="cta">
          <app-pill-button href="/equipa" variant="secondary" size="md">Conhecer a equipa &rarr;</app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .member {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .member app-smart-image {
      border-radius: var(--radius-card);
      overflow: hidden;
    }
    .name {
      font-family: var(--font-display);
      font-size: var(--text-heading);
      margin: 0;
    }
    .role {
      font-size: var(--text-small);
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
export class TeamPreviewComponent {
  readonly members = input.required<{ name: string; role: string; photo: string }[]>();
}
