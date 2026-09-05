# 08 — Especificação de Páginas (secção a secção)

> Referências cruzadas: componentes em `docs/05-biblioteca-de-componentes.md`, motion em
> `docs/03-motion-system.md`, conteúdo em `docs/07-mapa-do-site-e-conteudo.md`.

## Home (`/`)

### 1. Hero (`HeroComponent`, fullscreen ~100svh)
- Fundo: vídeo/imagem cinematográfica com poster de alta qualidade.
- Sequência de entrada (`heroEntrance()`): fundo → logótipo → headline por linhas (stagger) → descrição → CTAs → elementos decorativos.
- Scroll fade: escala ligeira + fade da headline/CTA.
- Navbar transparente sobreposta ao Hero.

### 2. "O cuidado começa aqui" (`BrandStoryRevealComponent`)
- Texto grande com reveal ao scroll, palavras douradas. Fotografia entra lateralmente.

### 3. Três Pilares (`PillarsStickyComponent`)
- Layout sticky com imagem fixa e conteúdo textual dos 3 pilares.
- Mobile: 3 blocos sequenciais com reveal simples.

### 4. Preview Tricologia (`TrichologyPreviewComponent`)
- Fundo verde profundo, fotografia macro, headline curta, link `Ver Tricologia →`.

### 5. Preview Tranças (`BraidsGalleryPreviewComponent`)
- Mini-galeria horizontal com 3–4 imagens.

### 6. Preview Produtos (`ProductsPreviewComponent`)
- Fundo claro, 2–3 produtos em destaque.

### 7. Preview Equipa (`TeamPreviewComponent`)
- 3 fotografias grandes com nome e cargo.

### 8. Preview Journal (`JournalPreviewComponent`)
- 1 artigo em destaque + 2 secundários.

### 9. `BookingCtaComponent`
- Headline curta + CTA primário + secundário WhatsApp.

### 10. `FooterComponent`

## Tricologia (`/tricologia`)

1. Hero editorial (fotografia macro), headline `Compreender o cabelo é o primeiro passo para cuidar dele.`, fundo verde profundo.
2. Lista de tratamentos com `BadgeNumberComponent` (01–04). Desktop: hover revela imagem correspondente + título aumenta + descrição aparece. Mobile: lista expandível.
3. Cada tratamento: problema, abordagem, benefícios, processo, duração, preparação, cuidados posteriores, CTA.
4. CTA persistente: desktop botão fixo/sticky `Agendar avaliação`; mobile `MobileCtaBarComponent`.

## Tranças & Estética (`/trancas-estetica`)

1. Hero fullscreen fotográfico, tipografia editorial, headline `O teu cabelo. A tua expressão.`
2. Galeria com imagens de demonstração.
3. CTA de fecho de secção → `/agendamento`.

## Produtos Naturais (`/produtos`)

1. Hero de produto isolado, fundo limpo.
2. Grid editorial com 3 produtos em destaque: nome, benefícios, modo de utilização e CTA.
3. Conteúdo realista para demonstração.

## Sobre Nós (`/sobre`)

1. Abertura com frase forte, imagem grande de contexto.
2. Blocos sequenciais: origem, filosofia, valores, espaços, equipa (link para `/equipa`).

## Equipa (`/equipa`)

1. Grid de fotografias grandes (2–3 colunas desktop, 1 mobile). Nome, cargo e biografia curta.
2. Dados realistas para demonstração.

## Journal (`/journal` e `/journal/:slug`)

- Listagem: 1 artigo em destaque + grid dos restantes.
- Artigo: tipografia editorial de leitura longa, imagem de capa grande, bloco de "artigos relacionados" no fim.

## Contactos / Unidades (`/contactos`)

1. `Escolha a sua unidade` → `LocationPickerComponent` (Luanda / Huambo).
2. Ao escolher: morada, horário, telefone, CTA de agendamento.

## Sistema de Agendamento (`/agendamento`)

- `BookingFlowComponent` — um passo de cada vez, barra de progresso fina dourada no topo.
- Ecrã final de confirmação: mensagem de sucesso + resumo + opção de contacto directo via WhatsApp.

## Estados globais em todas as páginas internas

- Navbar **não** transparente (fundo sólido desde o topo) — só a Home tem o Hero fullscreen que
  justifica a navbar transparente inicial.
- `PageTransitionComponent` em todas as navegações.
- `MobileCtaBarComponent` sempre presente em mobile, excepto dentro do próprio fluxo de
  agendamento (onde o CTA é o próprio fluxo) e dentro de modais/lightbox abertos.
- `AfroAssistantLauncherComponent` presente em todas as páginas.
