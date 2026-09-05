import { Component, inject, signal, AfterViewInit, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { GsapService } from '@app/core/gsap.service';

@Component({
  selector: 'app-app-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isBrowser() && !isMobile()) {
      <div class="cursor" [class.view]="isView()" [class.open]="isOpen()"></div>
    }
  `,
  styles: [`
    .cursor {
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--color-brand-gold-500);
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
      transform: translate3d(-50%, -50%, 0);
    }
    .cursor.view {
      width: 48px;
      height: 48px;
      background-color: transparent;
      border: 1px solid var(--color-brand-gold-500);
    }
    .cursor.open {
      width: 64px;
      height: 64px;
      background-color: rgba(199, 162, 75, 0.15);
      border: 1px solid var(--color-brand-gold-500);
    }
  `]
})
export class AppCursorComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly gsap = inject(GsapService);
  private readonly smoothScroll = inject(SmoothScrollService);

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  isMobile() {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  }

  isView = signal(false);
  isOpen = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mousedown', () => this.isOpen.set(true));
    document.addEventListener('mouseup', () => this.isOpen.set(false));
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove = (e: MouseEvent) => {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };
}
