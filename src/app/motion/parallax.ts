import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ParallaxOptions {
  speed?: number;
  scrub?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ParallaxService {
  private readonly platformId = inject(PLATFORM_ID);

  imageParallax(el: HTMLElement, options: ParallaxOptions = {}): ScrollTrigger | void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { speed = 0.3, scrub = true } = options;

    return ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
      onUpdate: (self) => {
        const y = self.progress * speed * 100;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      },
    });
  }
}
