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
          [attr.aria-expanded]="menuOpen()"
          (click)="toggleMenu()"
          [class.open]="menuOpen()"
        >
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </button>
      </div>
    </header>

    @if (menuOpen()) {
      <div class="mobile-menu">
        <button type="button" class="mobile-close" (click)="closeMenu()" aria-label="Fechar menu">
          <span class="close-line"></span>
          <span class="close-line"></span>
        </button>
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
        gap: 6px;
        background: none;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        z-index: 10;
      }
      .line {
        display: block;
        width: 24px;
        height: 2px;
        background-color: var(--color-cream-50);
        transition:
          transform 0.3s ease,
          opacity 0.3s ease;
      }
      .navbar.scrolled .line {
        background-color: var(--color-ink-900);
      }
      .mobile-toggle.open .line:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      .mobile-toggle.open .line:nth-child(2) {
        opacity: 0;
      }
      .mobile-toggle.open .line:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
      .mobile-menu {
        position: fixed;
        inset: 0;
        background-color: var(--color-brand-green-900);
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 28vh;
        animation: fadeIn 0.35s ease;
        z-index: 9999;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .mobile-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10;
      }
      .close-line {
        position: absolute;
        width: 24px;
        height: 2px;
        background-color: var(--color-cream-50);
      }
      .close-line:first-child {
        transform: rotate(45deg);
      }
      .close-line:last-child {
        transform: rotate(-45deg);
      }
      .mobile-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.5rem;
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
    if (this.menuOpen()) {
      this.smoothScroll.stop();
      document.body.style.overflow = 'hidden';
    } else {
      this.smoothScroll.start();
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.smoothScroll.start();
    document.body.style.overflow = '';
  }
}
