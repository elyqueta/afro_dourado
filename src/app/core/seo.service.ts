import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

export interface SeoMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);

  update(meta: SeoMeta): void {
    this.title.setTitle(meta.title);

    const metaTags = document.querySelector('meta');
    // Nota: actualizar outras meta tags aqui se necessário via Renderer2/DOM
  }
}
