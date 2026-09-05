import { Component, input, inject, AfterViewInit, PLATFORM_ID, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SmoothScrollService } from '@app/core/smooth-scroll.service';
import { RevealService } from '@app/motion/reveal';
import { EyebrowLabelComponent } from '@app/shared/ui/eyebrow-label/eyebrow-label.component';
import { OrganicDividerComponent } from '@app/shared/ui/divider-organic/divider-organic.component';
import { SmartImageComponent } from '@app/media/smart-image/smart-image.component';

@Component({
  selector: 'app-brand-story-reveal',
  standalone: true,
  imports: [EyebrowLabelComponent, OrganicDividerComponent, SmartImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y">
      <div class="container-max grid">
        <div class="text" #textRef>
          <app-eyebrow-label text="O cuidado começa aqui" color="gold" />
          <h2 class="headline">{{ text() }}</h2>
          <app-organic-divider />
        </div>
        <div class="media" #mediaRef>
          <app-smart-image
            [src]="imageSrc()"
            alt="Fotografia editorial AfroDourado — detalhe de cabelo natural"
            aspectRatio="4 / 5"
          />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      background-color: var(--color-cream-50);
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .headline {
      font-family: var(--font-display);
      font-size: var(--text-display-l);
      line-height: 1.1;
      font-weight: 400;
      color: var(--color-ink-900);
    }
    .media {
      overflow: hidden;
      border-radius: var(--radius-card);
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: 1fr 1fr;
      }
      .media {
        transform: translateX(40px);
      }
    }
  `]
})
export class BrandStoryRevealComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly text = input.required<string>();
  readonly imageSrc = input.required<string>();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const text = this.el.nativeElement.querySelector('.text') as HTMLElement;
    const media = this.el.nativeElement.querySelector('.media') as HTMLElement;
    if (text) this.reveal.revealUp(text, { delay: 0.1 });
    if (media) this.reveal.revealUp(media, { delay: 0.25, y: 30 });
  }

  constructor(private readonly el: ElementRef<HTMLElement>, private readonly reveal: RevealService) {}
}
