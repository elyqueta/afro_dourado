# 12 — Estado da Implementação

> Documento vivo: actualizar sempre que uma fase/componente for concluída.  
> Baseado em `docs/11-roadmap-de-execucao.md`.

## Fase 1 — Fundação (concluída)

### Design system
- [x] `src/styles.css` com tokens `@theme` (cores, tipografia, spacing, motion, radius, container)
- [x] `@layer base` com escalas tipográficas
- [x] `@layer utilities` (`section-y`, `container-x`, `container-max`)
- [x] `@layer components` com `.grain-overlay`
- [x] `prefers-reduced-motion: reduce` global

### Motion / core services
- [x] `gsap` + `lenis` instalados (`package.json`)
- [x] `SmoothScrollService` (`core/smooth-scroll.service.ts`) — instância única, browser-only, RAF loop, `start/stop/scrollTo/on/destroy`
- [x] `GsapService` (`core/gsap.service.ts`) — regista `ScrollTrigger`, `killAllTriggers()`, `refresh()`, `lagSmoothing()`; `App` liga Lenis `scroll` → `ScrollTrigger.update()` uma única vez
- [x] `ConnectionService` (`core/connection.service.ts`)
- [x] `SeoService` (`core/seo.service.ts`)
- [x] `BookingService` (`core/booking.service.ts`)
- [x] `motion/` utilities: `reveal.ts`, `parallax.ts`, `pin.ts`, `hero-entrance.ts`

### Directivas
- [x] `InViewDirective` (`shared/directives/in-view.directive.ts`)
- [x] `MagneticDirective` (`shared/directives/magnetic.directive.ts`)

### Componentes UI base
- [x] `PillButtonComponent`
- [x] `EyebrowLabelComponent`
- [x] `SectionHeadingComponent`
- [x] `OrganicDividerComponent`
- [x] `AccordionComponent`
- [x] `LightboxComponent`
- [x] `BadgeNumberComponent`
- [x] `AppCursorComponent`

### Media
- [x] `SmartImageComponent`
- [x] `SmartVideoComponent`

### Layout
- [x] `NavbarComponent` — menu mobile/tablet fullscreen com fundo `brand-green-900`, z-index 9999, links centralizados, botão de fechar, animação do hamburger para X, scroll bloqueado enquanto aberto
- [x] `FooterComponent`
- [x] `PageTransitionComponent` — preloader com logo apenas no carregamento inicial; navegações internas não mostram overlay
- [x] `MobileCtaBarComponent`

### Assistente
- [x] `AfroAssistantLauncherComponent`
- [x] `AfroAssistantPanelComponent`
- [x] Modo split (desktop ≥1024px): site redimensionado para 50% via `site-shell` e compensação da scrollbar; painel docked à direita, sem scrim e sem animar largura
- [x] Divisor do assistente ajustável por rato/teclado; colunas mantêm largura mínima, painel preserva a largura enquanto fecha
- [x] Modo full (tablet/mobile <1024px): painel `100dvh`/100% largura, slide-up, `aria-modal="true"`, foco preso e scroll bloqueado via `SmoothScrollService.stop()/start()`
- [x] `AssistantService`: `isSplit` via `matchMedia` com SSR guard, medição da scrollbar e estado CSS global (`data-assistant*`, `--assistant-w`, `--sbw`, `--assistant-viewport-width`)
- [x] `visualViewport` ajusta o painel em ecrã inteiro ao teclado virtual; listeners de viewport e foco são removidos no cleanup
- [x] Mudanças de modo e fim da transição do shell refrescam `ScrollTrigger` e Lenis; scroll do chat é isolado com `data-lenis-prevent`
- [x] Navbar compacta, menu limitado à coluna do site, transição de página/grain limitados ao site e grelhas ajustadas quando docked
- [x] CTA "Agendar" da navbar oculto enquanto o assistente está docked
- [x] Mensagens livres do assistente respondem claramente que a funcionalidade está em desenvolvimento, sem submissão/reload
- [x] Launcher escondido enquanto o assistente está aberto (CSS global)
- [x] `AppCursorComponent` esconde cursor nativo sobre o painel
- [x] `PageTransitionComponent` cobre só a área do site em split
- [x] `MobileCtaBarComponent` escondida enquanto o assistente está aberto
- [x] `prefers-reduced-motion`: layout instantâneo e fade curto, sem slide
- [x] `npm test` passa (10 testes: App, AssistantService e GsapService)
- [x] `npm run build` sem erros nem warnings de orçamento

### Galeria e responsive
- [x] Nova página `/galeria`, com filtros e imagens demonstrativas; links "Ver galeria" e footer apontam para a página
- [x] Footer, Sobre, Resultados e secções de preview usam grelhas compactas quando o assistente está aberto em split
- [x] Selecção da unidade em Contactos e Agendamento apresenta mapa Google aproximado a partir do endereço de demonstração
- [x] Agendamento valida data/período/contactos e apresenta mensagens de orientação
- [x] Animações de reveal deixam o conteúdo visível caso a animação seja interrompida; selector inválido do CTA do Hero foi corrigido
- [x] Correcção do ticker GSAP: desactivar o lag smoothing com limiar de 0 (em vez de 0,016ms), para as animações de entrada e reveals terminarem no tempo previsto
- [x] Galeria: miniaturas abrem lightbox responsiva com navegação, zoom, foco modal e fecho por Escape; overflow horizontal do painel fixo fechado contido na raiz
- [x] Lightbox: imagem ampliada pode ser explorada por arrasto ou trackpad, sem depender da barra de scroll; scrollbar global fina e discreta, mantendo o scroll funcional

### App shell
- [x] `app.html` composto com: navbar, router-outlet, footer, page-transition, mobile-cta-bar, cursor, assistant launcher/panel, grain-overlay
- [x] `app.ts` inicializa `SmoothScrollService` + `GsapService` (browser-only via `typeof window !== 'undefined'`)
- [x] `app.routes.ts` com lazy loading para todas as rotas
- [x] `app.routes.server.ts` com `RenderMode.Prerender` para páginas estáticas e `RenderMode.Server` para `/agendamento`

### Estado do build
- [x] `npm run build` compila sem erros
- [x] Browser bundles dentro do orçamento (`angular.json`)
- [x] SSR activo (`dist/afro_dourado/server`)
- [x] Prerendered routes: 13 estáticas (incluindo `/testemunhos`)

### Testes
- [x] `BeforeAfterImageComponent.spec.ts` — 12 testes passam (criação, estado por defeito, toggle, aria-pressed, alt, chip)
- [x] Test setup com `platformBrowserTesting` em `src/test-setup.ts`

---

## Fase 2 — Home (em execução)

### Página Home
- [x] `HomePage` (`pages/home/home.page.ts`) com template inline
- [x] `HeroComponent` com vídeo Pexels + poster, inputs `videoSrc/posterSrc/eyebrow/headline/description`, sequência `heroEntrance()` + `heroScrollFade()`, cleanup no `ngOnDestroy`
- [x] `BrandStoryRevealComponent`
- [x] `PillarsStickyComponent`
- [x] `TrichologyPreviewComponent`
- [x] `BraidsGalleryPreviewComponent`
- [x] `ProductsPreviewComponent`
- [x] `TeamPreviewComponent`
- [x] `JournalPreviewComponent`
- [x] `BookingCtaComponent`
- [x] `FaqAccordionComponent`
- [x] `TestimonialsPreviewComponent` — secção com carrossel horizontal mobile (scroll-snap), grelha tablet/desktop, 3 cards com efeito Antes/Depois, botão "Ver mais →" para `/testemunhos`
- [x] Conteúdo realista contextualizado para Angola/Luanda/Huambo (imagens Pexels)
- [ ] Rever animações e reduced motion em cada componente da Home
- [ ] Verificar Definition of Done por secção

### Página `/testemunhos` (nova)
- [x] `TestimonialsPage` (`pages/testimonials/testimonials.page.ts`)
  - Hero verde com eyebrow dourado "Testemunhos", título "Histórias de cuidado.", parágrafo `.lead`
  - Mosaico editorial em duas colunas de pares; cada par combina tiles quadrados de imagem e texto, alternando a ordem
  - CTA verde final com `Agendar avaliação` (`secondary-light`)
  - SEO: `SeoService.update()` com title/description próprios
  - Responsivo: mobile e modo split com imagem horizontal sobre o texto; desktop com quatro tiles por fila através de dois pares lado a lado
- [x] Rota `testemunhos` em `app.routes.ts` e `app.routes.server.ts` (`Prerender`)
- [x] Navbar + footer: link "Testemunhos" adicionado; duplicado "Artigos" removido do menu mobile
- [ ] `/resultados` permanece inalterada

### Componentes partilhados (testemunhos)
- [x] `BeforeAfterImageComponent` (`shared/ui/before-after-image/`)
  - Duas `<img>` empilhadas com crossfade por `opacity` (`--duration-ui`, `--ease-out-3`)
  - Estado `showBefore` interno, por defeito `false` (mostra "Depois")
  - Desktop: `mouseenter`/`mouseleave` + `focus-within`; touch/teclado: segmented control "Antes | Depois" sempre visível
  - Modo comparação nos testemunhos: slider divisório arrastável, com suporte a toque/teclado e etiquetas persistentes
  - Etiqueta "Imagens ilustrativas" posicionada separadamente no canto inferior para não se sobrepor a "Antes"
  - Chip canto inferior esquerdo com estado atual
  - `prefers-reduced-motion`: troca instantânea, sem transição
- [x] `TestimonialCardComponent` (`shared/ui/testimonial-card/`) — card vertical com `app-before-after-image`, nome, cargo, citação (clamp 4 linhas), link "Ler mais →"; hover `translateY(-4px)` desktop, desligado em reduced motion
- [x] `TestimonialPairComponent` (`shared/ui/testimonial-pair/`) — tiles de imagem e texto com mini-strip "Antes | Depois"; alternância de ordem por input de layout
- [x] `TESTIMONIALS` dados partilhados (`core/testimonials.data.ts`) — 4 itens com fotos Pexels distintas antes/depois

---

## Fase 3 — Páginas internas institucionais (concluída)

| Página | Estado |
|--------|--------|
| `/tricologia` | Concluída — hero editorial com `VideoBackgroundComponent`, lista de tratamentos com badges + detalhes expandíveis, CTA sticky desktop + mobile |
| `/trancas-estetica` | Concluída — hero fullscreen com `VideoBackgroundComponent`, galeria grid, secções de técnica/manutenção, CTA BookingCta |
| `/produtos` | Concluída — hero editorial, grid produtos, secção rotina de uso, CTA BookingCta |
| `/sobre` | Concluída — abertura editorial, secções origem/valores/espaços, link para /equipa |
| `/equipa` | Concluída — grid fotográfico, 5 membros com nome/cargo/bio, CTA BookingCta |

---

## Fase 4 — Journal, Contactos, Agendamento (concluída)

| Página/Fluxo | Estado |
|--------------|--------|
| `/journal` | Concluída — artigo em destaque + grid dos restantes, via `JournalService` |
| `/journal/:slug` | Concluída — artigo dinâmico por slug, conteúdo dividido por parágrafos, artigos relacionados |
| `/contactos` | Concluída — abertura editorial, `LocationPickerComponent` com dados demo Luanda/Huambo, CTA BookingCta |
| `/agendamento` | Concluída — fluxo multi-step (6 passos), barra de progresso, resumo final, modal de confirmação com WhatsApp |
| `BookingService` | Estado global do fluxo com signals (`step`, `data`, `canGoBack`, `canGoNext`, `isLastStep`) |
| `JournalService` | Dados estáticos de artigos (3 artigos), `featured()`, `rest()`, `bySlug()` |
| `FaqAccordionComponent` | Componente criado, alimentado com 5 perguntas demo na Home |

### Media
- [x] `SmartImageComponent`
- [x] `SmartVideoComponent`
- [x] `VideoBackgroundComponent` — componente reutilizável para fundo de hero com vídeo + poster, entrada assíncrona via `IntersectionObserver` (lazy ativado quando entra no viewport). Usado em Home, Tricologia e Tranças.

### Notas
- O fluxo de agendamento usa `BookingService` para estado global e um `local` signal para estado local do componente.
- Dados sensíveis (preços, morada exacta, horários) mantêm-se como `[[PENDENTE-CLIENTE]]` onde aplicável.
- Confirmação de pedido simula sucesso e redireciona para WhatsApp como plano B.
- Vídeos da web (Pexels) foram removidos da Home. O fundo de hero agora usa apenas poster/imagem, com `VideoBackgroundComponent` pronto para receber vídeo local quando disponível.
- `VideoBackgroundComponent` está aplicado em Home, Tricologia e Tranças, garantindo comportamento consistente de carregamento assíncrono.

---

## Fase 5 — Polimento (pendente)

- [ ] Rever `RenderMode` por rota em `app.routes.server.ts`
- [ ] Rever SEO por página (`SeoService` aplicado em cada `pages/*`)
- [ ] Rever acessibilidade (checklist `docs/09`)
- [ ] Rever performance (Lighthouse mobile ≥90 nas páginas principais)
- [ ] Rever `prefers-reduced-motion` em todas as animações
- [ ] Rever responsividade nos breakpoints

---

## Fase 6 — Deploy (pendente)

- [ ] Seguir `docs/10-deploy-vercel.md`
- [ ] Validar preview deploy
- [ ] Promover para produção

---

## Notas técnicas

- Os estados globais do painel/navbar/page transition ficam em `src/styles.css`: selectores `html[data-assistant]` em folhas encapsuladas Angular não alcançam o elemento `<html>`.
- `site-shell` anima `margin-right` apenas para redimensionar o site durante o modo docked; scrollbar e menu de foco seguem visíveis/funcionais sem scrim no desktop.
- O `App` é o único ponto de integração Lenis → ScrollTrigger; secções e Hero não registam listeners adicionais de scroll.
- O mapa usa resultados aproximados do Google Maps com endereços de demonstração; substituir pelos endereços validados antes do lançamento.
- Todos os templates de página estão inline nos `.page.ts` (não existem ficheiros `.html` separados em `pages/`).
- O conteúdo pendente está marcado com `[[PENDENTE-CLIENTE]]` e comentário `<!-- TODO: aguardar validação Afro Dourado -->`.
- Imagens via Pexels com parâmetros de otimização (`auto=format&fit=crop&w=...&q=80`).
- `app.ts` usa guarda `typeof window !== 'undefined'` para SSR; `isPlatformBrowser` é preferido nos componentes (ex: `HeroComponent`).
- `VideoBackgroundComponent` em `shared/ui/video-background/` centraliza a lógica de fundo de hero com vídeo + poster, com ativação assíncrona via `IntersectionObserver`.
- Vídeos da web (Pexels) aplicados por página: Home, Tricologia e Tranças usam vídeos diferentes; o carregamento é lazy e só inicia quando o hero entra no viewport.
- Menu mobile/tablet usa `z-index: 9999` e `position: fixed` para garantir que fica por cima de qualquer conteúdo, mesmo com scroll. O scroll é bloqueado enquanto o menu está aberto.
- Preloader usa o mesmo logo do footer (`/AfroDourado-logo-transparente.png`).

---

## Entrega — Assistente split-screen / full-screen

### Ficheiros alterados (entrega assistente + testemunhos)

| Ficheiro | Alteração principal |
||---|---|
| `src/app/core/assistant.service.ts` | Novos signals `isSplit`/`sbw`; `matchMedia` browser-only com cleanup via `DestroyRef`; escrita de `data-assistant*`/`--assistant-w` no `document.documentElement` |
| `src/app/assistant/afro-assistant-panel/afro-assistant-panel.component.ts` | Suporte split/full, `SmoothScrollService.stop()/start()` só em full, foco preso em full, `visualViewport` para teclado virtual, scroll automático |
| `src/app/assistant/afro-assistant-panel/afro-assistant-panel.component.html` | Estrutura com `.panel-shell` + overlay (só em full) |
| `src/app/assistant/afro-assistant-panel/afro-assistant-panel.component.css` | CSS de split/full, `transform` slide, `visibility`+`inert` (via HTML), `prefers-reduced-motion` |
| `src/app/assistant/afro-assistant-launcher/afro-assistant-launcher.component.ts` | CSS: escondido quando `html[data-assistant='open']` |
| `src/app/app.ts` | `ScrollTrigger.refresh()` + `lenis.resize()` em navegação e mudança de estado do assistente; `runInInjectionContext` para `effect()` |
| `src/app/app.html` | `.site-shell` envolve navbar/main/footer; painel/launcher/cursor/overlays fora do shell |
| `src/app/app.css` | `.site-shell` com `margin-right` animado via `--assistant-w`/`--sbw` |
| `src/styles.css` | Tokens `--assistant-w/open/close`; `.grain-overlay` com `right` em split; regras de `display: none` para launcher/CTA; `scrollbar-width: none` em split; estilos globais para header/chips/messages/bubbles/input do painel |
| `src/app/layout/navbar/navbar.component.ts` | `right: var(--assistant-w)`; override split para compact (logo + CTA + hamburger); mobile menu com `right: var(--assistant-w)`; link "Testemunhos" adicionado; duplicado "Artigos" removido |
| `src/app/layout/page-transition/page-transition.component.ts` | `right: var(--assistant-w)` em split para cobrir só a área do site |
| `src/app/shared/ui/cursor/app-cursor.component.ts` | Classe `.hidden` quando o rato está sobre `.panel-shell` |
| `src/app/layout/cta-bar-mobile/cta-bar-mobile.component.ts` | Escondido via CSS quando `html[data-assistant='open']` |
| `src/app/app.spec.ts` | Polyfills inline (`matchMedia`, `requestAnimationFrame`, `ResizeObserver`) + router testing imports |
| `src/app/core/assistant.service.spec.ts` | 6 testes para API e atributos `data-assistant*` |
| `vitest.config.ts` | Alias `@app` para resolução em testes; `globals: true` |
| `src/test-setup.ts` | Polyfills globais + `TestBed.initTestEnvironment` com `BrowserTestingModule` e `platformBrowserTesting()` |
| **`src/app/core/testimonials.data.ts`** | **Array `TESTIMONIALS` com 4 testemunhos de demonstração, fotos Pexels antes/depois** |
| **`src/app/shared/ui/before-after-image/before-after-image.component.ts`** | **Efeito Antes/Depois com crossfade por opacity, chip, segmented control, `prefers-reduced-motion`, `forceState` input** |
| **`src/app/shared/ui/testimonial-card/testimonial-card.component.ts`** | **Card vertical: imagem com before/after, nome, cargo, citação clamp 4 linhas, link "Ler mais →", hover translateY** |
| **`src/app/shared/ui/testimonial-pair/testimonial-pair.component.ts`** | **Par imagem+texto com mini-strip sincronizado, inversão de ordem via CSS `direction: rtl` em pares pares desktop** |
| **`src/app/sections/testimonials-preview/testimonials-preview.component.ts`** | **Secção Home: carrossel mobile (scroll-snap), grelha tablet/desktop, revealStagger no scroll** |
| **`src/app/pages/testimonials/testimonials.page.ts`** | **Página `/testemunhos`: hero verde, mosaico 4×2, CTA final verde, SEO via `SeoService.update()`** |
| **`src/app/shared/ui/before-after-image/before-after-image.component.spec.ts`** | **12 testes: criação, estado por defeito, toggle, aria-pressed, alt, chip, active state** |
| `src/app/app.routes.ts` | Rota `testemunhos` adicionada |
| `src/app/app.routes.server.ts` | `RenderMode.Prerender` para `/testemunhos` |
| `src/app/pages/home/home.page.ts` | `<app-testimonials-preview>` inserido entre `<app-artigos-preview>` e `<app-booking-cta>` |
| `src/app/layout/footer/footer.component.ts` | Link "Testemunhos" adicionado na navegação "Explorar" |

### Estado do build/test
- `npm run build` compila sem erros e sem warnings de orçamento.
- `npx vitest run` — 12/12 testes do `BeforeAfterImageComponent` passam.
