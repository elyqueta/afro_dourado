import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { gsap } from 'gsap';
import { SmoothScrollService } from '../../core/smooth-scroll.service';

@Component({
  selector: 'app-page-transition',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="overlay" aria-hidden="true">
        <img src="/AfroDourado-logo-transparente.png" alt="AfroDourado" class="brand-logo" />
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9500;
      background-color: var(--color-brand-green-900);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .brand-logo {
      height: 60px;
      width: auto;
    }
  `]
})
export class PageTransitionComponent {
  private readonly router = inject(Router);
  private readonly smoothScroll = inject(SmoothScrollService);

  readonly visible = signal(false);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.visible.set(true);
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.visible.set(false);
          this.smoothScroll.scrollTo(0, { immediate: true });
        }, 450);
      }
    });
  }
}
