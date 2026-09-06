import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { LocationPickerComponent } from '@app/sections/location-picker/location-picker.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [SectionHeadingComponent, LocationPickerComponent, BookingCtaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <section class="section section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Contactos"
            title="Escolha a sua unidade"
            size="display-m"
            eyebrowColor="gold"
          />
          <p class="lead">
            Estamos em Luanda e Huambo para receber si. Escolha a unidade mais próxima e descubra
            morada, horário e formas de contacto.
          </p>
        </div>
      </section>

      <section class="section section-y" style="background-color: var(--color-cream-50);">
        <div class="container-max">
          <app-location-picker
            [luandaTitle]="luandaTitle"
            [luandaAddress]="luandaAddress"
            [luandaHours]="luandaHours"
            [luandaPhone]="luandaPhone"
            [huamboTitle]="huamboTitle"
            [huamboAddress]="huamboAddress"
            [huamboHours]="huamboHours"
            [huamboPhone]="huamboPhone"
          />
        </div>
      </section>

      <app-booking-cta headline="Pronto para marcar?" />
    </main>
  `,
  styles: [
    `
      .lead {
        font-size: var(--text-body);
        line-height: 1.7;
        max-width: 70ch;
        margin: 1.5rem 0 0;
        opacity: 0.85;
      }
    `,
  ],
})
export class ContactsPage {
  readonly luandaTitle = 'Luanda';
  readonly luandaAddress = 'Rua Principal, Talatona, Luanda, Angola';
  readonly luandaHours = 'Segunda a Sexta: 08h00 às 18h00 | Sábado: 09h00 às 14h00 | Domingo: Encerrado';
  readonly luandaPhone = '+244 923 000 000';

  readonly huamboTitle = 'Huambo';
  readonly huamboAddress = 'Avenida da Independência, Huambo, Angola';
  readonly huamboHours = 'Segunda a Sexta: 08h00 às 17h30 | Sábado: 09h00 às 13h00 | Domingo: Encerrado';
  readonly huamboPhone = '+244 241 000 000';
}
