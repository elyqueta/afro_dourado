# 09 — SEO, Acessibilidade e Performance

## SEO

- `SeoService` (`core/seo.service.ts`) — wrapper fino sobre `Meta`/`Title` do Angular, chamado no
  `ngOnInit`/`afterNextRender` de cada `pages/*`. Cada página define:
  - `title` (único, com termo SEO relevante — ver tabela em `docs/07-mapa-do-site-e-conteudo.md`)
  - `description` (150–160 caracteres)
  - Open Graph: `og:title`, `og:description`, `og:image` (imagem de partilha por página),
    `og:type`, `og:url`
  - `<link rel="canonical">` apontando para o URL final de produção
- Estrutura de headings correcta por página: **um único `<h1>`** por página (o Hero/headline
  principal), `<h2>` para títulos de secção, nunca saltar níveis.
- URLs legíveis já cobertas pelo sitemap (`docs/07`) — manter em kebab-case, sem parâmetros
  desnecessários.
- Considerar `JSON-LD` (`schema.org/LocalBusiness` ou `MedicalBusiness`/`HealthAndBeautyBusiness`)
  na página de Contactos, uma vez confirmados os dados reais das unidades — até lá, **não**
  publicar dados estruturados com moradas placeholder (evitar confundir motores de busca).
- `sitemap.xml` e `robots.txt` em `public/` a gerar/actualizar antes do lançamento.

## Acessibilidade

Checklist obrigatório por componente interactivo:
- [ ] Contraste de texto ≥ 4.5:1 (verificar especialmente texto dourado sobre creme e verde sobre
      creme — pode ser necessário um tom de dourado ligeiramente mais escuro para texto de corpo,
      mantendo o `gold-500` claro apenas para elementos gráficos/grandes).
- [ ] Navegável por teclado (Tab/Shift+Tab, Enter/Space a activar, Escape a fechar modais/menu).
- [ ] `:focus-visible` com outline visível em `brand-gold-500` (nunca `outline: none` sem
      substituto).
- [ ] `aria-label` em botões apenas com ícone (menu, fechar, setas de navegação).
- [ ] `alt` descritivo em todas as imagens de conteúdo; `alt=""` apenas em imagens puramente
      decorativas (com `role="presentation"`/`aria-hidden`).
- [ ] Vídeo do Hero não é o único portador de informação — headline/CTA funcionam sem o vídeo
      carregar.
- [ ] Nenhuma interacção depende **apenas** de `:hover` (sempre um equivalente por tap/foco).
- [ ] Animação nunca esconde permanentemente conteúdo necessário para compreensão — funciona com
      `prefers-reduced-motion` sem perda de informação (ver checklist em
      `docs/03-motion-system.md`).
- [ ] Formulário de agendamento com labels reais associadas (`<label for>`), mensagens de erro
      anunciadas (`aria-live="polite"` numa região de erro), navegação por teclado entre os passos.

## Performance

### Orçamentos já definidos em `angular.json` (não baixar sem motivo)
```
initial:            warning 500kB / error 1MB
anyComponentStyle:  warning 4kB / error 8kB
```
Manter GSAP/Lenis fora do bundle inicial sempre que possível — considerar `import()` dinâmico do
`GsapService`/`SmoothScrollService` a partir de `AppComponent` (browser only, depois do primeiro
paint) para não penalizar o TTI da rota inicial.

### Imagens
- AVIF/WebP via parâmetros da própria URL do banco de imagens (ver `docs/06`) sempre que possível.
- `loading="lazy"` por padrão (excepto imagem LCP — ver `SmartImageComponent`).
- `aspect-ratio` reservado sempre, para eliminar CLS.

### Vídeo
- Nunca mais que 1 vídeo autoplay a decorrer simultaneamente na viewport.
- `preload="metadata"` no Hero, nunca `auto`.
- Pausar vídeos fora do viewport (ver `SmartVideoComponent`).

### JS
- Rotas lazy (`loadComponent`, já especificado em `docs/04`).
- Nenhuma dependência pesada carregada em páginas que não a usam (ex.: lógica da galeria
  horizontal só carrega na rota de Tranças).
- Evitar animar `width`/`height`/`top`/`left`/`margin`/`padding` — usar sempre `transform`
  (`translate3d`) e `opacity` (ver `docs/03-motion-system.md`).

### Checklist de performance antes de dar uma fase por concluída
- [ ] `npm run build` sem warnings de orçamento excedido
- [ ] Nenhum `ScrollTrigger`/timeline órfã (todos os componentes limpam no `ngOnDestroy`)
- [ ] Lighthouse (local, modo mobile) ≥ 90 em Performance e Acessibilidade nas páginas principais
      (Home, Tricologia, Agendamento) antes do lançamento — não é bloqueante durante o
      desenvolvimento inicial, mas é o alvo final.
