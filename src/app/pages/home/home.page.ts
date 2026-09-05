import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '@app/sections/hero/hero.component';
import { BrandStoryRevealComponent } from '@app/sections/brand-story-reveal/brand-story-reveal.component';
import { PillarsStickyComponent } from '@app/sections/pillars-sticky/pillars-sticky.component';
import { TrichologyPreviewComponent } from '@app/sections/trichology-preview/trichology-preview.component';
import { BraidsGalleryPreviewComponent } from '@app/sections/braids-gallery-preview/braids-gallery-preview.component';
import { ProductsPreviewComponent } from '@app/sections/products-preview/products-preview.component';
import { TeamPreviewComponent } from '@app/sections/team-preview/team-preview.component';
import { JournalPreviewComponent } from '@app/sections/journal-preview/journal-preview.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';
import { FaqAccordionComponent } from '@app/sections/faq-accordion/faq-accordion.component';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    BrandStoryRevealComponent,
    PillarsStickyComponent,
    TrichologyPreviewComponent,
    BraidsGalleryPreviewComponent,
    ProductsPreviewComponent,
    TeamPreviewComponent,
    JournalPreviewComponent,
    BookingCtaComponent,
    FaqAccordionComponent,
    PillButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main>
      <app-hero
        posterSrc="/media/hero-poster.jpg"
        eyebrow="AFRODOURADO"
        headline="Natural é vida."
        description="Cuidado especializado para a saúde, beleza e identidade do teu cabelo."
      >
        <app-pill-button href="/agendamento" variant="primary" size="lg">Agendar atendimento</app-pill-button>
        <app-pill-button href="#sobre" variant="secondary" size="lg">Descobrir a AfroDourado</app-pill-button>
      </app-hero>

      <app-brand-story-reveal text="O teu cabelo conta uma história." imageSrc="/media/story.jpg" />

      <app-pillars-sticky
        [images]="pillarImages"
        [pillars]="pillars"
      />

      <app-trichology-preview
        imageSrc="/media/trichology.jpg"
        description="[[PENDENTE-CLIENTE]] <!-- TODO: aguardar validação AfroDourado -->"
      />

      <app-braids-gallery-preview [images]="braidsImages" />

      <app-products-preview [products]="products" />

      <app-team-preview [members]="team" />

      <app-journal-preview [articles]="articles" />

      <app-booking-cta headline="Pronto para cuidar do teu cabelo?" />

      <app-faq-accordion [items]="faqItems" />
    </main>
  `,
})
export class HomePage {
  readonly pillarImages = [
    '/media/pillar-tricology.jpg',
    '/media/pillar-braids.jpg',
    '/media/pillar-products.jpg',
  ];

  readonly pillars = [
    { title: 'Tricologia', description: 'Ciência para compreender. Cuidado para transformar.' },
    { title: 'Tranças & Estética', description: 'Técnica, identidade e expressão.' },
    { title: 'Produtos Naturais', description: 'Cuidado pensado para a rotina real.' },
  ];

  readonly braidsImages = [
    '/media/braids-1.jpg',
    '/media/braids-2.jpg',
    '/media/braids-3.jpg',
    '/media/braids-4.jpg',
  ];

  readonly products = [
    { name: 'Óleo Capilar Nutritivo', benefits: '[[PENDENTE-CLIENTE]]', image: '/media/product-1.jpg' },
    { name: 'Shampoo Natural', benefits: '[[PENDENTE-CLIENTE]]', image: '/media/product-2.jpg' },
    { name: 'Finalizador', benefits: '[[PENDENTE-CLIENTE]]', image: '/media/product-3.jpg' },
  ];

  readonly team = [
    { name: '[[PENDENTE-CLIENTE]]', role: '[[PENDENTE-CLIENTE]]', photo: '/media/team-1.jpg' },
    { name: '[[PENDENTE-CLIENTE]]', role: '[[PENDENTE-CLIENTE]]', photo: '/media/team-2.jpg' },
    { name: '[[PENDENTE-CLIENTE]]', role: '[[PENDENTE-CLIENTE]]', photo: '/media/team-3.jpg' },
  ];

  readonly articles = [
    { title: 'Queda capilar: o que precisa de saber', excerpt: '[[PENDENTE-CLIENTE]]', image: '/media/journal-1.jpg', slug: 'queda-capilar' },
    { title: 'Cuidados com cabelo afro no dia a dia', excerpt: '[[PENDENTE-CLIENTE]]', image: '/media/journal-2.jpg', slug: 'cuidados-cabelo-afro' },
    { title: 'Tranças: estilo e protecção', excerpt: '[[PENDENTE-CLIENTE]]', image: '/media/journal-3.jpg', slug: 'trancas-estilo-proteccao' },
  ];

  readonly faqItems = [
    { id: 1, label: 'Qual é o valor de uma consulta de tricologia?', content: '[[PENDENTE-CLIENTE]]' },
    { id: 2, label: 'Posso fazer tranças com queda capilar?', content: '[[PENDENTE-CLIENTE]]' },
    { id: 3, label: 'Os produtos são veganos?', content: '[[PENDENTE-CLIENTE]]' },
    { id: 4, label: 'Existe cuidados prévios para a consulta?', content: '[[PENDENTE-CLIENTE]]' },
    { id: 5, label: 'A unidade do Huambo oferece os mesmos serviços?', content: '[[PENDENTE-CLIENTE]]' },
  ];
}
