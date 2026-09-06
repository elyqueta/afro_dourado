import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Agendamento" title="Agende o seu atendimento" size="display-m" />
      <p class="body">[[PENDENTE-CLIENTE]] <!-- TODO: aguardar validação AfroDourado --></p>
       <app-pill-button href="/agendamento" variant="primary" size="lg" label="Começar agendamento"></app-pill-button>
    </main>
  `,
  styles: [`
    .body {
      margin-top: 1.5rem;
      max-width: 56ch;
    }
  `]
})
export class BookingPage {}
