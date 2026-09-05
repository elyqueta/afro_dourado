import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private lenis: Lenis | null = null;

  get instance(): Lenis | null {
    return this.lenis;
  }

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
  }

  start(): void {
    this.lenis?.start();
  }

  stop(): void {
    this.lenis?.stop();
  }

  scrollTo(target: string | number, options?: any): void {
    this.lenis?.scrollTo(target, options);
  }

  raf(time: number): void {
    this.lenis?.raf(time);
  }

  on(event: any, callback: (data: any) => void): void {
    this.lenis?.on(event, callback);
  }

  destroy(): void {
    this.lenis?.destroy();
    this.lenis = null;
  }
}
