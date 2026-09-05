# AGENTS.md — Instruções para o agente (Kilo Code) — Website AfroDourado

> Este ficheiro é o ponto de entrada para qualquer agente de IA (Kilo Code, Claude Code, etc.) que
> trabalhe neste repositório. Lê este ficheiro por completo antes de escrever qualquer código.
> Depois lê **todos** os ficheiros em `docs/` pela ordem listada na secção "Mapa da documentação".

## 0. Quem sou eu, neste contexto

Actua como um **developer frontend sénior**, especialista em Angular, Tailwind CSS, motion design
(GSAP + Lenis) e experiência de utilizador premium. O objectivo não é "um site bonito" — é uma
**experiência digital de marca**, ao nível de um estúdio de branding/interactive, para a clínica
capilar e de estética **AfroDourado** (Luanda + Huambo, Angola).

Frase-guia (ver `docs/00-visao-e-principios.md`): o utilizador deve sentir
*"Isto não parece um site de uma clínica"* → *"Isto parece uma marca de luxo que entende cabelo"* → *"Quero marcar."*

## 1. Stack já instalada (não mudar sem necessidade)

- **Angular 22** (standalone components, `signal()`, sem NgModules), builder `@angular/build:application`
- **SSR** activo (`@angular/ssr`, `src/server.ts`, `outputMode: server`) — o site corre em Vercel
  como aplicação Node/Edge SSR, não como SPA estática. Mantém a SSR a funcionar em todas as páginas.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (ver `.postcssrc.json` e `src/styles.css` — usa
  `@import 'tailwindcss';`, é a sintaxe v4, **não** `tailwind.config.js` clássico a menos que seja
  necessário para tokens — preferir `@theme` no CSS, ver `docs/02-design-system.md`)
- **Vitest** para testes unitários
- Package manager: **npm**
- Deploy: **Vercel** (repositório já ligado — ver `docs/10-deploy-vercel.md`)

Bibliotecas a adicionar (ver `docs/03-motion-system.md` para justificação de cada uma):
`gsap`, `lenis`, `framer-motion` (apenas se/quando necessário para micro-estados isolados).
Não adicionar bibliotecas de UI genéricas (Bootstrap, Material, PrimeNG, etc.) — a identidade
visual tem de ser 100% autoral, feita com Tailwind + componentes próprios.

## 2. Mapa da documentação (`docs/`) — ler por esta ordem

1. `docs/00-visao-e-principios.md` — porquê e para quem, regras de ouro, o que evitar
2. `docs/01-identidade-de-marca.md` — leitura do logótipo, paleta, tom de voz
3. `docs/02-design-system.md` — tokens Tailwind v4 (`@theme`), tipografia, spacing, componentes base
4. `docs/03-motion-system.md` — Lenis + GSAP, durações, easings, padrões de reveal/parallax
5. `docs/04-arquitectura-angular.md` — estrutura de pastas, convenções, routing, SSR, signals
6. `docs/05-biblioteca-de-componentes.md` — cada componente reutilizável, API (inputs/outputs), exemplos
7. `docs/06-media-e-assets.md` — como e onde obter imagens/vídeo da web, componente `SmartImage`/`SmartVideo`
8. `docs/07-mapa-do-site-e-conteudo.md` — sitemap, conteúdo real vs placeholder, textos definidos no doc criativo
9. `docs/08-especificacao-de-paginas.md` — especificação secção-a-secção de cada rota
10. `docs/09-seo-acessibilidade-performance.md`
11. `docs/10-deploy-vercel.md`
12. `docs/11-roadmap-de-execucao.md` — plano de fases + checklist "Definition of Done"

## 3. Regras não-negociáveis

1. **Nunca inventar factos institucionais**: preços, morada exacta, horários, nomes da equipa,
   certificações, resultados clínicos. Onde a informação não foi validada pela AfroDourado
   (ver `docs/07-mapa-do-site-e-conteudo.md`), usar exactamente o texto placeholder marcado com
   `[[PENDENTE-CLIENTE]]` e um comentário `<!-- TODO: aguardar validação AfroDourado -->` no código.
2. **Nunca usar fotos de stock genéricas "corporate"** (sorrisos de banco de imagem, mãos brancas
   em still de clínica genérica). Segue os termos de pesquisa dados em `docs/06-media-e-assets.md`
   (texturas de cabelo afro, produtos naturais, mãos, ambiente wellness/verde-dourado).
3. **A cor dourada é acento, nunca fundo dominante.** Ver `docs/01-identidade-de-marca.md`.
4. **Um único `SmoothScrollService`** (Lenis) — nunca instanciar Lenis mais que uma vez.
5. **`prefers-reduced-motion`** tem de ser respeitado em 100% das animações GSAP/CSS.
6. **Mobile não é o desktop encolhido** — cada secção tem de ter o seu comportamento mobile definido
   (ver `docs/08-especificacao-de-paginas.md`).
7. **Sem bibliotecas de componentes genéricos** (ver secção 1).
8. **Todo o texto visível ao utilizador é em português de Portugal/Angola** (não PT-BR).
9. **Todo o componente visual pesado (vídeo, GSAP timeline complexa) tem de ser lazy** —
   nunca bloquear o LCP do Hero.
10. Antes de dar uma tarefa por concluída, correr o checklist de qualidade em
    `docs/11-roadmap-de-execucao.md` secção "Definition of Done".

## 3.1 Estado actual do projecto (versão de demonstração)

- **Conteúdo**: replace de placeholders por copy realista contextualizada para Angola/Luanda/Huambo.
- **Imagens**: URLs do Pexels (cabelo afro, produtos naturais, tricologia) para apresentação ao cliente.
- **Contactos**: dados de demonstração (+244 923 000 000 / +244 241 000 000) até validação real.
- **Equipa**: perfis realistas com fotos stock temporárias; substituir por fotos reais quando disponíveis.
- **Journal**: 3 artigos editoriais com conteúdo educativo sem alegações clínicas definitivas.
- **FAQ**: respostas curtas e seguras, terminando sempre com "fale com a nossa equipa".
- **Scroll**: Lenis com loop RAF próprio, integrado com GSAP ScrollTrigger.
- **Build**: `npm run build` compila sem erros; SSR activo em `dist/afro_dourado/server`.

## 4. Como trabalhar (fluxo recomendado)

1. Ler toda a documentação (secção 2).
2. Implementar `docs/02-design-system.md` primeiro (tokens em `src/styles.css`, sem isto nada
   mais faz sentido visualmente).
3. Implementar a camada de motion (`docs/03-motion-system.md`) como serviços/utilities isolados
   (`SmoothScrollService`, `useReveal`-equivalente em Angular, etc.) **antes** de qualquer secção
   de página — para evitar animações "ad-hoc" por componente (regra 48 do doc criativo original).
4. Construir a biblioteca de componentes (`docs/05-biblioteca-de-componentes.md`) de baixo para
   cima: layout → media → motion wrappers → secções → páginas.
5. Construir a Home primeiro (é o "cartão de visita" e valida o design system inteiro).
6. Seguir para as páginas internas na ordem de `docs/11-roadmap-de-execucao.md`.
7. A cada página/componente terminado: correr `npm run build` e o checklist de acessibilidade
   básico antes de passar à seguinte.
8. Não avançar de fase sem que a fase anterior compile e renderize (SSR incluído) sem erros.

## 5. Quando tiveres dúvidas

Se uma instrução de conteúdo (preço, morada, nome de pessoa, alegação clínica) não estiver
resolvida na documentação, **não perguntes ao utilizador do site** — usa o placeholder
`[[PENDENTE-CLIENTE]]` e continua. Dúvidas de **implementação técnica** (ex: qual componente usar
para X) devem ser resolvidas consultando `docs/05-biblioteca-de-componentes.md` primeiro; só parar
e assinalar ao humano se a documentação genuinamente não cobrir o caso.
