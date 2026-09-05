import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { EyebrowLabelComponent } from '@app/shared/ui/eyebrow-label/eyebrow-label.component';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper">
      @if (eyebrow()) {
        <app-eyebrow-label [text]="eyebrow()!" [color]="eyebrowColor()" class="eyebrow" />
      }
      <h2 [class]="titleClasses()">
        @for (part of titleParts(); track part.text) {
          @if (part.gold) {
            <span class="gold">{{ part.text }}</span>
          } @else {
            {{ part.text }}
          }
        }
      </h2>
    </div>
  `,
  imports: [EyebrowLabelComponent],
  styles: [`
    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .eyebrow {
      margin-bottom: 0.5rem;
    }
    h2 {
      font-family: var(--font-display);
      font-weight: 400;
      line-height: 1.1;
      margin: 0;
    }
    .display-l {
      font-size: var(--text-display-l);
    }
    .display-m {
      font-size: var(--text-display-m);
    }
    .heading {
      font-family: var(--font-sans);
      font-size: var(--text-heading);
      font-weight: 600;
    }
    .gold {
      color: var(--color-brand-gold-500);
    }
  `]
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string | null>(null);
  readonly eyebrowColor = input<'ink' | 'gold' | 'cream' | 'green'>('ink');
  readonly title = input<string>('');
  readonly titleParts = input<{ text: string; gold?: boolean }[]>([]);
  readonly size = input<'display-l' | 'display-m' | 'heading'>('display-l');

  titleClasses(): string {
    return this.size();
  }
}
