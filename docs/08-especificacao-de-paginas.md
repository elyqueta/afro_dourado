# 08 — Especificação de Páginas (secção a secção)

> Referências cruzadas: componentes em `docs/05-biblioteca-de-componentes.md`, motion em
> `docs/03-motion-system.md`, conteúdo em `docs/07-mapa-do-site-e-conteudo.md`.

## Home (`/`)

### 1. Hero (`HeroComponent`, fullscreen ~100svh)
- Fundo: `SmartVideoComponent` (vídeo cinematográfico — cabelo natural/mãos/ambiente, ver
  `docs/06-media-e-assets.md`) com `poster` de alta qualidade.
- Sequência de entrada (`heroEntrance()`, ver motion doc): máscara a revelar o fundo → fundo em
  scale 1.05→1 → logótipo → headline por linhas (stagger) → descrição → CTAs → elementos
  decorativos (ex. `OrganicDividerComponent` num canto), cada etapa com atraso — nunca tudo junto.
- Ao fazer scroll (`heroScrollFade()`): vídeo com zoom ligeiro, headline funde, imagem desloca-se
  verticalmente, CTA desaparece suavemente. Curva de referência: 0% scroll = scale 1.00/opacity 1;
  30% = scale 1.04/opacity 0.7; 60% = scale 1.08/opacity 0. Não exagerar o parallax.
- Navbar transparente sobreposta ao Hero (ver `NavbarComponent`).

### 2. "O cuidado começa aqui" (`BrandStoryRevealComponent`)
- Fundo claro (`cream-50`). Texto grande com reveal por palavras ao scroll (`textRevealByWords`),
  algumas palavras em `brand-gold-500`. Pequenas linhas orgânicas decorativas. Fotografia entra
  lateralmente (translateX + fade) quando a secção entra no viewport.
- Evitar velocidade de reveal por palavra demasiado rápida (stagger 0.05–0.09s por palavra).

### 3. Três Pilares (`PillarsStickyComponent`)
- `position: sticky` com imagem fixa à esquerda/direita (alternar por breakpoint se necessário) e
  conteúdo textual dos 3 pilares a mudar conforme o `ScrollTrigger` avança (pin da secção enquanto
  os 3 estados avançam). **Não** implementar como 3 cards em grid estático.
- Mobile: cai para scroll normal com 3 blocos sequenciais (sem pin, por ser difícil de fazer bem em
  ecrãs pequenos) — cada bloco com a sua própria imagem e reveal simples.

### 4. Preview Tricologia (`TrichologyPreviewComponent`)
- Fundo verde profundo (antecipa a identidade visual da página interna). Fotografia macro,
  headline curta, link `Ver Tricologia →`.

### 5. Preview Tranças (`BraidsGalleryPreviewComponent`)
- Mini-galeria horizontal (3–4 imagens) com leve overflow para sugerir "arrasta para ver mais" —
  liga para a galeria completa na página interna.

### 6. Preview Produtos (`ProductsPreviewComponent`)
- Fundo claro, 2–3 produtos em destaque, estética de campanha de cosmética (fundo limpo, sombra
  suave).

### 7. Preview Equipa (`TeamPreviewComponent`)
- 3–4 fotografias grandes, hover revela nome/especialidade (desktop); mobile mostra sempre a
  legenda sob a foto.

### 8. Preview Journal (`JournalPreviewComponent`)
- 1 artigo em destaque (imagem grande) + 2 secundários.

### 9. `BookingCtaComponent`
- Headline curta de conversão + CTA primário + secundário WhatsApp.

### 10. `FooterComponent`

## Tricologia (`/tricologia`)

1. Hero editorial (imagem/vídeo macro), headline `Compreender o cabelo é o primeiro passo para
   cuidar dele.`, fundo verde profundo.
2. Lista de tratamentos com `BadgeNumberComponent` (01–04). Desktop: hover revela imagem
   correspondente + título aumenta + linha horizontal anima + número desloca-se + descrição
   aparece, em sequência hierárquica (hover → imagem → título → descrição, nunca tudo ao mesmo
   tempo). Cursor muda para `VER` sobre a linha do tratamento (`AppCursorComponent`).
   Mobile: `AccordionComponent` (tap para expandir), sem depender de hover.
3. Bloco por tratamento (ao expandir/página de detalhe se necessário): problema, abordagem,
   benefícios, processo, duração, preparação, cuidados posteriores, CTA.
4. CTA persistente: desktop botão fixo/sticky `Agendar avaliação`; mobile `MobileCtaBarComponent`.

## Tranças & Estética (`/trancas-estetica`)

1. Hero fullscreen fotográfico, tipografia editorial, headline `O teu cabelo. A tua expressão.`
2. Galeria horizontal controlada por scroll vertical (`pinSection` + translateX, `scrub: true`):
   imagens com escalas diferentes, algumas com rotação ligeira, texto intercalado entre imagens.
   Cursor `DRAG` sobre a galeria (desktop). Mobile: `overflow-x: auto` com `scroll-snap`, sem GSAP
   pin (mais previsível em touch).
3. Cada item pode abrir `LightboxComponent`: thumbnail expande para imagem fullscreen (view
   transition), navegação por setas, título, fechar com `Escape`, swipe em mobile.
4. CTA de fecho de secção → `/agendamento`.

## Produtos Naturais (`/produtos`)

1. Hero de produto isolado, fundo limpo (`cream-50`/branco), sombra suave, micro-movimento
   (ex. leve float/parallax do produto).
2. Grid editorial (não grid e-commerce genérico): cards com hover → produto aumenta ligeiramente,
   fotografia secundária aparece (crossfade), nome entra, CTA aparece.
3. Ao clicar num produto → reveal de detalhe (pode ser um painel lateral/expansão in-page em vez de
   nova rota, dado o baixo número de produtos inicial): imagem expande, benefícios, modo de
   utilização, CTA. Conteúdo `[[PENDENTE-CLIENTE]]` conforme `docs/07`.

## Sobre Nós (`/sobre`)

1. Abertura com frase forte (ver `docs/07`), imagem grande de contexto.
2. Blocos sequenciais: origem, filosofia, equipa (link para `/equipa`), espaços, valores, evolução
   — usar mistura de imagens grandes, 1–2 números/estatística (se validados, senão omitir — nunca
   inventar números), frases curtas, timeline simples (linha vertical com marcos), transições
   suaves de reveal (sem pin necessário aqui, é mais uma leitura longa e calma).

## Equipa (`/equipa`)

1. Grid de fotografias grandes (2–3 colunas desktop, 1 mobile). Hover (desktop): imagem tem leve
   zoom/crossfade, nome e especialidade aparecem sobre um véu escuro sutil na base da foto. Mobile:
   legenda sempre visível.
2. Ao clicar → perfil (modal ou secção expandida): nome, formação, certificações, especialidades,
   mini-biografia.

## Journal (`/journal` e `/journal/:slug`)

- Listagem: 1 artigo em destaque grande + grid dos restantes. Hover: imagem desloca (parallax
  leve), título sobe, categoria aparece.
- Artigo: tipografia editorial de leitura longa (`font-display` para título, `font-sans` para
  corpo, largura de coluna confortável ~65-75ch), imagem de capa grande, partilha social simples,
  bloco de "artigos relacionados" no fim, `BookingCtaComponent` no fim.

## Contactos / Unidades (`/contactos`)

1. `Escolha a sua unidade` → `LocationPickerComponent` (Luanda / Huambo).
2. Ao escolher: morada, horário, telefone, WhatsApp, mapa (embed simples — usar um mapa estático
   ou iframe leve, carregado apenas ao entrar em viewport para não pesar o LCP), CTA de
   agendamento.

## Sistema de Agendamento (`/agendamento`)

- `BookingFlowComponent` — um passo de cada vez, barra de progresso fina dourada no topo, botão
  "Voltar" discreto em cada passo (excepto o primeiro). Ver fluxo completo em `docs/07` e
  componentes em `docs/05`.
- Ecrã final de confirmação: mensagem de sucesso + resumo + opção de contacto directo via WhatsApp
  como plano B (visto que a submissão real ainda não tem backend definido — `[[PENDENTE-INTEGRACAO]]`).

## Estados globais em todas as páginas internas

- Navbar **não** transparente (fundo sólido desde o topo) — só a Home tem o Hero fullscreen que
  justifica a navbar transparente inicial.
- `PageTransitionComponent` em todas as navegações.
- `MobileCtaBarComponent` sempre presente em mobile, excepto dentro do próprio fluxo de
  agendamento (onde o CTA é o próprio fluxo) e dentro de modais/lightbox abertos.
- `AfroAssistantLauncherComponent` presente em todas as páginas.
