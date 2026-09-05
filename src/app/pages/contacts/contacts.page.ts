import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { LocationPickerComponent } from '@app/sections/location-picker/location-picker.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [SectionHeadingComponent, LocationPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Contactos" title="Escolha a sua unidade" size="display-m" />
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
    </main>
  `,
  styles: [`
    /* inherits section spacing */
  `]
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
