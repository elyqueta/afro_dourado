import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { PillButtonComponent } from '../../shared/ui/button/pill-button.component';

@Component({
  selector: 'app-afro-assistant-panel',
  standalone: true,
  imports: [PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="overlay" (click)="close()">
        <div class="panel" (click)="$event.stopPropagation()">
          <div class="header">
            <h3 class="title">Como podemos ajudar?</h3>
            <button type="button" class="close" aria-label="Fechar assistente" (click)="close()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="body">
            @for (option of options(); track option) {
              <button type="button" class="option" (click)="select(option)">
                {{ option }}
              </button>
            }
          </div>
          @if (selectedOption()) {
            <div class="response">
              <p class="text">{{ response() }}</p>
              <app-pill-button href="/agendamento" variant="primary" size="md">Agendar avaliação</app-pill-button>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 8500;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 1rem;
      background-color: rgba(14, 59, 49, 0.4);
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .panel {
      width: 100%;
      max-width: 420px;
      max-height: 80vh;
      overflow-y: auto;
      background-color: var(--color-cream-50);
      border-radius: var(--radius-card);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem;
      border-bottom: 1px solid rgba(14, 59, 49, 0.08);
    }
    .title {
      font-family: var(--font-display);
      font-size: var(--text-heading);
      margin: 0;
    }
    .close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      color: var(--color-ink-900);
    }
    .close:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .body {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .option {
      width: 100%;
      text-align: left;
      padding: 0.875rem 1rem;
      border-radius: var(--radius-card);
      border: 1px solid rgba(14, 59, 49, 0.08);
      background: transparent;
      font-family: var(--font-sans);
      font-size: var(--text-body);
      color: var(--color-ink-900);
      cursor: pointer;
      transition: background-color var(--duration-micro) var(--ease-out-3);
    }
    .option:hover {
      background-color: rgba(199, 162, 75, 0.08);
    }
    .response {
      padding: 1.25rem;
      border-top: 1px solid rgba(14, 59, 49, 0.08);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .text {
      font-size: var(--text-body);
      line-height: 1.6;
      margin: 0;
    }
  `]
})
export class AfroAssistantPanelComponent {
  readonly open = signal(false);
  readonly options = signal([
    'Tenho queda capilar',
    'Quero cuidar do meu cabelo',
    'Quero fazer tranças',
    'Quero conhecer os produtos',
    'Quero marcar atendimento',
  ]);
  readonly selectedOption = signal<string | null>(null);

  readonly response = computed(() => {
    const selected = this.selectedOption();
    if (!selected) return '';
    if (selected.includes('queda')) {
      return 'Para uma avaliação adequada, fale com a nossa equipa. Cada caso é único e requer atenção personalizada.';
    }
    if (selected.includes('cuidar')) {
      return 'Temos rotinas de cuidado adaptadas ao teu tipo de cabelo. Para uma avaliação adequada, fale com a nossa equipa.';
    }
    if (selected.includes('tranças')) {
      return 'As nossas técnicas de tranças respeitam a saúde do teu cabelo. Para uma avaliação adequada, fale com a nossa equipa.';
    }
    if (selected.includes('produtos')) {
      return 'A nossa linha de produtos naturais está pensada para a rotina real. Para uma avaliação adequada, fale com a nossa equipa.';
    }
    return 'Para uma avaliação adequada, fale com a nossa equipa.';
  });

  close(): void {
    this.open.set(false);
    this.selectedOption.set(null);
  }

  select(option: string): void {
    this.selectedOption.set(option);
  }
}

import { computed } from '@angular/core';
