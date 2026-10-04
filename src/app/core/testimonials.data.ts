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
      'https://images.pexels.com/photos/3998027/pexels-photo-3998027.jpeg?auto=format&fit=crop&w=800&q=80',
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
      'https://images.pexels.com/photos/15018133/pexels-photo-15018133.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/15933989/pexels-photo-15933989.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't4',
    name: 'Isabel Mendes',
    role: 'Cliente — Huambo',
    quote:
      'Cheguei com queda acentuada e sem saber por onde começar. A equipa ouviu-me, explicou tudo e hoje vejo resultados reais no espelho.',
    photoBefore:
      'https://images.pexels.com/photos/3727474/pexels-photo-3727474.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/15206608/pexels-photo-15206608.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't5',
    name: 'Luzia Monteiro',
    role: 'Cliente — Luanda',
    quote:
      'O tratamento personalizado fez toda a diferença. Pela primeira vez alguém entendeu o que o meu cabelo precisava.',
    photoBefore:
      'https://images.pexels.com/photos/15690971/pexels-photo-15690971.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/15913255/pexels-photo-15913255.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't6',
    name: 'Célia António',
    role: 'Cliente — Huambo',
    quote:
      'Os produtos indicados na consulta transformaram a minha rotina. Hoje o cabelo tem vida, brilho e movimento.',
    photoBefore:
      'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't7',
    name: 'Nádia Santos',
    role: 'Cliente — Luanda',
    quote:
      'As tranças foram feitas com todo o cuidado. O resultado ficou leve e o meu cabelo não sofreu absolutamente nada.',
    photoBefore:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't8',
    name: 'Rosa Pingadeira',
    role: 'Cliente — Huambo',
    quote:
      'A equipa respeita o tempo do nosso cabelo. Não é um tratamento rápido — é um caminho, e eu senti isso desde o primeiro dia.',
    photoBefore:
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/15627478/pexels-photo-15627478.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't9',
    name: 'Vanessa Costa',
    role: 'Cliente — Luanda',
    quote:
      'A avaliação inicial foi super detalhada. Senti que estava a ser ouvida e que o plano era realmente meu.',
    photoBefore:
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/3998027/pexels-photo-3998027.jpeg?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 't10',
    name: 'Marta Chissungo',
    role: 'Cliente — Huambo',
    quote:
      'Quando cheguei à clínica não esperava tanto acolhimento. Hoje o meu cabelo é um caso de amor e não de dor.',
    photoBefore:
      'https://images.pexels.com/photos/3998012/pexels-photo-3998012.jpeg?auto=format&fit=crop&w=800&q=80',
    photoAfter:
      'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=800&q=80',
  },
];

export function createTestimonialPairState(): { showBefore: ReturnType<typeof signal<boolean>> } {
  return { showBefore: signal(false) };
}
