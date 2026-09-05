# 01 — Identidade de Marca (leitura do logótipo)

> Base: ficheiro de logótipo fornecido (`Afro Dourado — "NATURAL É VIDA!"`).
> Estes valores são uma **extracção visual do logótipo enviado**, para servir de fundação imediata
> ao design system. Se a AfroDourado fornecer um manual de marca oficial (o PDF de requisitos pede
> o ficheiro vectorial SVG/EPS/PDF do logótipo), estes tokens devem ser actualizados sem alterar a
> estrutura do design system (ver `docs/02-design-system.md`).

## Leitura do logótipo

- **Símbolo**: silhueta de perfil de mulher com cabelo afro (volume redondo, denso), em verde
  profundo sólido, integrada num "C"/círculo aberto que sugere ciclo/cuidado/comunidade.
- **Elemento decorativo**: um traço orgânico dourado enrolado (tipo videira/caule), com pequenas
  folhas e "corações" dourados pendurados — remete a natureza, crescimento orgânico, delicadeza.
  Este motivo (linha orgânica dourada com folha) é um **asset de marca reutilizável** para
  separadores de secção, bullets, ícones decorativos (ver `docs/02-design-system.md` → "Motivo
  orgânico").
- **Três barras verticais douradas** paralelas ao símbolo — elemento gráfico geométrico, contraste
  proposital com a linha orgânica. Pode inspirar detalhes de grid/separadores rectos no site
  (ex.: barras finas douradas em transições de secção, linha de progresso de scroll).
- **Wordmark**: "Afro" em verde profundo, "Dourado" em dourado — serifado geométrico moderno, com
  hastes largas e cantos suavemente arredondados. Peso forte (bold/black).
- **Tagline**: "NATURAL É VIDA!" em verde, letras maiúsculas, tracking largo, peso mais leve que o
  wordmark — usar este padrão (wordmark forte + tagline leve com tracking) em todo o site para
  eyebrows/labels.

## Paleta (extraída do logótipo)

Usar como tokens CSS (`@theme` no Tailwind v4 — ver `docs/02-design-system.md`).

| Token | Hex aproximado | Uso |
|---|---|---|
| `--color-brand-green-900` | `#0E3B31` | Verde profundo principal (símbolo, wordmark "Afro", fundos imersivos — ex. secção Tricologia) |
| `--color-brand-green-700` | `#164F42` | Verde secundário, hovers, gradientes subtis sobre o verde 900 |
| `--color-brand-gold-500` | `#C7A24B` | Dourado principal (wordmark "Dourado", acentos, linhas, CTAs secundários) |
| `--color-brand-gold-300` | `#DFC383` | Dourado claro (hover de dourado sobre fundo escuro, texto dourado sobre verde) |
| `--color-cream-50` | `#F7F3EC` | Fundo claro principal (secções editoriais, cards) — nunca branco puro |
| `--color-white` | `#FFFFFF` | Fundos de produto/imagem isolada, nunca fundo de secção de texto longo |
| `--color-ink-900` | `#101410` | "Preto suave" para texto em fundo claro (nunca `#000`) |

**Regra de uso do dourado**: acento, nunca fundo dominante de secção inteira (linhas, ícones,
texto em destaque, bordas finas, CTA secundário/outline). Fundos dominantes: verde profundo
(secções imersivas/clínicas) ou creme/branco (secções editoriais/produto).

> ⚠️ Estes hex são uma aproximação de trabalho. Antes do lançamento, confirmar valores exactos
> com o ficheiro vectorial oficial da marca (pedido no PDF de requisitos, secção "Logótipo").

## Tipografia (direcção, ver `docs/02-design-system.md` para tokens finais)

- **Display/Heading** (headlines editoriais, "Natural é vida.", títulos de secção): serifada com
  carácter — `Cormorant Garamond` ou `Instrument Serif` (Google Fonts, gratuitas e próximas da
  sensação do wordmark do logótipo).
- **Interface/Body** (parágrafos, navegação, formulários, UI): geométrica humanista —
  `Manrope` ou `Geist` (Google Fonts).
- Não usar mais de 2 famílias no site inteiro.

## Tom de voz

- Português de Portugal/Angola, directo, caloroso, nunca clínico-frio nem "vendedor" agressivo.
- Frases curtas e declarativas nas headlines ("Natural é vida.", "O teu cabelo conta uma
  história."). Nunca abrir uma página institucional com "Somos uma clínica que...".
- Nunca fazer alegações médicas/clínicas definitivas ("cura", "elimina", "garante") — usar
  linguagem de cuidado e acompanhamento ("Para uma avaliação adequada, fale com a nossa equipa.").

## Motivo orgânico (asset reutilizável)

Extrair/recriar em SVG um traço fino orgânico dourado com 1–2 folhas, inspirado no elemento do
logótipo, para usar como:
- separador de secção (fino, subtil, opacidade baixa);
- elemento decorativo perto de headlines (nunca centrado a competir com o texto);
- acento em states de loading inicial (ver `docs/03-motion-system.md`).

Nunca usar como padrão repetido em background tipo wallpaper — mantém-se um detalhe editorial raro.
