# 05 — Biblioteca de Componentes

> Cada componente listado deve viver na pasta indicada em `docs/04-arquitectura-angular.md`.
> API descrita com `input()`/`output()` (Angular 22 signals). Todos usam `OnPush`.

## Layout

### `NavbarComponent` (`layout/navbar`)

- `input<boolean>('transparentAtTop')` — por padrão `true` na Home, `false` em páginas internas
  (fundo sólido desde o início nas páginas internas, ver `docs/08-especificacao-de-paginas.md`).
- Estado interno: `scrolled = signal(false)` via listener de scroll (Lenis `on('scroll')`), altura
  passa de `96px` → `72px`, fundo `transparent` → `cream-50/90` com `backdrop-blur` subtil.
- Desktop: logo à esquerda, links ao centro, CTA "Agendar" à direita.
- Mobile: logo + botão de menu (hamburger com animação de morph para "X"). Abre
  `MobileMenuOverlayComponent` fullscreen (fundo `brand-green-900`, links grandes, CTA).
- Sempre `role="navigation"`, links reais (`routerLink`), foco visível.

### `FooterComponent` (`layout/footer`)

- Estrutura exacta da secção 24 do documento criativo original: coluna marca (logótipo + tagline),
  "Explorar" (links de página), "Unidades" (Luanda/Huambo), "Contactos" (WhatsApp/Telefone/Email),
  CTA "Agendar atendimento".
- Conteúdo de contacto vem de `docs/07-mapa-do-site-e-conteudo.md` (placeholders até validação).

### `PageTransitionComponent` (`layout/page-transition`)

- Escuta `Router` events; no `NavigationStart` mostra overlay `brand-green-900` com logótipo a
  fade-in, no `NavigationEnd` (+ pequeno delay mínimo para não parecer um "flash") fade-out.
- Ver timing em `docs/03-motion-system.md`.

### `MobileCtaBarComponent` (`layout/cta-bar-mobile`)

- Fixo no fundo, apenas mobile (`hidden lg:hidden` / `flex lg:hidden`), dois botões:
  "Agendar atendimento" (primário) e ícone WhatsApp (secundário, link `https://wa.me/244XXXXXXXXX`
  — placeholder até validação do número).
- Esconde-se automaticamente quando um modal/lightbox/menu está aberto.

## Media

### `SmartImageComponent` (`media/smart-image`)

Ver especificação completa em `docs/06-media-e-assets.md`. Inputs: `src`, `alt` (obrigatório),
`priority` (boolean, desliga lazy loading para imagens LCP), `aspectRatio`, `sizes`.

### `SmartVideoComponent` (`media/smart-video`)

Ver especificação completa em `docs/06-media-e-assets.md`. Máquina de estados
`idle | loading | ready | playing | paused | error` como `signal`.

## UI genérico

### `PillButtonComponent` (`shared/ui/button`)

- `variant: input<'primary' | 'secondary'>('primary')`
- `size: input<'md' | 'lg'>('md')`
- Renderiza `<a>` se `href` for passado, senão `<button>`. Nunca `<div>` clicável.

### `EyebrowLabelComponent` (`shared/ui/eyebrow-label`)

- Pequeno label maiúsculo com tracking largo (`Afro Dourado`, `01`, `TRICOLOGIA`), cor configurável
  (`ink` | `gold` | `cream`).

### `SectionHeadingComponent` (`shared/ui/section-heading`)

- `eyebrow?`, `title` (suporta `<span class="text-brand-gold-500">` inline via `innerHTML` seguro
  ou via `input<{ text: string; gold?: boolean }[]>` para permitir palavras douradas dentro do
  título sem `innerHTML` — preferir esta segunda abordagem por segurança/SSR).

### `OrganicDividerComponent` (`shared/ui/divider-organic`)

- Renderiza o motivo orgânico dourado (ver `docs/01-identidade-de-marca.md`) como SVG inline,
  `aria-hidden="true"`.

### `AccordionComponent` (`shared/ui/accordion`)

- Usado no FAQ (secção 22) e em conteúdo mobile sem hover (tratamentos, secção 11 mobile).
- Animação de altura via `grid-template-rows: 0fr → 1fr` (técnica CSS moderna, sem GSAP), conteúdo
  interno com fade+translate curto. Ícone `+`/`×` minimalista a rodar 45°.
- Totalmente acessível: `<button aria-expanded>` a controlar `<div role="region">`.

### `LightboxComponent` (`shared/ui/lightbox`)

- Usado na galeria de tranças (secção 14). Abre a partir da miniatura clicada (`view transition`
  nativa do browser se suportada — `document.startViewTransition`, com fallback GSAP FLIP-like
  simples se não suportada). Navegação por setas, `Escape` fecha, swipe em mobile.
- Bloqueia o scroll via `SmoothScrollService.stop()` enquanto aberto.

### `BadgeNumberComponent` (`shared/ui/badge-number`)

- Número grande estilo editorial (`01`, `02`, `03`, `04`) usado na secção de Tricologia (secção 10).

### `AppCursorComponent` (`shared/ui/cursor`)

Ver `docs/02-design-system.md` § 7.

## Directivas

### `InViewDirective` (`shared/directives/in-view.directive.ts`)

- Selector `[appInView]`. `output<void>('enter')`, `input<boolean>('once', true)`,
  `input<number>('threshold', 0.2)`.

### `MagneticDirective` (`shared/directives/magnetic.directive.ts`)

- Selector `[appMagnetic]`. Desktop only (`matchMedia('(pointer: fine)')`). Desloca ligeiramente o
  elemento (CTA) na direcção do cursor dentro de um raio, com `power2.out` e retorno à posição
  original no `mouseleave`.

## Secções (blocos de página, `sections/`)

### `HeroComponent`

Ver especificação completa secção-a-secção em `docs/08-especificacao-de-paginas.md` § Home/Hero.
Inputs: `videoSrc?`, `posterSrc`, `eyebrow`, `headline`, `description`, `ctaPrimary`, `ctaSecondary`.

### `BrandStoryRevealComponent`

Text reveal por palavras + fotografia lateral (secção 08 do doc original).

### `PillarsStickyComponent`

Layout sticky com imagem fixa e conteúdo textual dos 3 pilares a mudar conforme o scroll
(`ScrollTrigger` com `pin: true`). **Não** implementar como 3 cards em grid — ver
`docs/08-especificacao-de-paginas.md`.

### `TrichologyPreviewComponent`, `BraidsGalleryPreviewComponent`, `ProductsPreviewComponent`,

`TeamPreviewComponent`, `JournalPreviewComponent`
Blocos de preview usados na Home, cada um faz link para a respectiva página interna. Reutilizam
`SectionHeadingComponent` + `SmartImageComponent`/`SmartVideoComponent`.

### `BookingCtaComponent`

Bloco de conversão reutilizável (Home + fim de páginas internas) — headline curta + `PillButtonComponent`.

### `FaqAccordionComponent`

Wrapper de `AccordionComponent` com dados de FAQ (ver `docs/07-mapa-do-site-e-conteudo.md`).

### `LocationPickerComponent`

Usado em Contactos e no Passo 3 do agendamento — dois botões grandes "LUANDA" / "HUAMBO", ao
seleccionar mostra morada/horário/telefone/mapa/CTA daquela unidade (dados em
`docs/07-mapa-do-site-e-conteudo.md`).

## Agendamento (`booking/`)

### `BookingFlowComponent`

Orquestra os 5 passos via `BookingService` (signal `step`). Nunca mostrar todos os passos ao mesmo
tempo — um passo de cada vez, com barra de progresso fina (dourada) no topo do fluxo.

1. `BookingStepServiceComponent` — "O que procura?" (Tricologia / Tranças & Estética / Outro)
2. (dentro do mesmo componente ou um novo) "Qual serviço?" — lista depende da escolha do passo 1
3. `BookingStepUnitComponent` — "Onde?" (reutiliza `LocationPickerComponent` em modo compacto)
4. `BookingStepDatetimeComponent` — "Quando?" (calendário simples + slots, sem biblioteca pesada —
   implementar um componente leve próprio; nesta fase pode ser apenas selecção de data + período
   do dia, sem integração real de disponibilidade, marcado como `[[PENDENTE-INTEGRACAO]]`)
5. `BookingStepContactComponent` — nome, telefone/WhatsApp, email opcional
6. `BookingSummaryComponent` — resumo + "Confirmar pedido" (submete para
   `[[PENDENTE-INTEGRACAO]]` — endpoint/serviço de submissão a definir pela Afro Dourado; até lá,
   simular sucesso e mostrar ecrã de confirmação com instrução para contacto via WhatsApp como
   plano B)

## Assistente (`assistant/`)

### `AfroAssistantLauncherComponent`

Botão discreto flutuante, canto inferior (coordenado com `MobileCtaBarComponent` para não
sobrepor em mobile — noutra margem/z-index).

### `AfroAssistantPanelComponent`

Painel com opções rápidas (secção 21 do doc original: "Tenho queda capilar", "Quero cuidar do meu
cabelo", "Quero fazer tranças", "Quero conhecer os produtos", "Quero marcar atendimento").
Nesta fase, sem backend de IA/RAG real (isso é um projecto à parte, mencionado no PDF de
requisitos como Fase 3 futura) — implementar como **FAQ guiado por botões** que mostra respostas
pré-escritas da base de conhecimento validada (ver `docs/07-mapa-do-site-e-conteudo.md`), nunca
gerar respostas livres nem inventar informação. Terminar sempre com CTA "Agendar avaliação" ou
"Falar com a nossa equipa".
