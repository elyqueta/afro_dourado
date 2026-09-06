import { Component, input, ChangeDetectionStrategy, signal, ElementRef, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-video-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg">
      @if (posterSrc()) {
        <img [src]="posterSrc()" alt="" class="poster" aria-hidden="true" />
      }
      @if (videoSrc() && inView()) {
        <video
          [src]="videoSrc()"
          autoplay
          muted
          loop
          playsinline
          preload="none"
          class="video"
        ></video>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 0;
      }
      .bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }
      .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    `,
  ],
})
export class VideoBackgroundComponent implements AfterViewInit {
  readonly videoSrc = input<string | null>(null);
  readonly posterSrc = input.required<string>();
  readonly inView = signal(false);

  private readonly platformId = inject(PLATFORM_ID);

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;

    if (visible) {
      this.inView.set(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.inView.set(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
  }
}
