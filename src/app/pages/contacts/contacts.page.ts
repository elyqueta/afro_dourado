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
  readonly luandaAddress = '[[PENDENTE-CLIENTE]]';
  readonly luandaHours = 'Dom–Sex: 08h–18h | Sáb: Encerrado [[PENDENTE-CLIENTE]]';
  readonly luandaPhone = '[[PENDENTE-CLIENTE]]';

  readonly huamboTitle = 'Huambo';
  readonly huamboAddress = '[[PENDENTE-CLIENTE]]';
  readonly huamboHours = 'Dom–Sex: 08h–18h | Sáb: Encerrado [[PENDENTE-CLIENTE]]';
  readonly huamboPhone = '[[PENDENTE-CLIENTE]]';
}
