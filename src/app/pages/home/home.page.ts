import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '@app/sections/hero/hero.component';
import { BrandStoryRevealComponent } from '@app/sections/brand-story-reveal/brand-story-reveal.component';
import { PillarsStickyComponent } from '@app/sections/pillars-sticky/pillars-sticky.component';
import { TrichologyPreviewComponent } from '@app/sections/trichology-preview/trichology-preview.component';
import { BraidsGalleryPreviewComponent } from '@app/sections/braids-gallery-preview/braids-gallery-preview.component';
import { ProductsPreviewComponent } from '@app/sections/products-preview/products-preview.component';
import { TeamPreviewComponent } from '@app/sections/team-preview/team-preview.component';
import { ArtigosPreviewComponent } from '@app/sections/artigos-preview/artigos-preview.component';
import { TestimonialsPreviewComponent } from '@app/sections/testimonials-preview/testimonials-preview.component';
import { BookingCtaComponent } from '@app/sections/booking-cta/booking-cta.component';
import { FaqAccordionComponent } from '@app/sections/faq-accordion/faq-accordion.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';
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
    ArtigosPreviewComponent,
    TestimonialsPreviewComponent,
    BookingCtaComponent,
    FaqAccordionComponent,
    SectionHeadingComponent,
    PillButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.page.css'],
  template: `
    <main>
      <app-hero
        videoSrc="https://videos.pexels.com/video-files/6698744/6698744-uhd_2732_1440_25fps.mp4"
        posterSrc="https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg?auto=format&fit=crop&w=1920&q=80"
        eyebrow="Afro Dourado"
        headline="Natural é vida."
        description="Cuidado especializado para a saúde, beleza e identidade do cabelo afro em Luanda e Huambo."
      >
        <app-pill-button
          href="/agendamento"
          variant="primary"
          size="lg"
          label="Agendar atendimento"
        ></app-pill-button>
        <app-pill-button
          href="#sobre"
          variant="secondary"
          size="lg"
          label="Descobrir a Afro Dourado"
        ></app-pill-button>
      </app-hero>

      <app-brand-story-reveal
        text="O teu cabelo conta uma história. Nós ajudamos a escrevê-la com ciência, técnica e produtos naturais."
        imageSrc="https://images.pexels.com/photos/3190174/pexels-photo-3190174.jpeg?auto=format&fit=crop&w=800&q=80"
      />

      <app-pillars-sticky [images]="pillarImages" [pillars]="pillars" />

      <app-trichology-preview
        imageSrc="https://images.pexels.com/photos/3115708/pexels-photo-3115708.jpeg?auto=format&fit=crop&w=800&q=80"
        description="Avaliação tricológica, terapia capilar, microagulhamento e tratamentos específicos para queda, quebra e crescimento."
        [titleParts]="[
          { text: 'Ciência para ', gold: false },
          { text: 'compreender', gold: true },
          { text: '. Cuidado para ', gold: false },
          { text: 'transformar', gold: true },
          { text: '.', gold: false },
        ]"
      />

      <app-braids-gallery-preview [images]="braidsImages" />

      <app-products-preview [products]="products" />

      <app-team-preview [members]="team" />

      <app-artigos-preview [articles]="articles" />

      <app-testimonials-preview [testimonials]="testimonialsData" />

      <app-booking-cta headline="Pronto para cuidar do teu cabelo?" />

      <section class="section section-y contact-section" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
        <div class="container-max">
          <app-section-heading
            eyebrow="Contacto"
            title="Escolha a sua unidade"
            size="display-m"
            eyebrowColor="gold"
          />
          <p class="lead">
            Estamos em Luanda e Huambo para receber si. Escolha a unidade mais próxima e descubra
            morada, horário e formas de contacto.
          </p>
          <div class="actions">
            <app-pill-button href="/contacto" variant="secondary-light" size="md" label="Contactar"></app-pill-button>
            <app-pill-button href="/agendamento" variant="secondary-light" size="md" label="Agendar atendimento"></app-pill-button>
          </div>
        </div>
      </section>

      <app-faq-accordion [items]="faqItems" />
    </main>
  `,
})
export class HomePage {
  readonly pillarImages = [
    'https://images.pexels.com/photos/3115708/pexels-photo-3115708.jpeg?auto=format&fit=crop&w=600&q=80',
    'https://images.pexels.com/photos/8429081/pexels-photo-8429081.jpeg?auto=format&fit=crop&w=600&q=80',
    'https://images.pexels.com/photos/897314/pexels-photo-897314.jpeg?auto=format&fit=crop&w=600&q=80',
  ];

  readonly pillars = [
    { title: 'Tricologia', description: 'Ciência para compreender. Cuidado para transformar.' },
    { title: 'Tranças & Estética', description: 'Técnica, identidade e expressão.' },
    { title: 'Produtos Naturais', description: 'Cuidado pensado para a rotina real.' },
  ];

  readonly braidsImages = [
    'https://images.pexels.com/photos/16089262/pexels-photo-16089262.jpeg?auto=format&fit=crop&w=600&q=80',
    'https://images.pexels.com/photos/11441103/pexels-photo-11441103.jpeg?auto=format&fit=crop&w=600&q=80',
    'https://images.pexels.com/photos/17043160/pexels-photo-17043160.jpeg?auto=format&fit=crop&w=600&q=80',
    'https://images.pexels.com/photos/6874748/pexels-photo-6874748.jpeg?auto=format&fit=crop&w=600&q=80',
    'https://images.pexels.com/photos/33138683/pexels-photo-33138683.jpeg?auto=format&fit=crop&w=600&q=80',
  ];

  readonly products = [
    {
      name: 'Óleo Capilar Nutritivo',
      benefits: 'Hidrata profundamente, reduz quebra e facilita o desembaraço.',
      usage: 'Aplicar no couro cabeludo e comprimentos antes do shampoo.',
      image:
        'https://images.pexels.com/photos/3735643/pexels-photo-3735643.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Shampoo Natural',
      benefits: 'Limpa suavemente sem ressecar, respeita a oleosidade natural.',
      usage: 'Massajar no couro cabeludo molhado e enxaguar abundantemente.',
      image:
        'https://images.pexels.com/photos/3190174/pexels-photo-3190174.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Finalizador',
      benefits: 'Define cachos e tranças, controla o frizz e protege da humidade.',
      usage: 'Aplicar uma pequena quantidade nas pontas e moldar com as mãos.',
      image:
        'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=600&q=80',
    },
  ];

  readonly team = [
    {
      name: 'Ana Luísa Mendes',
      role: 'Tricologista',
      bio: 'Especialista em avaliação capilar e tratamentos personalizados.',
      photo:
        'https://images.pexels.com/photos/34943686/pexels-photo-34943686.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Carlos Eduardo',
      role: 'Especialista em Tranças',
      bio: 'Técnico em penteados protectivos e tranças Nagô.',
      photo:
        'https://images.pexels.com/photos/17556066/pexels-photo-17556066.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Mariana Costa',
      role: 'Terapeuta Capilar',
      bio: 'Focada em hidratação profunda e recuperação de danos.',
      photo:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=format&fit=crop&w=600&q=80',
    },
  ];

  readonly articles = [
    {
      title: 'Queda capilar: quando procurar ajuda',
      excerpt: 'Entenda os sinais que indicam a necessidade de uma avaliação tricológica.',
      image:
        'https://images.pexels.com/photos/3735643/pexels-photo-3735643.jpeg?auto=format&fit=crop&w=600&q=80',
      slug: 'queda-capilar',
    },
    {
      title: 'Rotina de cuidados para cabelo afro no dia a dia',
      excerpt: 'Dicas práticas para manter a hidratação e definição entre consultas.',
      image:
        'https://images.pexels.com/photos/8429081/pexels-photo-8429081.jpeg?auto=format&fit=crop&w=600&q=80',
      slug: 'cuidados-cabelo-afro',
    },
    {
      title: 'Tranças: estilo, protecção e identidade',
      excerpt: 'Como os penteados protectivos podem fortalecer o cabelo e expressar cultura.',
      image:
        'https://images.pexels.com/photos/16089262/pexels-photo-16089262.jpeg?auto=format&fit=crop&w=600&q=80',
      slug: 'trancas-estilo-proteccao',
    },
  ];

  readonly faqItems = [
    {
      id: 1,
      label: 'Qual é o valor de uma consulta de tricologia?',
      content:
        'Os valores variam conforme o tratamento. Durante a primeira consulta, a tricologista avalia o seu caso e apresenta o plano e os valores antes de qualquer procedimento.',
    },
    {
      id: 2,
      label: 'Posso fazer tranças se estiver a apresentar queda capilar?',
      content:
        'Sim, desde que seja avaliada previamente. A nossa equipa analisa o estado do cabelo e do couro cabeludo e indica o estilo mais adequado para não agravar a queda.',
    },
    {
      id: 3,
      label: 'Os produtos e cosméticos utilizados são veganos e livres de crueldade animal?',
      content:
        'Trabalhamos com marcas que oferecem opções veganas e cruelty-free. Na consulta, indicamos os produtos mais indicados para o seu tipo de cabelo e valores.',
    },
    {
      id: 4,
      label: 'Existe algum cuidado prévio necessário antes da consulta tricológica?',
      content:
        'Recomendamos não aplicar óleos, cremes ou químicos nos dois dias anteriores à consulta, para que a avaliação seja precisa.',
    },
    {
      id: 5,
      label: 'A unidade do Huambo oferece exactamente os mesmos serviços de Luanda?',
      content:
        'Sim. Ambas as unidades partilham a mesma equipa técnica, protocolos de avaliação e linha de produtos.',
    },
  ];

  readonly testimonialsData = [
    {
      name: 'Amara João',
      role: 'Cliente — Luanda',
      quote: 'Depois de anos de química, pensei que nunca mais ia ter cabelo saudável. O acompanhamento na Afro Dourado devolveu-me a confiança.',
      photoBefore:
        'https://images.pexels.com/photos/34943686/pexels-photo-34943686.jpeg?auto=format&fit=crop&w=600&q=80',
      photoAfter:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Fátima Kassule',
      role: 'Cliente — Huambo',
      quote: 'As tranças ficaram lindas e o meu cabelo não sofreu nada. Pela primeira vez sinto que estou a cuidar dele de verdade.',
      photoBefore:
        'https://images.pexels.com/photos/8421990/pexels-photo-8421990.jpeg?auto=format&fit=crop&w=600&q=80',
      photoAfter:
        'https://images.pexels.com/photos/6625874/pexels-photo-6625874.jpeg?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Yara Fernandes',
      role: 'Cliente — Luanda',
      quote: 'A avaliação tricológica mudou a minha rotina. Hoje sei exactamente o que usar e o que evitar.',
      photoBefore:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=format&fit=crop&w=600&q=80',
      photoAfter:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=format&fit=crop&w=600&q=80',
    },
  ];
}
