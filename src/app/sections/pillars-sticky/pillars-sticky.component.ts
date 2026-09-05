import { Component, input, signal, inject, AfterViewInit, OnDestroy, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { GsapService } from '@app/core/gsap.service';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';
import { BadgeNumberComponent } from '@app/shared/ui/badge-number/badge-number.component';

@Component({
  selector: 'app-pillars-sticky',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y">
      <div class="container-max">
        <div class="sticky-wrap" #stickyRef>
          <div class="media">
            <app-smart-image
              [src]="images()[activeIndex()]"
              alt="Pilar AfroDourado"
              aspectRatio="3 / 4"
            />
          </div>
          <div class="text">
            @for (pillar of pillars(); track pillar.title) {
              <div class="pillar" [class.active]="activeIndex() === $index">
                <app-badge-number [number]="($index + 1).toString().padStart(2, '0')" />
                <h3 class="title">{{ pillar.title }}</h3>
                <p class="desc">{{ pillar.description }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  imports: [SmartImageComponent, BadgeNumberComponent],
  styles: [`
    .section {
      background-color: var(--color-cream-50);
    }
    .sticky-wrap {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: start;
    }
    .media {
      overflow: hidden;
      border-radius: var(--radius-card);
    }
    .pillar {
      padding-block: 2rem;
      border-bottom: 1px solid rgba(14, 59, 49, 0.08);
    }
    .pillar.active .title {
      color: var(--color-brand-gold-500);
    }
    .title {
      font-family: var(--font-display);
      font-size: var(--text-display-m);
      margin: 0.5rem 0 0.75rem;
      transition: color var(--duration-ui) var(--ease-out-3);
    }
    .desc {
      font-size: var(--text-body);
      line-height: 1.6;
      margin: 0;
      max-width: 56ch;
    }
    @media (min-width: 1024px) {
      .sticky-wrap {
        grid-template-columns: 1fr 1fr;
        position: sticky;
        top: 96px;
      }
    }
  `]
})
export class PillarsStickyComponent implements AfterViewInit, OnDestroy {
  private readonly gsap = inject(GsapService);
  private readonly smoothScroll = inject(SmoothScrollService);

  readonly images = input.required<string[]>();
  readonly pillars = input.required<{ title: string; description: string }[]>();

  readonly activeIndex = signal(0);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    const wrap = this.el.nativeElement.querySelector('.sticky-wrap') as HTMLElement;
    if (!wrap) return;

    this.gsap.scrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * this.pillars().length),
          this.pillars().length - 1
        );
        this.activeIndex.set(idx);
      },
    });
  }

  ngOnDestroy(): void {
    this.gsap.scrollTrigger.getAll().forEach(t => t.kill());
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {}
}
