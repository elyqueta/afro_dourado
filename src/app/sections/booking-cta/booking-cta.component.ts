import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-booking-cta',
  standalone: true,
  imports: [PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50); text-align: center;">
      <div class="container-max">
        <h2 class="headline">{{ headline() }}</h2>
        <div class="actions">
          <app-pill-button href="/agendamento" variant="primary" size="lg">{{ primaryCta() }}</app-pill-button>
          <app-pill-button href="https://wa.me/244XXXXXXXXX" variant="secondary-light" size="lg" target="_blank" rel="noopener noreferrer">
            {{ secondaryCta() }}
          </app-pill-button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .headline {
      font-family: var(--font-display);
      font-size: var(--text-display-l);
      font-weight: 400;
      line-height: 1.1;
      margin: 0 0 2rem;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  `]
})
export class BookingCtaComponent {
  readonly headline = input.required<string>();
  readonly primaryCta = input<string>('Agendar atendimento');
  readonly secondaryCta = input<string>('Falar no WhatsApp');
}
