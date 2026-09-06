import {
  Component,
  signal,
  inject,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
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
        <a routerLink="/" class="logo" aria-label="Afro Dourado — Voltar ao início">
          <img src="/AfroDourado-simbolo-transparente.png" alt="AfroDourado" class="logo-img" />
        </a>

        <nav class="desktop" role="navigation" aria-label="Navegação principal">
          <a routerLink="/tricologia" routerLinkActive="active" class="nav-link">Tricologia</a>
          <a routerLink="/trancas-estetica" routerLinkActive="active" class="nav-link">Tranças</a>
          <a routerLink="/produtos" routerLinkActive="active" class="nav-link">Produtos</a>
          <a routerLink="/sobre" routerLinkActive="active" class="nav-link">Sobre</a>
          <a routerLink="/journal" routerLinkActive="active" class="nav-link">Journal</a>
        </nav>

        <div class="desktop-cta">
          <app-pill-button
            href="/agendamento"
            variant="primary"
            size="md"
            label="Agendar"
          ></app-pill-button>
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
            <a
              routerLink="/tricologia"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Tricologia</a
            >
            <a
              routerLink="/trancas-estetica"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Tranças & Estética</a
            >
            <a
              routerLink="/produtos"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Produtos Naturais</a
            >
            <a
              routerLink="/sobre"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Sobre Nós</a
            >
            <a
              routerLink="/equipa"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Equipa</a
            >
            <a
              routerLink="/journal"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Journal</a
            >
            <a
              routerLink="/contactos"
              routerLinkActive="active"
              class="mobile-link"
              (click)="closeMenu()"
              >Contactos</a
            >
            <a
              routerLink="/agendamento"
              routerLinkActive="active"
              class="mobile-link mobile-cta"
              (click)="closeMenu()"
              >Agendar atendimento</a
            >
          </nav>
        </div>
      }
    </header>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 8000;
        height: 96px;
        transition:
          background-color 0.4s ease,
          height 0.4s ease,
          box-shadow 0.4s ease;
        background: linear-gradient(to bottom, rgba(14, 59, 49, 0.55), rgba(14, 59, 49, 0.25));
      }
      .navbar.scrolled {
        background-color: rgba(247, 243, 236, 0.92);
        backdrop-filter: blur(8px);
        height: 72px;
        box-shadow: 0 1px 0 rgba(14, 59, 49, 0.06);
      }
      .navbar.scrolled .nav-link {
        color: var(--color-ink-900);
        text-shadow: none;
      }
      .navbar.scrolled .nav-link:hover,
      .navbar.scrolled .nav-link.active {
        color: var(--color-brand-gold-500);
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
      .logo-img {
        height: 40px;
        width: auto;
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
        color: var(--color-cream-50);
        transition: color var(--duration-micro) var(--ease-out-3);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
      }
      .nav-link:hover,
      .nav-link.active {
        color: var(--color-brand-gold-500);
        text-shadow: none;
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
        transition:
          transform 0.3s ease,
          opacity 0.3s ease;
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
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
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
        .desktop-cta {
          display: inline-flex;
        }
        .mobile-toggle {
          display: none;
        }
      }
    `,
  ],
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
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
