import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'sobre', renderMode: RenderMode.Prerender },
  { path: 'servicos', renderMode: RenderMode.Prerender },
  { path: 'produtos', renderMode: RenderMode.Prerender },
  { path: 'resultados', renderMode: RenderMode.Prerender },
  { path: 'testemunhos', renderMode: RenderMode.Prerender },
  { path: 'galeria', renderMode: RenderMode.Prerender },
  { path: 'artigos', renderMode: RenderMode.Prerender },
  { path: 'artigos/:slug', renderMode: RenderMode.Server },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: 'contactos', renderMode: RenderMode.Prerender },
  { path: 'tricologia', renderMode: RenderMode.Prerender },
  { path: 'trancas-estetica', renderMode: RenderMode.Prerender },
  { path: 'equipa', renderMode: RenderMode.Prerender },
  { path: 'agendamento', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];
