import { Component, inject, signal, ChangeDetectionStrategy, AfterViewInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SmoothScrollService } from '../../core/smooth-scroll.service';

@Component({
  selector: 'app-page-transition',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="overlay" aria-hidden="true">
        <img src="/AfroDourado-logo-transparente.png" alt="AfroDourado" class="brand-logo" />
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9500;
      background-color: var(--color-brand-green-900);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      transition: right var(--assistant-close) var(--ease-out-3);
    }

    .brand-logo {
      height: 60px;
      width: auto;
    }
  `]
})
export class PageTransitionComponent implements AfterViewInit, OnDestroy {
  private readonly smoothScroll = inject(SmoothScrollService);
  private readonly platformId = inject(PLATFORM_ID);
  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly visible = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.visible.set(true);
    this.timer = setTimeout(() => {
      this.visible.set(false);
      this.smoothScroll.scrollTo(0, { immediate: true });
      this.timer = null;
    }, 600);
  }

  ngOnDestroy(): void {
    if (this.timer !== null) clearTimeout(this.timer);
  }
}
