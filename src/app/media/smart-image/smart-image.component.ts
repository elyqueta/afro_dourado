import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-smart-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="src()"
      [srcset]="srcset()"
      [sizes]="sizes()"
      [alt]="alt()"
      [class]="classes()"
      [loading]="priority() ? 'eager' : 'lazy'"
      [style.aspectRatio]="aspectRatio()"
    />
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .cover { object-fit: cover; }
    .contain { object-fit: contain; }
  `]
})
export class SmartImageComponent {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly priority = input(false);
  readonly aspectRatio = input<string>('16 / 9');
  readonly sizes = input('100vw');
  readonly srcset = input<string | null>(null);
  readonly objectFit = input<'cover' | 'contain'>('cover');

  classes(): string {
    return this.objectFit();
  }
}
