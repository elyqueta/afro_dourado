# 00 — Visão e Princípios

## Objectivo do produto

Criar a presença digital da **Afro Dourado**, clínica capilar e de estética (Tricologia, Tranças &
Estética, Produtos Naturais) com unidades em **Luanda** e **Huambo**. O website deve funcionar como
motor de conversão (agendamentos) e como demonstração de autoridade/qualidade da marca.

Fonte original da direcção criativa: documento interno _"Afro Dourado — Direcção Criativa, UX/UI e
Especificação de Experiência Digital"_. Este `docs/` é a tradução operacional desse documento para
a stack real do projecto (Angular 22 + SSR + Tailwind v4), pronta a ser executada por um agente.

## Os três testes de qualidade (aplicar a cada página)

1. **O que é isto?** — o utilizador percebe o serviço em <5s.
2. **Porque devo confiar?** — prova social, cuidado visual, tom profissional mas humano.
3. **Como começo?** — CTA de agendamento sempre próximo, nunca escondido.

## Resultado pretendido (critério de aceitação subjectivo)

> "Isto não parece um site de uma clínica." → "Isto parece uma marca de luxo que entende cabelo." → "Quero marcar."

Combinação de território: **África + Identidade + Ciência + Cuidado + Beleza + Luxo + Natureza**,
sem estereótipos visuais óbvios (sem "print africano" genérico em todo o lado, sem tipografia
"tribal", sem paleta laranja-terracota clichê — a marca já definiu verde+dourado no logótipo).

## O que evitar (lista de bloqueio de PR / code review)

- Layout genérico de "clínica"/SaaS com 3 cards iguais e ícones de stock.
- Aparência de template (Webflow/Framer template look).
- Gradientes decorativos aleatórios sem função.
- Glassmorphism pesado.
- Excesso de elementos flutuantes / partículas.
- Uma única família tipográfica a fazer tudo (título e corpo iguais).
- Animações "porque sim" sem função narrativa (ver secção "Regra de ouro" abaixo).
- Secções repetindo sempre o mesmo padrão (imagem-texto-imagem-texto sem variação de ritmo).
- Fotografias de stock corporativas (sorrisos genéricos, mãos brancas em ambiente clínico genérico).

## Regra de ouro do motion

Cada animação tem de servir pelo menos **uma** destas funções: contar, orientar, revelar, explicar,
criar emoção, demonstrar qualidade, ou incentivar uma acção. Se não cumprir nenhuma → remover.

## Princípios técnicos transversais

- **Performance percebida > tecnologia**: o site deve parecer visualmente rico mas ser leve
  (ver `docs/09-seo-acessibilidade-performance.md`).
- **SSR sempre funcional**: nada de animações que dependam de `window`/`document` sem guardas
  `isPlatformBrowser` — o Angular SSR vai pré-renderizar tudo no servidor.
- **Componentização honesta**: se um padrão visual se repete 2+ vezes, vira componente em
  `docs/05-biblioteca-de-componentes.md`, não copy-paste.
- **Acessibilidade não é opcional**: o site tem de funcionar (ser navegável e compreensível) com
  animações desligadas e apenas por teclado.
