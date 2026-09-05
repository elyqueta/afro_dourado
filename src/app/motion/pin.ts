import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface PinOptions {
  pinSpacing?: boolean;
  start?: string;
  end?: string;
}

@Injectable({ providedIn: 'root' })
export class PinService {
  private readonly platformId = inject(PLATFORM_ID);

  pinSection(el: HTMLElement, options: PinOptions = {}): ScrollTrigger | void {
    if (!isPlatformBrowser(this.platformId)) return;

    const { pinSpacing = true, start = 'top top', end = 'bottom bottom' } = options;

    return ScrollTrigger.create({
      trigger: el,
      start,
      end,
      pin: true,
      pinSpacing,
    });
  }
}
