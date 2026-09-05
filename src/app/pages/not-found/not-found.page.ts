import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="section-y container-max" style="text-align: center;">
      <h1 style="font-size: var(--text-display-l);">404</h1>
      <p class="body" style="max-width: 56ch; margin: 1.5rem auto;">Página não encontrada.</p>
    </main>
  `,
})
export class NotFoundPage {}
