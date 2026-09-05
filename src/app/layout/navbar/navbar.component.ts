import { Component, signal, inject, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { PillButtonComponent } from '@app/shared/ui/button/pill-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PillButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="navbar" [class.scrolled]="scrolled()">
      <div class="inner container-max">
        <a routerLink="/" class="logo" aria-label="AfroDourado — Voltar ao início">
          <span class="logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 7c-2 0-3.5 1.5-3.5 3.5S11 13.5 12 14c1-0.5 2.5-1.5 2.5-3.5S14 7 12 7z" fill="currentColor"/>
              <path d="M9 18c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="logo-text">Afro<span class="gold">Dourado</span></span>
        </a>

        <nav class="desktop" role="navigation" aria-label="Navegação principal">
          <a routerLink="/tricologia" routerLinkActive="active" class="nav-link">
            <span class="nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </span>
            Tricologia
          </a>
          <a routerLink="/trancas-estetica" routerLinkActive="active" class="nav-link">
            <span class="nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 20h16"/>
                <path d="M4 20c0-4 4-8 8-8s8 4 8 8"/>
                <path d="M12 4c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/>
              </svg>
            </span>
            Tranças
          </a>
          <a routerLink="/produtos" routerLinkActive="active" class="nav-link">
            <span class="nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L6.5 20l2-7L3 9h7z"/>
              </svg>
            </span>
            Produtos
          </a>
          <a routerLink="/sobre" routerLinkActive="active" class="nav-link">
            <span class="nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </span>
            Sobre
          </a>
          <a routerLink="/journal" routerLinkActive="active" class="nav-link">
            <span class="nav-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </span>
            Journal
          </a>
        </nav>

        <div class="desktop-cta">
          <app-pill-button href="/agendamento" variant="primary" size="md">Agendar</app-pill-button>
        </div>

        <button
          type="button"
          class="mobile-toggle"
          aria-label="Abrir menu"
          aria-expanded="false"
          (click)="toggleMenu()"
        >
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
      </div>

      @if (menuOpen()) {
        <div class="mobile-menu">
          <nav class="mobile-nav" role="navigation" aria-label="Menu mobile">
            <a routerLink="/tricologia" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Tricologia</a>
            <a routerLink="/trancas-estetica" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Tranças & Estética</a>
            <a routerLink="/produtos" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Produtos Naturais</a>
            <a routerLink="/sobre" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Sobre Nós</a>
            <a routerLink="/equipa" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Equipa</a>
            <a routerLink="/journal" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Journal</a>
            <a routerLink="/contactos" routerLinkActive="active" class="mobile-link" (click)="closeMenu()">Contactos</a>
            <a routerLink="/agendamento" routerLinkActive="active" class="mobile-link mobile-cta" (click)="closeMenu()">Agendar atendimento</a>
          </nav>
        </div>
      }
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 8000;
      height: 96px;
      transition: background-color 0.4s ease, height 0.4s ease, box-shadow 0.4s ease;
      background-color: transparent;
    }
    .navbar.scrolled {
      background-color: rgba(247, 243, 236, 0.92);
      backdrop-filter: blur(8px);
      height: 72px;
      box-shadow: 0 1px 0 rgba(14, 59, 49, 0.06);
    }
    .inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    .logo {
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .logo-icon {
      color: var(--color-brand-green-900);
    }
    .logo-text {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--color-ink-900);
      letter-spacing: 0.02em;
    }
    .logo-text .gold {
      color: var(--color-brand-gold-500);
    }
    .desktop {
      display: none;
    }
    .desktop-cta {
      display: none;
    }
    .nav-link {
      text-decoration: none;
      font-family: var(--font-sans);
      font-size: var(--text-small);
      font-weight: 500;
      color: var(--color-ink-900);
      transition: color var(--duration-micro) var(--ease-out-3);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .nav-icon {
      display: none;
    }
    .nav-link:hover,
    .nav-link.active {
      color: var(--color-brand-gold-500);
    }
    .mobile-toggle {
      display: inline-flex;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
    }
    .line {
      display: block;
      width: 22px;
      height: 2px;
      background-color: var(--color-ink-900);
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .mobile-menu {
      position: absolute;
      inset: 0;
      background-color: var(--color-brand-green-900);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .mobile-nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .mobile-link {
      font-family: var(--font-display);
      font-size: var(--text-display-m);
      color: var(--color-cream-50);
      text-decoration: none;
      transition: color var(--duration-micro) var(--ease-out-3);
    }
    .mobile-link:hover,
    .mobile-link.active {
      color: var(--color-brand-gold-500);
    }
    .mobile-cta {
      font-family: var(--font-sans);
      font-size: var(--text-body);
      font-weight: 600;
      color: var(--color-brand-gold-500);
      border-bottom: 1px solid var(--color-brand-gold-500);
    }

    @media (min-width: 1024px) {
      .navbar {
        background-color: rgba(247, 243, 236, 0.92);
        backdrop-filter: blur(8px);
      }
      .desktop {
        display: flex;
        gap: 2rem;
      }
      .nav-icon {
        display: inline-flex;
      }
      .desktop-cta {
        display: inline-flex;
      }
      .mobile-toggle {
        display: none;
      }
    }
  `]
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly router = inject(Router);
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    this.smoothScroll.instance?.on('scroll', ({ scroll }: { scroll: number }) => {
      this.scrolled.set(scroll > 40);
    });
  }

  ngOnDestroy(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
