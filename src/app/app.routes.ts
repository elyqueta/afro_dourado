import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'sobre', loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage) },
  { path: 'servicos', loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage) },
  { path: 'produtos', loadComponent: () => import('./pages/products/products.page').then(m => m.ProductsPage) },
  { path: 'resultados', loadComponent: () => import('./pages/results/results.page').then(m => m.ResultsPage) },
  { path: 'testemunhos', loadComponent: () => import('./pages/testimonials/testimonials.page').then(m => m.TestimonialsPage) },
  { path: 'galeria', loadComponent: () => import('./pages/gallery/gallery.page').then(m => m.GalleryPage) },
  { path: 'artigos', loadComponent: () => import('./pages/artigos/artigos.page').then(m => m.ArtigosPage) },
  { path: 'artigos/:slug', loadComponent: () => import('./pages/artigos-article/artigos-article.page').then(m => m.ArtigosArticlePage) },
  { path: 'contacto', loadComponent: () => import('./pages/contacts/contacts.page').then(m => m.ContactsPage) },
  { path: 'contactos', redirectTo: '/contacto', pathMatch: 'full' },
  { path: 'tricologia', loadComponent: () => import('./pages/trichology/trichology.page').then(m => m.TrichologyPage) },
  { path: 'trancas-estetica', loadComponent: () => import('./pages/braids/braids.page').then(m => m.BraidsPage) },
  { path: 'equipa', loadComponent: () => import('./pages/team/team.page').then(m => m.TeamPage) },
  { path: 'agendamento', loadComponent: () => import('./pages/booking/booking.page').then(m => m.BookingPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage) },
];
