import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookingService, ServiceType, BookingData } from '@app/core/booking.service';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface LocalData {
  serviceType: ServiceType | null;
  serviceName: string;
  unit: 'luanda' | 'huambo' | null;
  date: string | null;
  time: string | null;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [SectionHeadingComponent, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max">
      <app-section-heading eyebrow="Agendamento" title="Agende o seu atendimento" size="display-m" />

      <div class="progress" aria-label="Progresso do agendamento">
        @for (label of steps; track $index) {
          <div class="step-indicator" [class.active]="current() === label.step" [class.done]="current() > label.step">
            <span class="number">{{ label.step }}</span>
            <span class="label">{{ label.label }}</span>
          </div>
        }
      </div>

      <div class="flow">
        @if (current() === 1) {
          <div class="step-panel">
            <h3 class="panel-title">O que procura?</h3>
            <div class="options">
              @for (option of serviceTypes; track option.type) {
                <button type="button" class="option" [class.selected]="local().serviceType === option.type" (click)="selectServiceType(option.type)">
                  <span class="name">{{ option.name }}</span>
                  <span class="desc">{{ option.description }}</span>
                </button>
              }
            </div>
          </div>
        }

        @if (current() === 2) {
          <div class="step-panel">
            <h3 class="panel-title">Qual serviço?</h3>
            <div class="options">
              @for (option of servicesForType(); track option.name) {
                <button type="button" class="option" [class.selected]="local().serviceName === option.name" (click)="selectService(option.name)">
                  <span class="name">{{ option.name }}</span>
                  <span class="desc">{{ option.description }}</span>
                </button>
              }
            </div>
          </div>
        }

        @if (current() === 3) {
          <div class="step-panel">
            <h3 class="panel-title">Onde?</h3>
            <div class="options">
              @for (unit of units; track unit) {
                <button type="button" class="option" [class.selected]="local().unit === unit" (click)="selectUnit(unit)">
                  <span class="name">{{ unit === 'luanda' ? 'Luanda' : 'Huambo' }}</span>
                  <span class="desc">{{ unit === 'luanda' ? 'Talatona, Luanda' : 'Avenida da Independência, Huambo' }}</span>
                </button>
              }
            </div>
          </div>
        }

        @if (current() === 4) {
          <div class="step-panel">
            <h3 class="panel-title">Quando?</h3>
            <div class="form">
              <label class="field">
                <span class="field-label">Data preferida</span>
                <input type="date" [value]="local().date || ''" (input)="onDateChange($any($event.target).value)" />
              </label>
              <div class="periods">
                @for (period of periods; track period) {
                  <button type="button" class="period" [class.selected]="local().time === period" (click)="selectPeriod(period)">
                    {{ period }}
                  </button>
                }
              </div>
            </div>
          </div>
        }

        @if (current() === 5) {
          <div class="step-panel">
            <h3 class="panel-title">Dados de contacto</h3>
            <div class="form">
              <label class="field">
                <span class="field-label">Nome</span>
                <input type="text" [value]="local().contactName" (input)="onContactChange('contactName', $any($event.target).value)" />
              </label>
              <label class="field">
                <span class="field-label">Telefone / WhatsApp</span>
                <input type="tel" [value]="local().contactPhone" (input)="onContactChange('contactPhone', $any($event.target).value)" />
              </label>
              <label class="field">
                <span class="field-label">Email <span class="optional">(opcional)</span></span>
                <input type="email" [value]="local().contactEmail" (input)="onContactChange('contactEmail', $any($event.target).value)" />
              </label>
            </div>
          </div>
        }

        @if (current() === 6) {
          <div class="step-panel">
            <h3 class="panel-title">Confirmar pedido</h3>
            <div class="summary">
              <div class="summary-row"><span>Tipo de serviço</span><span>{{ summary().serviceType }}</span></div>
              <div class="summary-row"><span>Serviço</span><span>{{ summary().serviceName }}</span></div>
              <div class="summary-row"><span>Unidade</span><span>{{ summary().unit }}</span></div>
              <div class="summary-row"><span>Data</span><span>{{ summary().date || 'A definir' }}</span></div>
              <div class="summary-row"><span>Período</span><span>{{ summary().time || 'A definir' }}</span></div>
              <div class="summary-row"><span>Nome</span><span>{{ summary().contactName }}</span></div>
              <div class="summary-row"><span>Telefone</span><span>{{ summary().contactPhone }}</span></div>
              @if (summary().contactEmail) {
                <div class="summary-row"><span>Email</span><span>{{ summary().contactEmail }}</span></div>
              }
            </div>
            <p class="note">Os horários disponíveis e a confirmação final são validados pela equipa após o envio do pedido.</p>
          </div>
        }
      </div>

      <div class="actions">
        @if (canBack()) {
          <app-pill-button (click)="back()" variant="secondary" size="md" label="Voltar"></app-pill-button>
        }
        @if (canNext()) {
          <app-pill-button (click)="next()" variant="primary" size="md" label="Continuar"></app-pill-button>
        }
        @if (isLast()) {
          <app-pill-button (click)="confirm()" variant="primary" size="lg" label="Confirmar pedido"></app-pill-button>
        }
      </div>
    </main>

    @if (confirmed()) {
      <div class="modal-overlay">
        <div class="modal">
          <h3 class="modal-title">Pedido enviado</h3>
          <p class="modal-text">Obrigado, {{ local().contactName }}. Recebemos o seu pedido de agendamento.</p>
          <p class="modal-text">Para uma confirmação imediata, fale com a nossa equipa pelo WhatsApp.</p>
          <app-pill-button href="https://wa.me/244923000000" variant="primary" size="lg" label="Abrir WhatsApp" target="_blank" rel="noopener noreferrer"></app-pill-button>
          <button type="button" class="modal-close" (click)="reset()">Fechar</button>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .progress {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .step-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-pill);
        border: 1px solid rgba(14, 59, 49, 0.12);
        color: var(--color-ink-900);
        opacity: 0.6;
        font-size: var(--text-small);
      }
      .step-indicator.active {
        opacity: 1;
        border-color: var(--color-brand-gold-500);
        background-color: rgba(199, 162, 75, 0.08);
      }
      .step-indicator.done {
        opacity: 0.9;
      }
      .number {
        font-weight: 700;
      }

      .flow {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .panel-title {
        font-family: var(--font-display);
        font-size: var(--text-display-m);
        margin: 0 0 1rem;
      }
      .options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .option {
        text-align: left;
        padding: 1.25rem;
        border-radius: var(--radius-card);
        border: 1px solid rgba(14, 59, 49, 0.1);
        background: transparent;
        cursor: pointer;
        font-family: var(--font-sans);
        color: var(--color-ink-900);
        transition: all var(--duration-micro) var(--ease-out-3);
      }
      .option:hover {
        border-color: var(--color-brand-gold-500);
        background-color: rgba(199, 162, 75, 0.05);
      }
      .option.selected {
        border-color: var(--color-brand-gold-500);
        background-color: rgba(199, 162, 75, 0.1);
      }
      .name {
        display: block;
        font-size: var(--text-heading);
        font-weight: 600;
        margin: 0 0 0.25rem;
      }
      .desc {
        display: block;
        font-size: var(--text-small);
        opacity: 0.75;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .field-label {
        font-size: var(--text-small);
        font-weight: 600;
      }
      .optional {
        opacity: 0.6;
        font-weight: 400;
      }
      .field input {
        padding: 0.75rem 1rem;
        border-radius: var(--radius-card);
        border: 1px solid rgba(14, 59, 49, 0.15);
        font-family: var(--font-sans);
        font-size: var(--text-body);
        background-color: var(--color-white);
        color: var(--color-ink-900);
      }
      .periods {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .period {
        padding: 0.75rem 1rem;
        border-radius: var(--radius-pill);
        border: 1px solid rgba(14, 59, 49, 0.15);
        background: transparent;
        cursor: pointer;
        font-family: var(--font-sans);
        font-size: var(--text-small);
        font-weight: 600;
        color: var(--color-ink-900);
        transition: all var(--duration-micro) var(--ease-out-3);
      }
      .period:hover {
        border-color: var(--color-brand-gold-500);
      }
      .period.selected {
        background-color: var(--color-brand-green-900);
        color: var(--color-cream-50);
        border-color: var(--color-brand-green-900);
      }

      .summary {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
        padding: 1.25rem;
        background-color: var(--color-cream-50);
        border-radius: var(--radius-card);
        border: 1px solid rgba(14, 59, 49, 0.08);
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        font-size: var(--text-small);
      }
      .summary-row span:first-child {
        opacity: 0.7;
      }
      .summary-row span:last-child {
        font-weight: 600;
        text-align: right;
      }
      .note {
        margin-top: 1rem;
        font-size: var(--text-small);
        opacity: 0.8;
      }

      .actions {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
      }

      .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(14, 59, 49, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        z-index: 50;
      }
      .modal {
        background-color: var(--color-cream-50);
        padding: 2rem;
        border-radius: var(--radius-card);
        max-width: 480px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .modal-title {
        font-family: var(--font-display);
        font-size: var(--text-display-m);
        margin: 0;
      }
      .modal-text {
        font-size: var(--text-body);
        line-height: 1.6;
        margin: 0;
      }
      .modal-close {
        margin-top: 0.5rem;
        background: none;
        border: none;
        padding: 0;
        font-family: var(--font-sans);
        font-size: var(--text-small);
        font-weight: 600;
        color: var(--color-brand-gold-500);
        cursor: pointer;
      }
    `,
  ],
})
export class BookingPage {
  private readonly booking = inject(BookingService);
  readonly confirmed = signal(false);

  readonly current = computed<Step>(() => this.booking.step() as Step);
  readonly canBack = computed(() => this.booking.step() > 1);
  readonly canNext = computed(() => this.booking.step() < 6);
  readonly isLast = computed(() => this.booking.step() === 6);

  readonly local = signal<LocalData>({
    serviceType: null,
    serviceName: '',
    unit: null,
    date: null,
    time: null,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  readonly steps = [
    { step: 1, label: 'Serviço' },
    { step: 2, label: 'Tipo' },
    { step: 3, label: 'Unidade' },
    { step: 4, label: 'Data' },
    { step: 5, label: 'Contacto' },
    { step: 6, label: 'Confirmar' },
  ];

  readonly serviceTypes: { type: ServiceType; name: string; description: string }[] = [
    { type: 'trichology', name: 'Tricologia', description: 'Avaliação e tratamentos capilares.' },
    { type: 'braids', name: 'Tranças & Estética', description: 'Técnica, identidade e expressão.' },
    { type: 'other', name: 'Outro', description: 'Outro serviço ou dúvida geral.' },
  ];

  readonly servicesByType: Record<ServiceType, { name: string; description: string }[]> = {
    trichology: [
      { name: 'Avaliação Tricológica', description: 'Consulta inicial com análise do couro cabeludo.' },
      { name: 'Terapia Capilar', description: 'Tratamento intensivo para queda e quebra.' },
      { name: 'Microagulhamento', description: 'Procedimento minimamente invasivo.' },
    ],
    braids: [
      { name: 'Tranças Nagô', description: 'Entrelaçado tradicional com protecção.' },
      { name: 'Box Braids', description: 'Tranças de protecção versáteis.' },
      { name: 'Twists', description: 'Torcidos com estilo e baixa manutenção.' },
    ],
    other: [
      { name: 'Outro serviço', description: 'Indique o serviço pretendido na mensagem final.' },
    ],
  };

  readonly units = ['luanda', 'huambo'] as const;
  readonly periods = ['Manhã', 'Tarde'];

  readonly servicesForType = computed(() => {
    const type = this.local().serviceType || 'trichology';
    return this.servicesByType[type] || [];
  });

  readonly summary = computed(() => {
    const data = this.local();
    const typeName = this.serviceTypes.find(s => s.type === data.serviceType)?.name || '';
    const unitName = data.unit === 'luanda' ? 'Luanda' : data.unit === 'huambo' ? 'Huambo' : '';
    return {
      serviceType: typeName,
      serviceName: data.serviceName || 'A confirmar',
      unit: unitName,
      date: data.date || '',
      time: data.time || '',
      contactName: data.contactName || '',
      contactPhone: data.contactPhone || '',
      contactEmail: data.contactEmail || '',
    };
  });

  selectServiceType(type: ServiceType): void {
    this.local.update(current => ({ ...current, serviceType: type, serviceName: '' }));
    this.booking.updateData({ serviceType: type, serviceName: '' });
    this.booking.nextStep();
  }

  selectService(name: string): void {
    this.local.update(current => ({ ...current, serviceName: name }));
    this.booking.updateData({ serviceName: name });
    this.booking.nextStep();
  }

  selectUnit(unit: 'luanda' | 'huambo'): void {
    this.local.update(current => ({ ...current, unit }));
    this.booking.updateData({ unit });
    this.booking.nextStep();
  }

  onDateChange(value: string): void {
    this.local.update(current => ({ ...current, date: value }));
    this.booking.updateData({ date: value });
  }

  onContactChange(field: 'contactName' | 'contactPhone' | 'contactEmail', value: string): void {
    this.local.update(current => ({ ...current, [field]: value }));
    this.booking.updateData({ [field]: value } as Partial<BookingData>);
  }

  selectPeriod(period: string): void {
    this.local.update(current => ({ ...current, time: period }));
    this.booking.updateData({ time: period });
    this.booking.nextStep();
  }

  next(): void {
    if (this.current() === 4 && !this.local().date) {
      return;
    }
    this.booking.nextStep();
  }

  back(): void {
    this.booking.prevStep();
  }

  confirm(): void {
    this.booking.updateData({
      contactName: this.local().contactName,
      contactPhone: this.local().contactPhone,
      contactEmail: this.local().contactEmail,
    });
    this.confirmed.set(true);
  }

  reset(): void {
    this.confirmed.set(false);
    this.booking.reset();
    this.local.set({
      serviceType: null,
      serviceName: '',
      unit: null,
      date: null,
      time: null,
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    });
  }
}
