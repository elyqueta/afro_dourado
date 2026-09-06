import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { BadgeNumberComponent } from '@app/shared/ui/badge-number/badge-number.component';
import { AccordionComponent } from '@app/shared/ui/accordion/accordion.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';

@Component({
  selector: 'app-trichology',
  standalone: true,
  imports: [SectionHeadingComponent, BadgeNumberComponent, BookingCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading
        eyebrow="Tricologia"
        title="Compreender o cabelo é o primeiro passo para cuidar dele."
        size="display-m"
      />

      <div class="treatments">
        @for (treatment of treatments; track treatment.id) {
          <div class="treatment">
            <app-badge-number [number]="treatment.id" />
            <div class="info">
              <h3 class="name">{{ treatment.name }}</h3>
              <p class="desc">{{ treatment.description }}</p>
              <button
                type="button"
                class="details-toggle"
                (click)="toggle(treatment.id)"
                [attr.aria-expanded]="expanded() === treatment.id"
              >
                {{ expanded() === treatment.id ? 'Menos detalhes' : 'Mais detalhes' }}
              </button>
              @if (expanded() === treatment.id) {
                <div class="details">
                  <p><strong>Problema:</strong> [[PENDENTE-CLIENTE]]</p>
                  <p><strong>Abordagem:</strong> [[PENDENTE-CLIENTE]]</p>
                  <p><strong>Benefícios:</strong> [[PENDENTE-CLIENTE]]</p>
                  <p><strong>Processo:</strong> [[PENDENTE-CLIENTE]]</p>
                  <p><strong>Duração:</strong> [[PENDENTE-CLIENTE]]</p>
                  <p><strong>Preparação:</strong> [[PENDENTE-CLIENTE]]</p>
                  <p><strong>Cuidados posteriores:</strong> [[PENDENTE-CLIENTE]]</p>
                  <!-- TODO: aguardar validação Afro Dourado -->
                </div>
              }
            </div>
          </div>
        }
      </div>

      <app-booking-cta headline="Pronto para cuidar do teu cabelo?" />
    </main>
  `,
  styles: [
    `
      .treatments {
        margin-top: 3rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .treatment {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        padding-bottom: 2rem;
        border-bottom: 1px solid rgba(14, 59, 49, 0.08);
      }
      .info {
        flex: 1;
      }
      .name {
        font-family: var(--font-display);
        font-size: var(--text-display-m);
        margin: 0 0 0.5rem;
      }
      .desc {
        font-size: var(--text-body);
        line-height: 1.6;
        margin: 0 0 1rem;
        max-width: 56ch;
      }
      .details-toggle {
        background: none;
        border: none;
        padding: 0;
        font-family: var(--font-sans);
        font-size: var(--text-small);
        font-weight: 600;
        color: var(--color-brand-gold-500);
        cursor: pointer;
        margin-bottom: 1rem;
      }
      .details-toggle:focus-visible {
        outline: 2px solid var(--color-brand-gold-500);
        outline-offset: 2px;
      }
      .details {
        padding: 1rem;
        background-color: var(--color-cream-50);
        border-radius: var(--radius-card);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .details p {
        font-size: var(--text-small);
        line-height: 1.5;
        margin: 0;
      }
    `,
  ],
})
export class TrichologyPage {
  readonly treatments = [
    { id: '01', name: 'Avaliação Tricológica', description: '[[PENDENTE-CLIENTE]]' },
    { id: '02', name: 'Terapia Capilar', description: '[[PENDENTE-CLIENTE]]' },
    { id: '03', name: 'Microagulhamento', description: '[[PENDENTE-CLIENTE]]' },
    { id: '04', name: 'Tratamentos Específicos', description: '[[PENDENTE-CLIENTE]]' },
  ];
  readonly expanded = signal<string | null>(null);

  toggle(id: string): void {
    this.expanded.update((current: string | null) => (current === id ? null : id));
  }
}
