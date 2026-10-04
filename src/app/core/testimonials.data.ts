import { signal } from '@angular/core';

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly quote: string;
  readonly photoBefore: string;
  readonly photoAfter: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 't1',
    name: 'Amara João',
    role: 'Cliente — Luanda',
    quote:
      'Depois de anos de química, pensei que nunca mais ia ter cabelo saudável. O acompanhamento na Afro Dourado devolveu-me a confiança.',
    photoBefore:
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't2',
    name: 'Fátima Kassule',
    role: 'Cliente — Huambo',
    quote:
      'As tranças ficaram lindas e o meu cabelo não sofreu nada. Pela primeira vez sinto que estou a cuidar dele de verdade.',
    photoBefore:
      'https://images.pexels.com/photos/3998012/pexels-photo-3998012.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't3',
    name: 'Yara Fernandes',
    role: 'Cliente — Luanda',
    quote:
      'A avaliação tricológica mudou a minha rotina. Hoje sei exactamente o que usar e o que evitar. O cabelo nunca esteve tão bonito.',
    photoBefore:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't4',
    name: 'Isabel Mendes',
    role: 'Cliente — Huambo',
    quote:
      'Cheguei com queda acentuada e sem saber por onde começar. A equipa ouviu-me, explicou tudo e hoje vejo resultados reais no espelho.',
    photoBefore:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=800&q=80',
  },
];

export function createTestimonialPairState(): { showBefore: ReturnType<typeof signal<boolean>> } {
  return { showBefore: signal(false) };
}
