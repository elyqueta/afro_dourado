import { Injectable, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollService } from './smooth-scroll.service';

@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly smoothScroll = inject(SmoothScrollService);

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    this.smoothScroll.on('scroll', () => ScrollTrigger.update());
  }

  get gsap() {
    return gsap;
  }

  get scrollTrigger() {
    return ScrollTrigger;
  }

  ticker(callback: (time: number) => void): void {
    gsap.ticker.add(callback);
  }

  removeTicker(callback: (time: number) => void): void {
    gsap.ticker.remove(callback);
  }

  lagSmoothing(enabled: boolean): void {
    gsap.ticker.lagSmoothing(enabled ? 0 : 0.016);
  }

  killAllTriggers(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  refresh(): void {
    ScrollTrigger.refresh();
  }
}
