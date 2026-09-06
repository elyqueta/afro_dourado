import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [PillButtonComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y">
      <div class="container-max">
        <app-section-heading eyebrow="Unidades" title="Escolha a sua unidade" size="display-m" />
        <div class="picker">
          <button type="button" class="unit" [class.active]="selected() === 'luanda'" (click)="select('luanda')">
            <span class="name">Luanda</span>
          </button>
          <button type="button" class="unit" [class.active]="selected() === 'huambo'" (click)="select('huambo')">
            <span class="name">Huambo</span>
          </button>
        </div>

        @if (selected(); as unit) {
          <div class="details">
            <h3 class="unit-title">{{ unit === 'luanda' ? luandaTitle() : huamboTitle() }}</h3>
            <p class="address">{{ unit === 'luanda' ? luandaAddress() : huamboAddress() }}</p>
            <p class="hours">{{ unit === 'luanda' ? luandaHours() : huamboHours() }}</p>
            <p class="phone">{{ unit === 'luanda' ? luandaPhone() : huamboPhone() }}</p>
            <div class="actions">
               <app-pill-button href="/agendamento" variant="primary" size="md" label="Agendar nesta unidade"></app-pill-button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .picker {
      display: flex;
      gap: 1rem;
      margin: 2rem 0;
    }
    .unit {
      flex: 1;
      padding: 1.25rem;
      border: 1px solid rgba(14, 59, 49, 0.15);
      border-radius: var(--radius-card);
      background: transparent;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: var(--text-heading);
      font-weight: 600;
      color: var(--color-ink-900);
      transition: all var(--duration-micro) var(--ease-out-3);
    }
    .unit:hover,
    .unit.active {
      border-color: var(--color-brand-gold-500);
      background-color: rgba(199, 162, 75, 0.06);
    }
    .unit-title {
      font-family: var(--font-display);
      font-size: var(--text-display-m);
      margin: 0 0 0.75rem;
    }
    .address, .hours, .phone {
      font-size: var(--text-body);
      line-height: 1.6;
      margin: 0 0 0.5rem;
    }
    .actions {
      margin-top: 1.5rem;
    }
  `]
})
export class LocationPickerComponent {
  readonly selected = signal<'luanda' | 'huambo' | null>(null);

  readonly luandaTitle = input.required<string>();
  readonly luandaAddress = input.required<string>();
  readonly luandaHours = input.required<string>();
  readonly luandaPhone = input.required<string>();

  readonly huamboTitle = input.required<string>();
  readonly huamboAddress = input.required<string>();
  readonly huamboHours = input.required<string>();
  readonly huamboPhone = input.required<string>();

  select(unit: 'luanda' | 'huambo'): void {
    this.selected.update(current => current === unit ? null : unit);
  }
}
