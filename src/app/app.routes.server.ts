import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'sobre', renderMode: RenderMode.Prerender },
  { path: 'tricologia', renderMode: RenderMode.Prerender },
  { path: 'trancas-estetica', renderMode: RenderMode.Prerender },
  { path: 'produtos', renderMode: RenderMode.Prerender },
  { path: 'equipa', renderMode: RenderMode.Prerender },
  { path: 'contactos', renderMode: RenderMode.Prerender },
  { path: 'journal', renderMode: RenderMode.Prerender },
  { path: 'journal/:slug', renderMode: RenderMode.Server },
  { path: 'agendamento', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
