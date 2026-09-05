# 04 — Arquitectura Angular

## Convenções gerais

- **Standalone components** apenas (já é o padrão do projecto — sem `NgModule`).
- **Signals** para todo o estado local (`signal()`, `computed()`, `input()`, `output()` em vez de
  `@Input()`/`@Output()` decorators — sintaxe function-based do Angular 22).
- **`ChangeDetectionStrategy.OnPush`** em todos os componentes.
- Ficheiros separados por componente: `nome.ts`, `nome.html`, `nome.css` (segue o padrão já
  presente em `src/app/app.ts` / `app.html` / `app.css`).
- Nomes de selector com prefixo `app-` (definido em `angular.json` → `"prefix": "app"`).
- Nada de lógica de negócio em templates além de bindings simples — extrair para signals/computed
  no `.ts`.
- Texto sempre em português (Angola/Portugal) — nenhum i18n multi-idioma é pedido nesta fase.

## Estrutura de pastas (`src/app/`)

```
src/app/
  app.ts / app.html / app.css / app.routes.ts / app.config.ts / app.config.server.ts

  core/                         # serviços singleton, sem UI
    smooth-scroll.service.ts
    gsap.service.ts             # regista plugins GSAP uma única vez
    booking.service.ts          # estado do fluxo de agendamento (signals)
    seo.service.ts              # wrapper de Meta/Title por rota
    connection.service.ts       # navigator.connection / save-data helpers

  motion/                       # funções puras de animação (ver docs/03)
    reveal.ts
    parallax.ts
    pin.ts
    hero-entrance.ts
    easing.ts
    durations.ts
    reduced-motion.ts

  shared/
    directives/
      in-view.directive.ts
      magnetic.directive.ts     # efeito "magnético" em CTAs (desktop only)
    pipes/
      ...
    ui/                         # componentes puramente visuais e reutilizáveis
      button/
      pill-link/
      section-heading/
      eyebrow-label/
      divider-organic/          # motivo orgânico dourado, ver docs/01
      accordion/
      lightbox/
      cursor/
      badge-number/             # "01" grande estilo tricologia

  layout/
    navbar/
    footer/
    page-transition/
    cta-bar-mobile/

  media/
    smart-image/
    smart-video/

  sections/                     # blocos grandes reutilizados nas páginas
    hero/
    brand-story-reveal/
    pillars-sticky/
    trichology-preview/
    braids-gallery-preview/
    products-preview/
    team-preview/
    journal-preview/
    booking-cta/
    faq-accordion/
    location-picker/

  booking/
    booking-flow/
    booking-step-service/
    booking-step-unit/
    booking-step-datetime/
    booking-step-contact/
    booking-summary/

  assistant/
    afro-assistant-launcher/
    afro-assistant-panel/

  pages/                        # uma pasta por rota, componente "page" fino que compõe sections/
    home/
    trichology/
    braids/
    products/
    about/
    team/
    journal/
    journal-article/
    contacts/
    booking/
```

## Routing (`app.routes.ts`)

```ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomePage) },
  { path: 'tricologia', loadComponent: () => import('./pages/trichology/trichology').then(m => m.TrichologyPage) },
  { path: 'trancas-estetica', loadComponent: () => import('./pages/braids/braids').then(m => m.BraidsPage) },
  { path: 'produtos', loadComponent: () => import('./pages/products/products').then(m => m.ProductsPage) },
  { path: 'sobre', loadComponent: () => import('./pages/about/about').then(m => m.AboutPage) },
  { path: 'equipa', loadComponent: () => import('./pages/team/team').then(m => m.TeamPage) },
  { path: 'journal', loadComponent: () => import('./pages/journal/journal').then(m => m.JournalPage) },
  { path: 'journal/:slug', loadComponent: () => import('./pages/journal-article/journal-article').then(m => m.JournalArticlePage) },
  { path: 'contactos', loadComponent: () => import('./pages/contacts/contacts').then(m => m.ContactsPage) },
  { path: 'agendamento', loadComponent: () => import('./pages/booking/booking').then(m => m.BookingPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundPage) },
];
```

Todas as rotas usam **lazy loading** (`loadComponent`) — mantém o bundle inicial pequeno (ver
`docs/09-seo-acessibilidade-performance.md` sobre orçamentos de bundle já definidos em
`angular.json`).

## `app.routes.server.ts`

Actualizar `RenderMode` por rota conforme o tipo de conteúdo:
- Páginas institucionais estáveis (`/`, `/sobre`, `/tricologia`, `/trancas-estetica`, `/produtos`,
  `/equipa`, `/contactos`): `RenderMode.Prerender` (conteúdo não muda por utilizador).
- `/journal` e `/journal/:slug`: `RenderMode.Server` se o conteúdo vier de uma fonte dinâmica no
  futuro; `Prerender` enquanto o conteúdo for estático/hardcoded nesta fase inicial.
- `/agendamento`: `RenderMode.Server` (formulário interactivo, sem necessidade de pré-render, mas
  deve continuar a fazer SSR do shell para SEO/first paint).

## Gestão de estado

- Estado local de UI (accordions, menus, modais, filtros) → `signal()` dentro do próprio
  componente.
- Estado global apenas onde é realmente partilhado entre componentes distantes:
  - `BookingService` (fluxo de agendamento multi-step, signals `readonly step = signal(1)` etc.)
  - `AssistantService` (aberto/fechado, histórico de mensagens do chatbot)
- Nunca introduzir NgRx ou stores externas — a complexidade do produto não justifica.

## SSR — regras práticas

- Qualquer acesso a `window`, `document`, `navigator`, `IntersectionObserver`, `Lenis`, `gsap`
  tem de estar atrás de `isPlatformBrowser(this.platformId)` (injectar `PLATFORM_ID`) ou dentro de
  `afterNextRender(() => { ... })` (preferível em Angular 22 — mais idiomático que os antigos
  lifecycle hooks para código browser-only).
- Imagens/vídeos: usar sempre atributos que funcionem sem JS (`<img>`/`<video>` reais com
  `src`/`poster`), o comportamento avançado (lazy activation, connection-aware) é uma **melhoria
  progressiva** por cima do HTML funcional — nunca a única forma de carregar o media.

## Testes (Vitest)

- Manter/actualizar `app.spec.ts` (o texto "Hello, afro_dourado" do teste base tem de ser
  actualizado para refletir o conteúdo real da Home assim que o `<h1>` for substituído pelo Hero).
- Cada componente de `ui/` e `shared/` novo deve ter um spec mínimo (renderiza sem erro, inputs
  obrigatórios aplicados).
- Não é necessário cobertura exaustiva de E2E nesta fase — prioridade é a experiência visual e
  estrutural correcta.
