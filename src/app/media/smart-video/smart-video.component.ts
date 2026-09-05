import { Component, input, signal, inject, OnChanges, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConnectionService } from '../../core/connection.service';

type VideoState = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';

@Component({
  selector: 'app-smart-video',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper" [class.poster-only]="showPosterOnly()">
      @if (poster()) {
        <img [src]="poster()" alt="" class="poster" aria-hidden="true" />
      }
      @if (!showPosterOnly()) {
        <video
          [src]="src()"
          [poster]="poster()"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          class="video"
          (loadeddata)="onLoaded()"
          (play)="setState('playing')"
          (pause)="setState('paused')"
          (error)="onError()"
          (canplay)="setState('ready')"
          #videoRef
        ></video>
      }
      @if (showPosterOnly()) {
        <div class="poster-caption">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
        </div>
      }
    </div>
  `,
  styles: [`
    .wrapper {
      position: relative;
      overflow: hidden;
    }
    .poster {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .poster-caption {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-brand-gold-500);
      background: rgba(14, 59, 49, 0.3);
    }
  `]
})
export class SmartVideoComponent implements OnChanges {
  private readonly connection = inject(ConnectionService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly src = input.required<string>();
  readonly poster = input<string>('');
  readonly state = signal<VideoState>('idle');

  showPosterOnly = signal(false);
  private userPaused = false;
  private isInView = false;

  ngOnChanges(): void {
    if (this.connection.isSlowConnection()) {
      this.showPosterOnly.set(true);
    }
  }

  setState(s: VideoState): void {
    this.state.set(s);
  }

  onLoaded(): void {
    this.setState('ready');
  }

  onError(): void {
    this.setState('error');
    this.showPosterOnly.set(true);
  }

  play(): void {
    const video = document.querySelector('video');
    if (video) video.play().catch(() => {});
  }

  pause(): void {
    const video = document.querySelector('video');
    if (video) {
      video.pause();
      this.userPaused = true;
    }
  }
}
