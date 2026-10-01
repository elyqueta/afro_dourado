import { Component, input, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';

export function googleMapsEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

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
            <p class="map-note">Mapa aproximado baseado no endereço de demonstração.</p>
            <iframe
              class="map"
              [src]="mapUrl()"
              title="Mapa aproximado da unidade seleccionada"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
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
    .map-note {
      margin: 1.25rem 0 0.5rem;
      font-size: var(--text-small);
      opacity: 0.7;
    }
    .map {
      display: block;
      width: 100%;
      height: clamp(220px, 32vw, 360px);
      border: 0;
      border-radius: var(--radius-card);
      background: var(--color-white);
    }
    .actions {
      margin-top: 1.5rem;
    }
  `]
})
export class LocationPickerComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly selected = signal<'luanda' | 'huambo' | null>(null);

  readonly luandaTitle = input.required<string>();
  readonly luandaAddress = input.required<string>();
  readonly luandaHours = input.required<string>();
  readonly luandaPhone = input.required<string>();

  readonly huamboTitle = input.required<string>();
  readonly huamboAddress = input.required<string>();
  readonly huamboHours = input.required<string>();
  readonly huamboPhone = input.required<string>();
  readonly mapUrl = computed<SafeResourceUrl | null>(() => {
    const unit = this.selected();
    if (!unit) return null;
    const query = unit === 'luanda' ? this.luandaAddress() : this.huamboAddress();
    return this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsEmbedUrl(query));
  });

  select(unit: 'luanda' | 'huambo'): void {
    this.selected.update(current => current === unit ? null : unit);
  }
}
