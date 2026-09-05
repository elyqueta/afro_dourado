import { isPlatformBrowser } from '@angular/common';
import { Directive, inject, PLATFORM_ID, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

type InViewOutputCallback = () => void;

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly once = this.element.nativeElement.hasAttribute('appInViewOnce');
  private readonly threshold = parseFloat(this.element.nativeElement.getAttribute('appInViewThreshold') ?? '0.2');
  private observer: IntersectionObserver | null = null;
  private hasEntered = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !(this.once && this.hasEntered)) {
            this.hasEntered = true;
            this.element.nativeElement.dispatchEvent(new CustomEvent('inViewEnter'));
            if (this.once) {
              this.observer?.disconnect();
            }
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(this.element.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
