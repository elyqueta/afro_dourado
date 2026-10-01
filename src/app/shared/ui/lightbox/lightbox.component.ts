import {
  Component,
  input,
  signal,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
        (click)="onOverlayClick($event)"
        (keydown)="onDialogKeydown($event)"
        tabindex="-1"
      >
        <div class="toolbar">
          <p class="counter">{{ currentIndex() + 1 }} / {{ images().length }}</p>
          <button #closeButton type="button" class="close" aria-label="Fechar visualizador" (click)="close()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        @if (images().length > 1) {
          <button type="button" class="nav prev" aria-label="Imagem anterior" (click)="prev()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        }

        <div class="stage" (click)="$event.stopPropagation()">
          <div
            #imageViewport
            class="image-viewport"
            (pointerdown)="onImagePointerDown($event)"
            (pointermove)="onImagePointerMove($event)"
            (pointerup)="onImagePointerEnd($event)"
            (pointercancel)="onImagePointerEnd($event)"
            (wheel)="onImageWheel($event)"
          >
            <img
              #zoomImage
              [src]="currentImage()"
              [alt]="currentTitle()"
              class="image"
              [class.zoomed]="zoom() > 1"
              [style.transform]="imageTransform()"
            />
          </div>
          @if (currentTitle()) {
            <p class="caption">{{ currentTitle() }}</p>
          }
          <div class="zoom-controls" aria-label="Controlos de ampliação">
            <button type="button" aria-label="Reduzir imagem" [disabled]="zoom() <= 1" (click)="zoomOut()">−</button>
            <span aria-live="polite">{{ Math.round(zoom() * 100) }}%</span>
            <button type="button" aria-label="Ampliar imagem" [disabled]="zoom() >= 3" (click)="zoomIn()">+</button>
            <button type="button" class="reset-zoom" [disabled]="zoom() === 1" (click)="resetZoom()">Repor</button>
          </div>
          @if (zoom() > 1) {
            <p class="pan-hint">Arrasta a imagem para a explorar</p>
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
      width: 100vw;
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(14, 59, 49, 0.92);
      padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right))
        max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
      animation: fadeIn 0.2s var(--ease-out-3);
      overscroll-behavior: contain;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .stage {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: min(100%, 1200px);
      max-height: 100%;
      min-width: 0;
      gap: 0.75rem;
      overflow: hidden;
    }
    .image-viewport {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: min(50vh, 24rem);
      max-height: calc(100dvh - 11rem);
      overflow: hidden;
      overscroll-behavior: contain;
    }
    .image {
      max-width: min(100%, 1200px);
      max-height: calc(100dvh - 11rem);
      object-fit: contain;
      border-radius: var(--radius-card);
      display: block;
      transform-origin: center;
      transition: transform 180ms var(--ease-out-3);
      user-select: none;
      -webkit-user-drag: none;
    }
    .image.zoomed {
      cursor: grab;
      transition: none;
      touch-action: none;
    }
    .image.zoomed:active {
      cursor: grabbing;
    }
    .caption {
      max-width: 100%;
      margin: 0;
      text-align: center;
      font-family: var(--font-display);
      font-size: var(--text-heading);
      color: var(--color-cream-50);
    }
    .toolbar {
      position: absolute;
      top: max(0.75rem, env(safe-area-inset-top));
      right: max(0.75rem, env(safe-area-inset-right));
      left: max(0.75rem, env(safe-area-inset-left));
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
    }
    .counter {
      margin: 0;
      color: var(--color-cream-50);
      font-size: var(--text-small);
    }
    .close {
      background: none;
      border: none;
      color: var(--color-cream-50);
      cursor: pointer;
      padding: 0.5rem;
      line-height: 0;
    }
    .close:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border: 1px solid rgba(247, 243, 236, 0.4);
      border-radius: 50%;
      background: rgba(14, 59, 49, 0.72);
      color: var(--color-cream-50);
      cursor: pointer;
      z-index: 10;
    }
    .nav:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .prev { left: max(0.5rem, env(safe-area-inset-left)); }
    .next { right: max(0.5rem, env(safe-area-inset-right)); }
    .zoom-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.35rem;
      border: 1px solid rgba(247, 243, 236, 0.25);
      border-radius: var(--radius-pill);
      background: rgba(14, 59, 49, 0.88);
      color: var(--color-cream-50);
    }
    .zoom-controls button {
      min-width: 2.25rem;
      min-height: 2.25rem;
      border: 1px solid rgba(247, 243, 236, 0.3);
      border-radius: var(--radius-pill);
      background: transparent;
      color: inherit;
      font: 600 var(--text-body) var(--font-sans);
      cursor: pointer;
    }
    .zoom-controls button:hover:not(:disabled) {
      background: var(--color-brand-gold-500);
      color: var(--color-ink-900);
    }
    .zoom-controls button:focus-visible {
      outline: 2px solid var(--color-brand-gold-500);
      outline-offset: 2px;
    }
    .zoom-controls button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .zoom-controls span {
      min-width: 3ch;
      text-align: center;
      font-size: var(--text-caption);
    }
    .pan-hint {
      margin: 0;
      color: rgba(247, 243, 236, 0.72);
      font-size: var(--text-caption);
      text-align: center;
    }
    .zoom-controls .reset-zoom {
      width: auto;
      padding-inline: 0.75rem;
      font-size: var(--text-caption);
    }
    @media (max-width: 480px) {
      .overlay {
        padding-inline: max(0.5rem, env(safe-area-inset-left)) max(0.5rem, env(safe-area-inset-right));
      }
      .image-viewport,
      .image {
        max-height: calc(100dvh - 12rem);
      }
      .nav {
        top: auto;
        bottom: max(4.25rem, calc(env(safe-area-inset-bottom) + 4rem));
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .overlay,
      .image {
        animation: none;
        transition: none;
      }
    }
  `]
})
export class LightboxComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly smoothScroll = inject(SmoothScrollService);

  readonly images = input<string[]>([]);
  readonly title = input<string>('');
  readonly captions = input<string[]>([]);
  readonly open = signal(false);
  readonly zoom = signal(1);
  readonly panX = signal(0);
  readonly panY = signal(0);
  readonly Math = Math;

  readonly currentIndex = signal(0);
  private restoreFocusTo: HTMLElement | null = null;
  private focusFrame: number | null = null;
  private stoppedScroll = false;
  private activePointerId: number | null = null;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragOriginX = 0;
  private dragOriginY = 0;

  @ViewChild('closeButton') private closeButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('imageViewport') private imageViewport?: ElementRef<HTMLElement>;
  @ViewChild('zoomImage') private zoomImage?: ElementRef<HTMLImageElement>;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('keydown', this.onKey);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('keydown', this.onKey);
    }
    this.restoreScroll();
  }

  currentImage() {
    return this.images()[this.currentIndex()];
  }

  openLightbox(index: number): void {
    if (!this.images().length) return;
    this.currentIndex.set(index);
    this.zoom.set(1);
    this.resetPan();
    this.restoreFocusTo = isPlatformBrowser(this.platformId) && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    this.open.set(true);
    this.smoothScroll.stop();
    this.stoppedScroll = true;
    if (isPlatformBrowser(this.platformId)) {
      this.focusFrame = requestAnimationFrame(() => {
        this.closeButton?.nativeElement.focus();
        this.focusFrame = null;
      });
    }
  }

  close(): void {
    this.open.set(false);
    if (isPlatformBrowser(this.platformId) && this.focusFrame !== null) {
      cancelAnimationFrame(this.focusFrame);
      this.focusFrame = null;
    }
    this.restoreScroll();
    this.restoreFocusTo?.focus();
    this.restoreFocusTo = null;
  }

  next(): void {
    this.currentIndex.update((index) => (index + 1) % this.images().length);
    this.zoom.set(1);
    this.resetPan();
  }

  prev(): void {
    this.currentIndex.update((index) => (index - 1 + this.images().length) % this.images().length);
    this.zoom.set(1);
    this.resetPan();
  }

  currentTitle(): string {
    return this.captions()[this.currentIndex()] ?? this.title();
  }

  zoomIn(): void {
    this.zoom.update((value) => Math.min(3, Math.round((value + 0.25) * 100) / 100));
    this.clampPan();
  }

  zoomOut(): void {
    const nextZoom = Math.max(1, Math.round((this.zoom() - 0.25) * 100) / 100);
    this.zoom.set(nextZoom);
    if (nextZoom === 1) this.resetPan();
    else this.clampPan();
  }

  resetZoom(): void {
    this.zoom.set(1);
    this.resetPan();
  }

  imageTransform(): string {
    return `translate3d(${this.panX()}px, ${this.panY()}px, 0) scale(${this.zoom()})`;
  }

  onImagePointerDown(event: PointerEvent): void {
    if (this.zoom() <= 1 || event.button !== 0) return;
    this.activePointerId = event.pointerId;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragOriginX = this.panX();
    this.dragOriginY = this.panY();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  onImagePointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) return;
    this.panX.set(this.dragOriginX + event.clientX - this.dragStartX);
    this.panY.set(this.dragOriginY + event.clientY - this.dragStartY);
    this.clampPan();
  }

  onImagePointerEnd(event: PointerEvent): void {
    if (event.pointerId !== this.activePointerId) return;
    this.activePointerId = null;
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
  }

  onImageWheel(event: WheelEvent): void {
    if (this.zoom() <= 1) return;
    event.preventDefault();
    this.panX.update((value) => value - event.deltaX);
    this.panY.update((value) => value - event.deltaY);
    this.clampPan();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  onDialogKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.close();
      return;
    }

    if (event.key !== 'Tab') return;
    const dialog = event.currentTarget as HTMLElement;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ));
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private restoreScroll(): void {
    if (!this.stoppedScroll) return;
    this.smoothScroll.start();
    this.stoppedScroll = false;
  }

  private resetPan(): void {
    this.panX.set(0);
    this.panY.set(0);
  }

  private clampPan(): void {
    const viewport = this.imageViewport?.nativeElement;
    const image = this.zoomImage?.nativeElement;
    if (!viewport || !image) return;

    const scale = this.zoom();
    const maxX = Math.max(0, (image.offsetWidth * scale - viewport.clientWidth) / 2);
    const maxY = Math.max(0, (image.offsetHeight * scale - viewport.clientHeight) / 2);
    this.panX.update((value) => Math.max(-maxX, Math.min(maxX, value)));
    this.panY.update((value) => Math.max(-maxY, Math.min(maxY, value)));
  }

  private onKey = (e: KeyboardEvent) => {
    if (!this.open()) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  };
}
