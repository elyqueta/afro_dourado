import { Injectable, signal, computed } from '@angular/core';

export interface Article {
  title: string;
  excerpt: string;
  body: string;
  image: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class JournalService {
  private readonly _articles = signal<Article[]>([
    {
      title: 'Queda capilar: quando procurar ajuda',
      excerpt: 'Entenda os sinais que indicam a necessidade de uma avaliação tricológica.',
      body: 'A queda capilar é uma preocupação comum entre pessoas com cabelo afro. É normal perder entre 50 e 100 fios por dia, mas quando a quantidade aumenta de forma visível, é importante procurar orientação profissional.\n\nNa Afro Dourado, a avaliação tricológica começa por um exame detalhado do couro cabeludo e da haste capilar. A partir daí, identificamos causas possíveis, como stress, défices nutricionais, tratamentos químicos ou factores genéticos.\n\nOs tratamentos podem incluir terapias capilares personalizadas, microagulhamento e recomendações de rotina em casa. O importante é não esperar: quanto mais cedo a avaliação, melhores as chances de preservar o cabelo existente e estimular o crescimento saudável.\n\nSe estás a notar mais fios no travesseiro, na escova ou no ralo, marca a tua consulta em Luanda ou Huambo. A primeira consulta é o primeiro passo para compreender o que está a acontecer e definir um plano de cuidado.',
      image: 'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=1200&q=80',
      slug: 'queda-capilar',
    },
    {
      title: 'Rotina de cuidados para cabelo afro no dia a dia',
      excerpt: 'Dicas práticas para manter a hidratação e definição entre consultas.',
      body: 'Manter o cabelo afro hidratado e definido no dia a dia depende de rotina e de produtos adequados. Cada tipo de cabelo tem necessidades diferentes, mas existem cuidados universais que fazem diferença.\n\nComece pela limpeza: prefira shampoos sem sulfatos agressivos e lave com água morna, nunca quente. O condicionador deve ser aplicado nos comprimentos e pontas, evitando o couro cabeludo se for oleoso.\n\nA hidratação é o passo mais importante. Use máscaras ou óleos capilares 1–2 vezes por semana, dependendo da textura do cabelo. Para cabelos muito secos, a protecção nocturna com touca de seda ou fronha ajuda a manter a humidade durante a noite.\n\nNa Afro Dourado, indicamos os produtos mais adequados para o seu tipo de cabelo durante a consulta. O objectivo é construir uma rotina simples, realista e eficaz.',
      image: 'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=format&fit=crop&w=1200&q=80',
      slug: 'cuidados-cabelo-afro',
    },
    {
      title: 'Tranças: estilo, protecção e identidade',
      excerpt: 'Como os penteados protectivos podem fortalecer o cabelo e expressar cultura.',
      body: 'As tranças são muito mais do que um estilo: são uma forma de protecção, de expressão cultural e de afirmação de identidade. Para o cabelo afro, os penteados protectivos ajudam a reduzir a quebra, a retenção de comprimento e a manipulação diária.\n\nAntes de iniciar qualquer entrelaçado, é importante avaliar o estado do cabelo e do couro cabeludo. Na Afro Dourado, analisamos a resistência, hidratação e saúde da haste para indicar o estilo mais adequado.\n\nTrabalhamos com tranças Nagô, box braids, twists e penteados protectivos, sempre com produtos que respeitam a textura natural. Cada sessão é acompanhada de orientações de manutenção para garantir que o resultado dura mais sem danificar o cabelo.\n\nQueres experimentar? Marca uma avaliação em Luanda ou Huambo.',
      image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=format&fit=crop&w=1200&q=80',
      slug: 'trancas-estilo-proteccao',
    },
  ]);

  readonly articles = this._articles.asReadonly();
  readonly featured = computed(() => this._articles()[0] || null);
  readonly rest = computed(() => this._articles().slice(1));

  bySlug(slug: string) {
    return this._articles().find(a => a.slug === slug) || null;
  }
}
