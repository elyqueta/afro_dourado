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
- [x] `GsapService` (`core/gsap.service.ts`) — regista `ScrollTrigger`, liga Lenis `scroll` → `ScrollTrigger.update()`, `killAllTriggers()`, `refresh()`, `lagSmoothing()`
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
- [x] `PageTransitionComponent` — preloader com logo do footer (`/AfroDourado-logo-transparente.png`)
- [x] `MobileCtaBarComponent`

### Assistente
- [x] `AfroAssistantLauncherComponent`
- [x] `AfroAssistantPanelComponent`

### App shell
- [x] `app.html` composto com: navbar, router-outlet, footer, page-transition, mobile-cta-bar, cursor, assistant launcher/panel, grain-overlay
- [x] `app.ts` inicializa `SmoothScrollService` + `GsapService` (browser-only via `typeof window !== 'undefined'`)
- [x] `app.routes.ts` com lazy loading para todas as rotas
- [x] `app.routes.server.ts` com `RenderMode.Prerender` para páginas estáticas e `RenderMode.Server` para `/agendamento`

### Estado do build
- [x] `npm run build` compila sem erros
- [x] Browser bundles dentro do orçamento (`angular.json`)
- [x] SSR activo (`dist/afro_dourado/server`)
- [x] Prerendered routes: 8 estáticas

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
- [x] Conteúdo realista contextualizado para Angola/Luanda/Huambo (imagens Pexels)
- [ ] Rever animações e reduced motion em cada componente da Home
- [ ] Verificar Definition of Done por secção

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

- Todos os templates de página estão inline nos `.page.ts` (não existem ficheiros `.html` separados em `pages/`).
- O conteúdo pendente está marcado com `[[PENDENTE-CLIENTE]]` e comentário `<!-- TODO: aguardar validação Afro Dourado -->`.
- Imagens via Pexels com parâmetros de otimização (`auto=format&fit=crop&w=...&q=80`).
- `app.ts` usa guarda `typeof window !== 'undefined'` para SSR; `isPlatformBrowser` é preferido nos componentes (ex: `HeroComponent`).
- `VideoBackgroundComponent` em `shared/ui/video-background/` centraliza a lógica de fundo de hero com vídeo + poster, com ativação assíncrona via `IntersectionObserver`.
- Vídeos da web (Pexels) aplicados por página: Home, Tricologia e Tranças usam vídeos diferentes; o carregamento é lazy e só inicia quando o hero entra no viewport.
- Menu mobile/tablet usa `z-index: 9999` e `position: fixed` para garantir que fica por cima de qualquer conteúdo, mesmo com scroll. O scroll é bloqueado enquanto o menu está aberto.
- Preloader usa o mesmo logo do footer (`/AfroDourado-logo-transparente.png`).
