import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';

export interface RevealOptions {
  delay?: number;
  duration?: number;
  y?: number;
}

@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly platformId = inject(PLATFORM_ID);

  revealUp(el: HTMLElement, options: RevealOptions = {}): gsap.core.Tween | void {
    if (!isPlatformBrowser(this.platformId)) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    const { delay = 0, duration = 0.55, y = 24 } = options;

    return gsap.fromTo(el, { opacity: 0, y }, { opacity: 1, y: 0, duration, delay, ease: 'power3.out' });
  }

  revealStagger(elements: HTMLElement[], options: RevealOptions & { stagger?: number } = {}): gsap.core.Tween | void {
    if (!isPlatformBrowser(this.platformId)) {
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    const { delay = 0, duration = 0.55, y = 24, stagger = 0.1 } = options;

    return gsap.fromTo(elements, { opacity: 0, y }, { opacity: 1, y: 0, duration, stagger, delay, ease: 'power3.out' });
  }
}
