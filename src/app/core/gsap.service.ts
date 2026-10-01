import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class GsapService {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  get gsap() {
    return gsap;
  }

  get scrollTrigger() {
    return ScrollTrigger;
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
