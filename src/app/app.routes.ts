import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
  { path: 'tricologia', loadComponent: () => import('./pages/trichology/trichology.page').then(m => m.TrichologyPage) },
  { path: 'trancas-estetica', loadComponent: () => import('./pages/braids/braids.page').then(m => m.BraidsPage) },
  { path: 'produtos', loadComponent: () => import('./pages/products/products.page').then(m => m.ProductsPage) },
  { path: 'sobre', loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage) },
  { path: 'equipa', loadComponent: () => import('./pages/team/team.page').then(m => m.TeamPage) },
  { path: 'journal', loadComponent: () => import('./pages/journal/journal.page').then(m => m.JournalPage) },
  { path: 'journal/:slug', loadComponent: () => import('./pages/journal-article/journal-article.page').then(m => m.JournalArticlePage) },
  { path: 'contactos', loadComponent: () => import('./pages/contacts/contacts.page').then(m => m.ContactsPage) },
  { path: 'agendamento', loadComponent: () => import('./pages/booking/booking.page').then(m => m.BookingPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.page').then(m => m.NotFoundPage) },
];
