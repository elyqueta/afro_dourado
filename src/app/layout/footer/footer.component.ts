import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';
import { OrganicDividerComponent } from '@app/shared/ui/divider-organic/divider-organic.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PillButtonComponent, OrganicDividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer section-y" style="background-color: var(--color-brand-green-900); color: var(--color-cream-50);">
      <div class="container-max">
        <div class="grid">
          <div class="col">
            <span class="logo">Afro<span class="gold">Dourado</span></span>
            <p class="tagline">Natural é vida.</p>
            <app-organic-divider />
            <p class="description">Cuidado especializado para a saúde, beleza e identidade do cabelo afro em Luanda e Huambo.</p>
          </div>
          <div class="col">
            <h4 class="title">Explorar</h4>
            <nav class="links">
              <a routerLink="/tricologia" routerLinkActive="active">Tricologia</a>
              <a routerLink="/trancas-estetica" routerLinkActive="active">Tranças & Estética</a>
              <a routerLink="/produtos" routerLinkActive="active">Produtos Naturais</a>
              <a routerLink="/sobre" routerLinkActive="active">Sobre Nós</a>
              <a routerLink="/equipa" routerLinkActive="active">Equipa</a>
              <a routerLink="/journal" routerLinkActive="active">Journal</a>
            </nav>
          </div>
          <div class="col">
            <h4 class="title">Unidades</h4>
            <p>Luanda — Talatona</p>
            <p>Huambo — Avenida da Independência</p>
          </div>
          <div class="col">
            <h4 class="title">Contactos</h4>
            <a href="tel:+244923000000" class="contact-link">+244 923 000 000</a>
            <a href="https://wa.me/244923000000" target="_blank" rel="noopener noreferrer" class="contact-link">WhatsApp</a>
            <p>Segunda a Sexta: 08h00 às 18h00</p>
          </div>
        </div>

        <div class="cta">
          <app-pill-button href="/agendamento" variant="secondary-light" size="lg">Agendar atendimento</app-pill-button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }
    .logo {
      font-family: var(--font-display);
      font-size: var(--text-display-m);
    }
    .logo .gold {
      color: var(--color-brand-gold-500);
    }
    .tagline {
      margin-top: 0.5rem;
      font-family: var(--font-sans);
      font-size: var(--text-small);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      opacity: 0.7;
    }
    .description {
      margin-top: 1rem;
      font-size: var(--text-body);
      line-height: 1.6;
      opacity: 0.8;
      max-width: 32ch;
    }
    .title {
      font-family: var(--font-sans);
      font-size: var(--text-small);
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin: 0 0 1rem 0;
      color: var(--color-brand-gold-500);
    }
    .links {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .links a {
      color: var(--color-cream-50);
      text-decoration: none;
      font-size: var(--text-body);
      opacity: 0.8;
      transition: opacity var(--duration-micro) var(--ease-out-3);
    }
    .links a:hover {
      opacity: 1;
    }
    .contact-link {
      color: var(--color-brand-gold-500);
      text-decoration: none;
      font-size: var(--text-body);
      opacity: 0.9;
      display: block;
      margin-bottom: 0.5rem;
      transition: opacity var(--duration-micro) var(--ease-out-3);
    }
    .contact-link:hover {
      opacity: 1;
    }
    .cta {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(247, 243, 236, 0.1);
    }
    p {
      margin: 0 0 0.4rem;
      font-size: var(--text-body);
      opacity: 0.8;
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `]
})
export class FooterComponent {}
