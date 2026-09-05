import { Injectable, signal, computed } from '@angular/core';

export type ServiceType = 'trichology' | 'braids' | 'other';
export type Unit = 'luanda' | 'huambo';
export type Step = 1 | 2 | 3 | 4 | 5 | 6;

export interface BookingData {
  serviceType: ServiceType | null;
  serviceName: string;
  unit: Unit | null;
  date: string | null;
  time: string | null;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly _step = signal<Step>(1);
  private readonly _data = signal<BookingData>({
    serviceType: null,
    serviceName: '',
    unit: null,
    date: null,
    time: null,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  readonly step = this._step.asReadonly();
  readonly data = this._data.asReadonly();

  readonly canGoBack = computed(() => this._step() > 1);
  readonly canGoNext = computed(() => this._step() < 6);
  readonly isLastStep = computed(() => this._step() === 6);

  setStep(step: Step): void {
    this._step.set(step);
  }

  nextStep(): void {
    if (this.canGoNext()) {
      this._step.update(s => (s + 1) as Step);
    }
  }

  prevStep(): void {
    if (this.canGoBack()) {
      this._step.update(s => (s - 1) as Step);
    }
  }

  updateData(partial: Partial<BookingData>): void {
    this._data.update(current => ({ ...current, ...partial }));
  }

  reset(): void {
    this._step.set(1);
    this._data.set({
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
