import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface HeroEntranceOptions {
  skipReduced?: boolean;
}

@Injectable({ providedIn: 'root' })
export class HeroEntranceService {
  private readonly platformId = inject(PLATFORM_ID);

  heroEntrance(elements: {
    bg?: HTMLElement;
    logo?: HTMLElement;
    headline?: HTMLElement[];
    description?: HTMLElement;
    ctas?: HTMLElement[];
    decor?: HTMLElement[];
  }, options: HeroEntranceOptions = {}): gsap.core.Timeline | void {
    if (!isPlatformBrowser(this.platformId)) {
      this.showAll(elements);
      return;
    }

    const { skipReduced = false } = options;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion && !skipReduced) {
      this.showAll(elements);
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (elements.bg) {
      tl.fromTo(elements.bg, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, 0);
    }

    if (elements.logo) {
      tl.fromTo(elements.logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
    }

    if (elements.headline && elements.headline.length) {
      tl.fromTo(elements.headline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.6);
    }

    if (elements.description) {
      tl.fromTo(elements.description, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9);
    }

    if (elements.ctas && elements.ctas.length) {
      tl.fromTo(elements.ctas, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.1);
    }

    if (elements.decor && elements.decor.length) {
      tl.fromTo(elements.decor, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 }, 1.2);
    }

    return tl;
  }

  heroScrollFade(el: HTMLElement): ScrollTrigger | void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    return ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        el.style.transform = `scale(${1 + progress * 0.04})`;
        el.style.opacity = String(1 - progress * 1.4);
      },
    });
  }

  private showAll(elements: {
    bg?: HTMLElement;
    logo?: HTMLElement;
    headline?: HTMLElement[];
    description?: HTMLElement;
    ctas?: HTMLElement[];
    decor?: HTMLElement[];
  }): void {
    if (elements.bg) {
      elements.bg.style.transform = 'scale(1)';
      elements.bg.style.opacity = '1';
    }
    if (elements.logo) {
      elements.logo.style.opacity = '1';
      elements.logo.style.transform = 'translateY(0)';
    }
    if (elements.headline) {
      elements.headline.forEach(h => {
        h.style.opacity = '1';
        h.style.transform = 'translateY(0)';
      });
    }
    if (elements.description) {
      elements.description.style.opacity = '1';
      elements.description.style.transform = 'translateY(0)';
    }
    if (elements.ctas) {
      elements.ctas.forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      });
    }
    if (elements.decor) {
      elements.decor.forEach(d => {
        d.style.opacity = '1';
        d.style.transform = 'scale(1)';
      });
    }
  }
}
