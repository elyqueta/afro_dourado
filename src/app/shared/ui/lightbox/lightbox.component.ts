import { Component, input, signal, inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div
        class="overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Visualizador de imagem"
        (click)="close()"
        (keydown.escape)="close()"
      >
        <button type="button" class="close" aria-label="Fechar visualizador" (click)="close()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        @if (images().length > 1) {
          <button type="button" class="nav prev" aria-label="Imagem anterior" (click)="prev()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        }

        <div class="stage" (click)="$event.stopPropagation()">
          <img [src]="currentImage()" alt="{{ title() }}" class="image" />
          @if (title()) {
            <p class="caption">{{ title() }}</p>
          }
        </div>

        @if (images().length > 1) {
          <button type="button" class="nav next" aria-label="Imagem seguinte" (click)="next()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        }
      </div>
    }
  `,
  styles: [`
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(14, 59, 49, 0.92);
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .stage {
      position: relative;
      max-width: 90vw;
      max-height: 85vh;
    }
    .image {
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
      border-radius: var(--radius-card);
      display: block;
    }
    .caption {
      margin-top: 1rem;
      text-align: center;
      font-family: var(--font-display);
      font-size: var(--text-heading);
      color: var(--color-cream-50);
    }
    .close {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: none;
      border: none;
      color: var(--color-cream-50);
      cursor: pointer;
      padding: 0.5rem;
      z-index: 10;
    }
    .close:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--color-cream-50);
      cursor: pointer;
      padding: 1rem;
      z-index: 10;
    }
    .nav:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .prev { left: 1rem; }
    .next { right: 1rem; }
  `]
})
export class LightboxComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly smoothScroll = inject(SmoothScrollService);

  readonly images = input<string[]>([]);
  readonly title = input<string>('');
  readonly open = signal(false);

  private currentIndex = 0;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.onKey);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.onKey);
    }
    this.smoothScroll.start();
  }

  currentImage() {
    return this.images()[this.currentIndex];
  }

  openLightbox(index: number): void {
    this.currentIndex = index;
    this.open.set(true);
    this.smoothScroll.stop();
  }

  close(): void {
    this.open.set(false);
    this.smoothScroll.start();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images().length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images().length) % this.images().length;
  }

  private onKey = (e: KeyboardEvent) => {
    if (!this.open()) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  };
}
