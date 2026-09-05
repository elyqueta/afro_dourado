import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [SectionHeadingComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Equipa" title="Quem cuida de ti." size="display-m" />

      <div class="grid">
        @for (member of members; track member.name) {
          <div class="member">
            <app-smart-image [src]="member.photo" [alt]="member.name" aspectRatio="3 / 4" />
            <div class="info">
              <h4 class="name">{{ member.name }}</h4>
              <p class="role">{{ member.role }}</p>
              <p class="bio">{{ member.bio }}</p>
            </div>
          </div>
        }
      </div>
    </main>
  `,
  styles: [`
    .grid {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
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
      font-weight: 600;
    }
    .bio {
      font-size: var(--text-small);
      line-height: 1.5;
      margin: 0;
      opacity: 0.85;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class TeamPage {
  readonly members = [
    { name: 'Ana Luísa Mendes', role: 'Tricologista', bio: 'Especialista em avaliação capilar e tratamentos personalizados para queda, quebra e crescimento.', photo: 'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=600&q=80' },
    { name: 'Carlos Eduardo', role: 'Especialista em Tranças', bio: 'Técnico em penteados protectivos, tranças Nagô e estética capilar.', photo: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mariana Costa', role: 'Terapeuta Capilar', bio: 'Focada em hidratação profunda, recuperação de danos e rotinas de cuidado em casa.', photo: 'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=600&q=80' },
  ];
}
