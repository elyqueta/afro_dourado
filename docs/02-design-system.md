# 02 — Design System (Tailwind CSS v4)

> O projecto já usa Tailwind v4 (`@import 'tailwindcss';` em `src/styles.css`, plugin
> `@tailwindcss/postcss`). Em v4 os tokens definem-se em CSS com `@theme`, **não** em
> `tailwind.config.js`. Usa este método — é o idiomático da versão instalada.

## 1. `src/styles.css` — base de tokens

```css
@import 'tailwindcss';

@theme {
  /* Cor — ver docs/01-identidade-de-marca.md */
  --color-brand-green-900: #0E3B31;
  --color-brand-green-700: #164F42;
  --color-brand-gold-500: #C7A24B;
  --color-brand-gold-300: #DFC383;
  --color-cream-50: #F7F3EC;
  --color-ink-900: #101410;

  /* Tipografia */
  --font-display: "Instrument Serif", "Cormorant Garamond", serif;
  --font-sans: "Manrope", "Geist", ui-sans-serif, system-ui, sans-serif;

  /* Escala tipográfica fluida (clamp) */
  --text-display-xl: clamp(3rem, 2rem + 5vw, 7rem);
  --text-display-l: clamp(2.25rem, 1.6rem + 3.2vw, 4.5rem);
  --text-display-m: clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem);
  --text-heading: clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem);
  --text-body: 1.0625rem;
  --text-small: 0.9375rem;
  --text-caption: 0.75rem;

  /* Spacing de secção (respirar) */
  --space-section-y: clamp(4rem, 3rem + 5vw, 9rem);
  --space-container-x: clamp(1.25rem, 1rem + 3vw, 5rem);

  /* Motion durations/easing tokens — espelham docs/03-motion-system.md */
  --ease-out-3: cubic-bezier(0.22, 1, 0.36, 1);   /* power3.out equivalente */
  --ease-out-4: cubic-bezier(0.16, 1, 0.3, 1);    /* power4.out / expo.out equivalente */
  --duration-micro: 220ms;
  --duration-ui: 550ms;
  --duration-cinematic: 1200ms;

  /* Radius */
  --radius-card: 0.5rem;
  --radius-pill: 999px;

  /* Container widths */
  --container-max: 1440px;
}

html {
  scroll-behavior: auto; /* Lenis controla o scroll suave, não o CSS nativo */
}

body {
  background-color: var(--color-cream-50);
  color: var(--color-ink-900);
  font-family: var(--font-sans);
}

/* Grain/textura subtil global — ver secção 6 */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url('/textures/grain.svg');
  background-size: 220px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Depois de definir os tokens, usar as classes utilitárias geradas automaticamente pelo Tailwind v4
(ex.: `text-display-xl`, `font-display`, `bg-brand-green-900`, `text-brand-gold-500`,
`py-[var(--space-section-y)]` ou, preferencialmente, criar utilitárias semânticas com `@utility`
quando o padrão se repetir (ex.: `@utility section-y { padding-block: var(--space-section-y); }`).

## 2. Escala de espaçamento e grid

- Container principal: `max-width: var(--container-max)`, padding horizontal
  `var(--space-container-x)`, centrado.
- Grid de 12 colunas em desktop (`lg:grid-cols-12`), 4 colunas em mobile.
- Espaço vertical entre secções: sempre `var(--space-section-y)` — nunca valores ad-hoc por secção
  (consistência de ritmo vertical é o que faz o site "respirar" como pedido no doc criativo).

## 3. Sistema tipográfico

```
Display XL  → var(--text-display-xl)  font-display  → Hero headline
Display L   → var(--text-display-l)   font-display  → Título de secção grande
Display M   → var(--text-display-m)   font-display  → Sub-título editorial
Heading     → var(--text-heading)     font-sans/bold → título de card/serviço
Body        → var(--text-body)        font-sans      → parágrafo
Small       → var(--text-small)       font-sans      → legendas, meta info
Caption     → var(--text-caption)     font-sans uppercase tracking-widest → eyebrow labels (ex. "AFRODOURADO", "01")
```

Regras:
- Títulos grandes (`Display *`) usam sempre `font-display` (serifada) — nunca a sans na hierarquia
  de destaque, para não perder o carácter editorial.
- `line-height` generoso em display (`leading-[1.05]` a `leading-[1.15]`), nunca `leading-none`
  agressivo em blocos de várias linhas.
- Palavras de destaque dentro de headlines (ver secção "O cuidado começa aqui" em
  `docs/08-especificacao-de-paginas.md`) ficam em `text-brand-gold-500`, nunca sublinhadas.

## 4. Botões e CTAs

Dois estilos apenas (não criar variantes extra sem necessidade):

- **Primário** (`Agendar atendimento`): pill (`rounded-[var(--radius-pill)]`), fundo
  `brand-green-900`, texto creme, hover: fundo `brand-gold-500` + texto `ink-900`, transição
  `var(--duration-micro)` com `var(--ease-out-3)`.
- **Secundário/outline** (`Falar com a AfroDourado`, `Descobrir a AfroDourado`): borda 1px
  `brand-gold-500`, texto herda cor do fundo, hover: preenche fundo com opacidade baixa de dourado.

CTA global mobile: barra fixa inferior, `safe-area-inset-bottom`, fundo `brand-green-900`,
sempre visível excepto dentro de modais/lightbox.

## 5. Cards e superfícies

- **Nunca** cards com sombra genérica tipo Bootstrap (`shadow-md` default). Preferir:
  - borda fina 1px em `brand-green-900/10` sobre fundo creme, ou
  - elevação por contraste de fundo (card branco sobre fundo creme), com sombra muito suave e
    difusa (`shadow-[0_20px_60px_-30px_rgba(14,59,49,0.25)]`).
- `radius-card` consistente em todos os cards (`0.5rem` — cantos quase rectos, editorial, não
  "app móvel" com `rounded-2xl` em tudo).
- Os "três pilares" (Tricologia / Tranças / Produtos) **não** devem ser 3 cards idênticos — ver
  `docs/08-especificacao-de-paginas.md` secção Home § Pilares (layout sticky assimétrico).

## 6. Grain / textura

- Ficheiro `public/textures/grain.svg` (ruído SVG `feTurbulence`, gerar programaticamente ou
  incluir um padrão de ruído estático leve). Aplicado via `.grain-overlay` fixo, opacidade ≤0.04.
  Deve ser praticamente imperceptível — testar em light e dark backgrounds.

## 7. Cursor personalizado (desktop only)

Componente `AppCursorComponent` (ver `docs/05-biblioteca-de-componentes.md`), desactivado em
`(pointer: coarse)` / mobile. Estados: `default` (círculo pequeno), `view` (sobre imagens),
`open` (sobre CTAs), `drag` (sobre galerias horizontais). Nunca alterar `cursor: none` no body
inteiro sem fallback — garantir que continua acessível se o componente falhar (SSR guard).

## 8. Ícones

Usar **lucide** (via `lucide-angular` ou SVGs inline próprios) apenas para ícones utilitários
(fechar, seta, menu, WhatsApp). Nunca usar ícones para representar os "pilares" de forma genérica
(seringa, tesoura clip-art) — usar fotografia/tipografia em vez de iconografia clínica clichê.
