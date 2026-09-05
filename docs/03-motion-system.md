# 03 — Sistema de Movimento (Lenis + GSAP + Angular)

## Princípio de arquitectura

> Não transformar tudo numa animação GSAP.

| Tipo de animação | Ferramenta |
|---|---|
| Hover, focus, pequenos estados (botões, ícones, menus) | CSS transitions (tokens `--duration-micro`, `--ease-out-3`) |
| Estados de componente simples (abrir/fechar accordion, toggle) | CSS + Angular `@if`/`[class]` bindings, ou Framer Motion **apenas** se o componente for isolado e beneficiar de spring physics |
| Animações complexas ligadas ao scroll (reveal, parallax, pin de secção) | GSAP + `ScrollTrigger` |
| Smooth scrolling global | **Lenis**, uma única instância |
| Lazy loading / activação de conteúdo ao entrar no viewport | `IntersectionObserver` nativo (via um directive Angular `appInView`) |

## Instalação

```bash
npm install gsap lenis
```

`gsap` core + `ScrollTrigger` plugin (`gsap/ScrollTrigger`). Registar o plugin uma única vez num
serviço central (`GsapService` ou directamente no `SmoothScrollService`), nunca em cada componente.

## Velocidades e easing (tokens — replicam `docs/02-design-system.md`)

```
Microinteracções        150–300ms   → var(--duration-micro) ≈ 220ms
Transições de interface 400–700ms   → var(--duration-ui) ≈ 550ms
Cinematográficas         800–1600ms → var(--duration-cinematic) ≈ 1200ms
```

Easings GSAP preferidos: `power2.out`, `power3.out`, `power4.out`, `expo.out`, `circ.out`.
Movimentos orgânicos/duplos: `power3.inOut`, `expo.inOut`. **Nunca `linear`** em movimento
principal (aceitável apenas em barras de progresso lineares/contadores).

## Smooth Scroll — arquitectura Angular

Criar um único serviço `SmoothScrollService` (`providedIn: 'root'`), instanciado **uma vez** no
`AppComponent`, guardado com `isPlatformBrowser` (nunca correr Lenis no servidor SSR).

Responsabilidades:
1. Inicializar `Lenis` no `AppComponent.ngAfterViewInit` (browser only).
2. Ligar o `requestAnimationFrame` loop do Lenis ao `gsap.ticker` (`lenis.on('scroll', ScrollTrigger.update)`
   e `gsap.ticker.add((time) => lenis.raf(time * 1000))`), desactivando o "lag smoothing" do GSAP
   ticker (`gsap.ticker.lagSmoothing(0)`) — este é o padrão oficial de integração Lenis+GSAP.
3. Expor `stop()` / `start()` para bloquear scroll (ex.: menu mobile fullscreen aberto, lightbox
   aberto) sem usar `overflow: hidden` no body (evita o bug de "scroll bloqueado após navegação"
   mencionado na direcção criativa).
4. No evento de navegação do Angular Router (`NavigationEnd`):
   - `ScrollTrigger.getAll().forEach(t => t.kill())` (limpar triggers antigos)
   - `lenis.scrollTo(0, { immediate: true })` (restaurar topo)
   - após o novo componente renderizar (usar `afterNextRender` ou um pequeno `setTimeout(0)`),
     `ScrollTrigger.refresh()`.
5. Nunca instanciar Lenis dentro de um componente de secção — apenas consumir `stop()/start()` via
   injecção do serviço quando necessário (modais).

## Directiva `appInView` (IntersectionObserver)

Directiva standalone que adiciona uma classe (`in-view`) ou emite um `output()` quando o elemento
entra no viewport (threshold configurável, `once` por padrão). Usada para:
- activar lazy-load de vídeo/imagem pesada;
- disparar entrada de conteúdo simples sem GSAP (fade+translate via CSS, ver classe utilitária
  `@utility reveal` em `docs/02-design-system.md` se aplicável).

## Padrões de animação (biblioteca de "receitas" GSAP)

Documentar/implementar como funções utilitárias em `src/app/motion/` (ver
`docs/04-arquitectura-angular.md`):

- `revealUp(el, { delay })` — `opacity: 0, y: 24` → `opacity: 1, y: 0`, `duration: var(--duration-ui)`, `power3.out`.
- `revealStagger(els, { stagger })` — igual, com `stagger: 0.08–0.12s`, usado em listas/headlines por palavra.
- `textRevealByWords(el)` — parte o texto em `<span>` por palavra (usar `SplitText`-like manual, já
  que `SplitText` é plugin pago; alternativa: dividir por `textContent.split(' ')` e envolver cada
  palavra num `<span class="inline-block overflow-hidden">` com um filho translateY) — usado na
  secção "O cuidado começa aqui" (ver `docs/08-especificacao-de-paginas.md`).
- `imageParallax(el, { speed })` — `ScrollTrigger` com `scrub: true`, translateY proporcional.
- `pinSection(el, { pinSpacing })` — usado nos "Três Pilares" (sticky com conteúdo a mudar) e na
  galeria horizontal de Tranças (scroll vertical → translateX horizontal, `scrub: true`).
- `heroEntrance()` — timeline sequencial: fundo (mask/scale 1.05→1) → logo/brand → headline
  (stagger por linha) → descrição → CTA → elementos decorativos, cada etapa com pequeno atraso
  (nunca tudo simultâneo — ver `docs/08-especificacao-de-paginas.md` § Hero).
- `heroScrollFade()` — scrub ligado ao scroll: scale 1.00→1.08 e opacity 1→0 dos 0% aos 60% da
  altura do hero (ver curva de exemplo no doc criativo original).

Todas estas funções devem:
- aceitar um `ElementRef`/`HTMLElement` nativo (não manipular Angular templates directamente);
- verificar `prefers-reduced-motion` no início e, se activo, aplicar o estado final imediatamente
  sem animação (sem passos intermédios, sem timeline);
- ser chamadas a partir de `afterNextRender`/`ngAfterViewInit` com guarda de `isPlatformBrowser`.

## Cleanup obrigatório

Todo o componente que cria um `ScrollTrigger`, timeline GSAP, ou listener manual **tem de** limpar
no `ngOnDestroy` (`trigger.kill()`, `timeline.kill()`, remover listeners). Isto é crítico em SPA
com router — timelines órfãs são a causa nº1 de bugs de scroll "colado"/duplicado mencionados na
direcção criativa.

## Page transitions

Ver `docs/05-biblioteca-de-componentes.md` → `PageTransitionComponent`. Duração alvo 600–1000ms,
overlay `brand-green-900` + logótipo, nunca bloqueando a navegação Angular em si (o overlay é
puramente visual, sobreposto — a rota já mudou por baixo).

## Reduced motion — checklist por componente

- [ ] Parallax desactivado (elemento fica na posição final estática)
- [ ] Hero entrance vira fade simples (sem scale/stagger)
- [ ] Page transition vira crossfade curto (sem overlay+logo)
- [ ] Cursor personalizado desactivado
- [ ] Scroll horizontal da galeria de tranças cai para scroll/swipe nativo
