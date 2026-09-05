# 11 — Roadmap de Execução

> Plano de fases pensado para execução por um agente autónomo (Kilo Code). Cada fase deve compilar
> e renderizar (incluindo SSR) antes de avançar para a seguinte. Referências: `docs/00`–`docs/10`.

## Fase 1 — Fundação
- [ ] Configurar tokens em `src/styles.css` (`docs/02-design-system.md`)
- [ ] Instalar `gsap` e `lenis`
- [ ] Criar `SmoothScrollService`, `GsapService`, `motion/*` utilities (`docs/03`)
- [ ] Criar `InViewDirective`, `MagneticDirective`
- [ ] Criar componentes base de `shared/ui/`: `PillButtonComponent`, `EyebrowLabelComponent`,
      `SectionHeadingComponent`, `OrganicDividerComponent`, `AccordionComponent`,
      `BadgeNumberComponent`, `AppCursorComponent`, `LightboxComponent`
- [ ] Criar `SmartImageComponent`, `SmartVideoComponent`, `ConnectionService`
- [ ] Criar `NavbarComponent`, `FooterComponent`, `PageTransitionComponent`,
      `MobileCtaBarComponent`
- [ ] Actualizar `app.ts`/`app.html` para compor layout base (navbar + router-outlet + footer +
      page transition + cursor + cta bar mobile + grain overlay), remover o `<h1>` placeholder
- [ ] Actualizar `app.spec.ts` para refletir o novo conteúdo

## Fase 2 — Home
- [ ] `HeroComponent` completo (vídeo/poster, entrada em sequência, scroll fade)
- [ ] `BrandStoryRevealComponent` (text reveal por palavras)
- [ ] `PillarsStickyComponent`
- [ ] Previews: Tricologia, Tranças, Produtos, Equipa, Journal
- [ ] `BookingCtaComponent`
- [ ] `HomePage` compõe tudo, `SeoService` configurado
- [ ] `AfroAssistantLauncherComponent` + `AfroAssistantPanelComponent` (FAQ guiado, sem IA real)

## Fase 3 — Páginas internas institucionais
- [ ] `/tricologia` completa (`docs/08`)
- [ ] `/trancas-estetica` completa, incluindo galeria horizontal + lightbox
- [ ] `/produtos` completa
- [ ] `/sobre` completa
- [ ] `/equipa` completa

## Fase 4 — Journal, Contactos, Agendamento
- [ ] `/journal` + `/journal/:slug`
- [ ] `/contactos` com `LocationPickerComponent`
- [ ] `BookingFlowComponent` completo (5 passos + resumo + confirmação)
- [ ] `FaqAccordionComponent` alimentado com as perguntas de `docs/07`

## Fase 5 — Polimento
- [ ] Rever todos os `RenderMode` em `app.routes.server.ts`
- [ ] Rever SEO por página (`docs/09`)
- [ ] Rever acessibilidade (checklist `docs/09`)
- [ ] Rever performance (orçamentos, lazy loading, cleanup de ScrollTrigger)
- [ ] Rever `prefers-reduced-motion` em todas as animações
- [ ] Rever responsividade nos breakpoints de `docs/02` (320/375/390/430/768/1024/1280/1440/1920)
- [ ] Confirmar que todo o conteúdo `[[PENDENTE-CLIENTE]]` está claramente assinalado e nenhuma
      informação foi inventada como definitiva

## Fase 6 — Deploy
- [ ] Seguir `docs/10-deploy-vercel.md`
- [ ] Validar preview deploy em desktop + mobile
- [ ] Promover para produção

---

## Definition of Done (aplicar a cada componente/página antes de marcar como concluído)

### Visual
- [ ] Parece AfroDourado (paleta/tipografia de `docs/01`–`02`), não um template genérico
- [ ] Nenhum dos itens da lista "o que evitar" de `docs/00` está presente
- [ ] Ritmo vertical consistente (`--space-section-y`)

### UX / Conteúdo
- [ ] Responde às 3 perguntas de `docs/00` (o que é / porque confiar / como começo)
- [ ] CTA de agendamento acessível em ≤2 scrolls em qualquer página
- [ ] Conteúdo pendente claramente assinalado, nunca inventado como facto

### Motion
- [ ] Cada animação cumpre uma função da "regra de ouro" (`docs/00`)
- [ ] `prefers-reduced-motion` respeitado
- [ ] Sem timelines/ScrollTriggers órfãs (cleanup em `ngOnDestroy`)
- [ ] Nada de `linear` easing em movimento principal

### Técnico
- [ ] `OnPush` + signals
- [ ] SSR não quebra (nenhum acesso directo a `window`/`document` fora de guardas de browser)
- [ ] `npm run build` sem erros/warnings de orçamento
- [ ] `alt` em todas as imagens, navegável por teclado, contraste adequado
