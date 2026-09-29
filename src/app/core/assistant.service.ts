import { Injectable, signal, computed } from '@angular/core';

export interface AssistantMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface AssistantOption {
  label: string;
  response: string;
}

const INITIAL_OPTIONS: AssistantOption[] = [
  {
    label: 'Tenho queda capilar',
    response: 'Para uma avaliação adequada, fale com a nossa equipa. Cada caso é único e requer atenção personalizada.',
  },
  {
    label: 'Quero cuidar do meu cabelo',
    response: 'Temos rotinas de cuidado adaptadas ao teu tipo de cabelo. Para uma avaliação adequada, fale com a nossa equipa.',
  },
  {
    label: 'Quero fazer tranças',
    response: 'As nossas técnicas de tranças respeitam a saúde do teu cabelo. Para uma avaliação adequada, fale com a nossa equipa.',
  },
  {
    label: 'Quero conhecer os produtos',
    response: 'A nossa linha de produtos naturais está pensada para a rotina real. Para uma avaliação adequada, fale com a nossa equipa.',
  },
  {
    label: 'Quero marcar atendimento',
    response: 'Pode marcar directamente através do nosso sistema de agendamento ou falar connosco por WhatsApp.',
  },
];

function getSimulatedResponse(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('queda') || normalized.includes('quedas')) {
    return 'A queda capilar pode ter várias causas. Recomendamos uma avaliação tricológica para identificar o melhor tratamento para o seu caso.';
  }
  if (normalized.includes('trança') || normalized.includes('pentear') || normalized.includes('protecção')) {
    return 'Temos várias técnicas de tranças e penteados protectivos. Agende uma avaliação para escolhermos o estilo mais adequado.';
  }
  if (normalized.includes('produto') || normalized.includes('óleo') || normalized.includes('shampoo')) {
    return 'A nossa linha de produtos naturais foi pensada para o cabelo afro. Na consulta, indicamos os mais indicados para si.';
  }
  if (normalized.includes('marcar') || normalized.includes('agendar') || normalized.includes('atendimento') || normalized.includes('horário')) {
    return 'Pode marcar diretamente no nosso sistema de agendamento ou falar connosco por WhatsApp.';
  }
  if (normalized.includes('preço') || normalized.includes('valor') || normalized.includes('custo')) {
    return 'Os valores variam conforme o tratamento. Durante a primeira consulta, apresentamos o plano e os valores antes de qualquer procedimento.';
  }
  if (normalized.includes('morada') || normalized.includes('localização') || normalized.includes('unidade') || normalized.includes('luanda') || normalized.includes('huambo')) {
    return 'Estamos em Luanda e Huambo. Pode escolher a unidade mais próxima na página de Contacto.';
  }
  if (normalized.includes('obrigado') || normalized.includes('obrigada')) {
    return 'De nada! Estamos aqui para ajudar. Se precisar de mais informações, não hesite em perguntar.';
  }
  if (normalized.includes('olá') || normalized.includes('oi') || normalized.includes('bom dia') || normalized.includes('boa tarde')) {
    return 'Olá! Como posso ajudá-lo hoje? Pode escolher uma das opções abaixo ou escrever a sua questão.';
  }

  return 'Para uma avaliação adequada, fale com a nossa equipa. Cada caso é único e requer atenção personalizada.';
}

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  readonly open = signal(false);
  readonly messages = signal<AssistantMessage[]>([
    {
      sender: 'assistant',
      text: 'Olá! Sou o assistente da Afro Dourado. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
    },
  ]);
  readonly input = signal('');
  readonly isTyping = signal(false);
  readonly options = signal<AssistantOption[]>(INITIAL_OPTIONS);
  readonly canSend = computed(() => this.input().trim().length > 0 && this.isTyping() === false);

  openAssistant(): void {
    this.open.set(true);
  }

  closeAssistant(): void {
    this.open.set(false);
  }

  sendMessage(text: string): void {
    const trimmed = text.trim();
    if (!trimmed || this.isTyping()) {
      return;
    }

    this.messages.update((current) => [
      ...current,
      { sender: 'user', text: trimmed, timestamp: new Date() },
    ]);
    this.input.set('');
    this.isTyping.set(true);

    setTimeout(() => {
      const response = getSimulatedResponse(trimmed);
      this.messages.update((current) => [
        ...current,
        { sender: 'assistant', text: response, timestamp: new Date() },
      ]);
      this.isTyping.set(false);
    }, 700);
  }

  resetChat(): void {
    this.messages.set([
      {
        sender: 'assistant',
        text: 'Olá! Sou o assistente da Afro Dourado. Como posso ajudá-lo hoje?',
        timestamp: new Date(),
      },
    ]);
    this.input.set('');
    this.isTyping.set(false);
  }
}
