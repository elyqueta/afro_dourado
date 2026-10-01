import { Component, inject, signal, AfterViewInit, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-app-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isBrowser() && !isMobile()) {
      <div class="cursor" [class.view]="isView()" [class.open]="isOpen()" [class.hidden]="isOverPanel()"></div>
    }
  `,
  styles: [`
    .cursor {
      position: fixed;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--color-brand-gold-500);
      pointer-events: none;
      z-index: 10000;
      mix-blend-mode: difference;
      transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
      transform: translate3d(-50%, -50%, 0);
    }
    .cursor.view {
      width: 48px;
      height: 48px;
      background-color: transparent;
      border: 1px solid var(--color-brand-gold-500);
    }
    .cursor.open {
      width: 64px;
      height: 64px;
      background-color: rgba(199, 162, 75, 0.15);
      border: 1px solid var(--color-brand-gold-500);
    }
    .cursor.hidden {
      opacity: 0;
    }
  `]
})
export class AppCursorComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private panel: Element | null = null;

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  isMobile() {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  }

  isView = signal(false);
  isOpen = signal(false);
  isOverPanel = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mouseup', this.onMouseUp);

    this.panel = document.querySelector('.panel-shell');
    if (this.panel) {
      this.panel.addEventListener('mouseenter', this.onPanelEnter);
      this.panel.addEventListener('mouseleave', this.onPanelLeave);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.panel?.removeEventListener('mouseenter', this.onPanelEnter);
    this.panel?.removeEventListener('mouseleave', this.onPanelLeave);
  }

  private onMouseDown = (): void => this.isOpen.set(true);
  private onMouseUp = (): void => this.isOpen.set(false);
  private onPanelEnter = (): void => this.isOverPanel.set(true);
  private onPanelLeave = (): void => this.isOverPanel.set(false);

  private onMouseMove = (e: MouseEvent) => {
    const cursor = document.querySelector('.cursor') as HTMLElement;
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };
}
