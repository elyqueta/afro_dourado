import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private lenis: Lenis | null = null;
  private rafId: number | null = null;
  readonly ready = signal(false);

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

    this.ready.set(true);
    this.startLoop();
  }

  startLoop(): void {
    if (!this.lenis || this.rafId !== null) return;

    const tick = (time: number) => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  stopLoop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  start(): void {
    this.lenis?.start();
    this.startLoop();
  }

  stop(): void {
    this.lenis?.stop();
    this.stopLoop();
  }

  scrollTo(target: string | number, options?: any): void {
    this.lenis?.scrollTo(target, options);
  }

  on(event: any, callback: (data: any) => void): void {
    this.lenis?.on(event, callback);
  }

  destroy(): void {
    this.stopLoop();
    this.lenis?.destroy();
    this.lenis = null;
    this.ready.set(false);
  }
}
