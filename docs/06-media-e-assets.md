# 06 — Media e Assets (imagens e vídeo da web)

## Contexto

A AfroDourado ainda não entregou material fotográfico/vídeo próprio (ver PDF de requisitos —
"Solicitação de Materiais", secção 2: logótipo, fotos de equipa, espaço físico, portfólio de
tranças e produtos são pedidos **à clínica**, com prazo de entrega e termo de autorização de
imagem). Até esse material chegar, o site deve usar **imagens e vídeos gratuitos e livres de
direitos da web**, escolhidos para comunicar a direcção criativa (cabelo afro natural, texturas,
mãos, produtos naturais, ambiente wellness verde/dourado), e **nunca** apresentados como sendo da
equipa/instalações reais da AfroDourado.

## Fontes aprovadas (gratuitas, licença permite uso comercial sem atribuição obrigatória)

- **Imagens**: [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com)
- **Vídeo**: [Pexels Video](https://www.pexels.com/videos/), [Coverr](https://coverr.co),
  [Mixkit Video](https://mixkit.co/free-stock-video/)

Não usar bancos que exigem conta/pagamento (Shutterstock, Getty, Adobe Stock) nem extrair imagens
de sites de concorrentes/redes sociais de terceiros.

## Termos de pesquisa recomendados (por secção)

| Secção | Termos de pesquisa (EN funciona melhor nestes bancos) |
|---|---|
| Hero / Home | `natural afro hair woman`, `curly hair care hands`, `afro hair salon`, `black woman natural hair closeup` |
| Tricologia | `hair scalp closeup science`, `trichology clinic`, `hair care microscope`, `dermatology clinic green` |
| Tranças & Estética | `box braids`, `african braids hairstyle`, `braiding hair salon`, `protective hairstyle` |
| Produtos Naturais | `natural hair oil bottle`, `shampoo bottle white background`, `natural cosmetics flatlay`, `hair product texture` |
| Sobre Nós | `wellness clinic interior`, `salon reception green`, `hands care closeup` |
| Equipa | `professional portrait salon`, `hairstylist portrait natural light` — evitar poses tipo LinkedIn corporativo genérico, preferir enquadramentos mais editoriais/naturais |
| Journal | variar conforme o tema do artigo (queda capilar, hidratação, tranças, produtos) |

## Regras de escolha de imagem/vídeo

- Preferir **luz natural**, pele e cabelo com textura real, mãos, detalhes — nunca still de banco
  genérico "modelo sorridente a olhar para a câmara em fundo branco".
  descartar pistas visuais que "não pareçam a marca").
- Evitar imagens com marca d'água, texto embutido, ou elementos gráficos de outra marca visível.
- Vídeo do Hero: procurar clipes curtos (5–15s), em loop natural, sem cortes bruscos, resolução
  mínima 1920×1080, preferencialmente já em formato paisagem 16:9 ou 21:9.
- Sempre que uma imagem representar "a equipa" ou "as instalações", adicionar um comentário no
  código: `<!-- Imagem stock temporária — substituir por fotografia real da AfroDourado -->`.

## Componente `SmartImageComponent`

Ficheiro: `src/app/media/smart-image/`.

Responsabilidades:
- `<img>` real (nunca `background-image` para conteúdo, apenas para efeitos puramente
  decorativos), com `alt` **obrigatório** (erro de compilação/lint se ausente).
- `loading="lazy"` por padrão; `input<boolean>('priority')` remove o lazy loading e adiciona
  `fetchpriority="high"` para a imagem LCP (tipicamente a do Hero).
- `input<string>('sizes')` e `srcset` — se a imagem vier de Unsplash/Pexels, usar os parâmetros de
  redimensionamento da própria URL (`?auto=format&fit=crop&w=...&q=80` no caso Unsplash) para gerar
  2–3 larguras.
- `aspectRatio` via CSS `aspect-ratio` para reservar espaço e evitar CLS.
- Formatos: preferir `format=avif`/`format=webp` quando a fonte suportar via query params; caso
  contrário aceitar JPEG optimizado.

## Componente `SmartVideoComponent`

Ficheiro: `src/app/media/smart-video/`.

Estados (`signal<'idle'|'loading'|'ready'|'playing'|'paused'|'error'>`):
- Renderiza sempre `poster` (imagem optimizada) imediatamente — nunca esperar o vídeo para mostrar
  algo.
- `<video autoplay muted loop playsinline preload="metadata">` — nunca `preload="auto"` em vídeos
  do hero.
- **Connection-aware**: injectar `ConnectionService` (wrapper de `navigator.connection`); em
  `effectiveType` `'2g'`/`'slow-2g'` ou `saveData === true`, não iniciar o `<video>` — mostrar
  apenas o poster estático.
- **Viewport-aware**: usar `InViewDirective`; iniciar o carregamento (`video.load()`/`play()`)
  apenas quando o vídeo se aproxima do viewport (para vídeos abaixo da dobra); pausar quando sai
  significativamente do viewport, retomar ao voltar (excepto se o utilizador tiver pausado
  manualmente — guardar essa intenção num signal `userPaused`).
- Fallback de erro: se o vídeo falhar a carregar, manter o poster e não mostrar controlos quebrados.
- `prefers-reduced-motion: reduce` → nunca autoplay; mostrar poster + botão de play manual.

## Optimização geral

- Todas as imagens estáticas de marca (logótipo, texturas, ícones) ficam em `public/` (já
  configurado em `angular.json` → `assets: [{ glob: '**/*', input: 'public' }]`), em SVG sempre
  que possível.
- Nunca importar imagens directamente no bundle JS/TS — usar caminhos para `public/` ou URLs
  externas dos bancos de imagem.
- Vídeo do Hero: mobile deve receber uma versão mais leve/curta ou apenas o poster, conforme
  `ConnectionService` e `matchMedia('(max-width: 767px)')`.
