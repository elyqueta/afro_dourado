import { Component, input, inject, PLATFORM_ID, AfterViewInit, OnDestroy, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { GsapService } from '@app/core/gsap.service';
import { HeroEntranceService } from '@app/motion/hero-entrance';
import { EyebrowLabelComponent } from '@app/shared/ui/eyebrow-label/eyebrow-label.component';
import { OrganicDividerComponent } from '@app/shared/ui/divider-organic/divider-organic.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" #heroRef>
      <div class="bg" #bgRef>
        @if (videoSrc()) {
          <video
            [src]="videoSrc()"
            [poster]="posterSrc()"
            autoplay
            muted
            loop
            playsinline
            preload="none"
            class="hero-video"
          ></video>
        } @else {
          <img [src]="posterSrc()" alt="" class="hero-poster" aria-hidden="true" />
        }
      </div>

      <div class="overlay"></div>

      <div class="content container-max">
        <app-eyebrow-label [text]="eyebrow()" [color]="'cream'" class="eyebrow" #eyebrowRef />
        <div class="headline" #headlineRefs>
          @for (line of headlineLines; track line) {
            <span class="line">{{ line }}</span>
          }
        </div>
        <p class="description" #descRef>{{ description() }}</p>
        <div class="ctas" #ctaRefs>
          <ng-content />
        </div>
      </div>

      <div class="decor" #decorRefs>
        <app-organic-divider />
      </div>
    </section>
  `,
  imports: [EyebrowLabelComponent, OrganicDividerComponent],
  styles: [`
    .hero {
      position: relative;
      height: 100svh;
      min-height: 600px;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
    }
    .bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .hero-video,
    .hero-poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(14, 59, 49, 0.55), rgba(14, 59, 49, 0.15), transparent);
      z-index: 1;
    }
    .content {
      position: relative;
      z-index: 2;
      padding-bottom: 6rem;
      color: var(--color-cream-50);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .eyebrow {
      margin-bottom: 0.5rem;
    }
    .headline {
      display: flex;
      flex-direction: column;
      gap: 0.1em;
    }
    .line {
      display: block;
      font-family: var(--font-display);
      font-size: var(--text-display-xl);
      line-height: 1.05;
      font-weight: 400;
    }
    .description {
      max-width: 540px;
      font-size: var(--text-body);
      line-height: 1.6;
      opacity: 0.85;
      margin: 0;
    }
    .ctas {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .decor {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      z-index: 2;
      opacity: 0.6;
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly heroEntrance = inject(HeroEntranceService);
  private readonly gsap = inject(GsapService);
  private readonly smoothScroll = inject(SmoothScrollService);

  readonly videoSrc = input<string | null>(null);
  readonly posterSrc = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly headline = input.required<string>();

  get headlineLines(): string[] {
    return this.headline().split('\n').filter(Boolean);
  }
  readonly description = input<string>('');

  private killFn: any = null;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const bg = this.el.nativeElement.querySelector('.bg') as HTMLElement;
    const eyebrowEl = this.el.nativeElement.querySelector('.eyebrow') as HTMLElement;
    const headlineEls = Array.from(this.el.nativeElement.querySelectorAll('.line')) as HTMLElement[];
    const descEl = this.el.nativeElement.querySelector('.description') as HTMLElement;
    const ctaEls = Array.from(this.el.nativeElement.querySelectorAll('.ctas ::ng-deep > *')) as HTMLElement[];
    const decorEls = Array.from(this.el.nativeElement.querySelectorAll('.decor')) as HTMLElement[];

    this.heroEntrance.heroEntrance({
      bg,
      logo: eyebrowEl,
      headline: headlineEls,
      description: descEl,
      ctas: ctaEls,
      decor: decorEls,
    });

    const hero = this.el.nativeElement.querySelector('.hero') as HTMLElement;
    this.killFn = this.heroEntrance.heroScrollFade(hero);

    this.smoothScroll.instance?.on('scroll', () => {
      this.gsap.scrollTrigger.update();
    });
  }

  ngOnDestroy(): void {
    if (this.killFn) {
      this.killFn();
    }
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {}
}
