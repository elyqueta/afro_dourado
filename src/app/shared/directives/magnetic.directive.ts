import { isPlatformBrowser } from '@angular/common';
import { Directive, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly strength = parseFloat(this.el.nativeElement.getAttribute('appMagneticStrength') ?? '0.3');
  private readonly isFine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  private rafId: number | null = null;
  private bounds: DOMRect | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;

  constructor() {
    if (!isPlatformBrowser(this.platformId) || !this.isFine) return;

    this.el.nativeElement.addEventListener('mouseenter', () => {
      this.bounds = this.el.nativeElement.getBoundingClientRect();
      this.animate();
    });

    this.el.nativeElement.addEventListener('mouseleave', () => {
      this.targetX = 0;
      this.targetY = 0;
      this.bounds = null;
    });

    this.el.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.bounds) return;
      this.mouseX = e.clientX - this.bounds.left - this.bounds.width / 2;
      this.mouseY = e.clientY - this.bounds.top - this.bounds.height / 2;
      this.targetX = this.mouseX * this.strength;
      this.targetY = this.mouseY * this.strength;
    });
  }

  private animate = (): void => {
    if (!this.bounds) {
      this.rafId = null;
      return;
    }

    this.currentX += (this.targetX - this.currentX) * 0.15;
    this.currentY += (this.targetY - this.currentY) * 0.15;

    this.el.nativeElement.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
    this.rafId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
