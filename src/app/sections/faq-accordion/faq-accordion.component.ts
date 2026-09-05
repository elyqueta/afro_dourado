import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { AccordionComponent } from '../../shared/ui/accordion/accordion.component';
import { SectionHeadingComponent } from '@app/shared/ui/section-heading/section-heading.component';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [AccordionComponent, SectionHeadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section-y" style="background-color: var(--color-white);">
      <div class="container-max">
        <app-section-heading eyebrow="FAQ" title="Perguntas frequentes" size="display-m" />
        <div class="list">
          <app-accordion [items]="items()" />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .list {
      margin-top: 2rem;
      max-width: 800px;
    }
  `]
})
export class FaqAccordionComponent {
  readonly items = input.required<{ id: string | number; label: string; content: string }[]>();
}
