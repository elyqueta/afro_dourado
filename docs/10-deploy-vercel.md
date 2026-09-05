# 10 — Deploy no Vercel (Angular SSR)

> O repositório já está criado e ligado ao Vercel. Este documento cobre o que o agente deve
> verificar/ajustar para que o build de Angular SSR (`@angular/ssr`) funcione correctamente lá.

## Configuração esperada

- O projecto usa `outputMode: "server"` no `angular.json` — o build gera `dist/afro_dourado/browser`
  (assets estáticos) e `dist/afro_dourado/server` (o servidor Node, `server.mjs`, ver `src/server.ts`).
- O Vercel tem suporte nativo a **Angular SSR** via o preset oficial (framework `Angular` detectado
  automaticamente a partir do `angular.json` quando o adaptador Vercel/Node é usado). Se o projecto
  não estiver a usar o builder específico da Vercel, garantir que existe um ficheiro
  `vercel.json` mínimo apenas se necessário — **testar primeiro sem `vercel.json` customizado**,
  já que o Angular CLI 22 + `@angular/ssr` tendem a ser detectados automaticamente pela Vercel
  como projecto "Angular (Server-Side Rendering)".
- Confirmar no dashboard da Vercel (ou `vercel.json` se necessário):
  - **Build Command**: `npm run build` (ou o comando por defeito que a Vercel define para Angular)
  - **Output Directory**: gerido automaticamente pelo preset Angular da Vercel — não forçar
    manualmente a menos que o deploy falhe a detectar.
  - **Install Command**: `npm install`
  - **Node.js Version**: usar a versão compatível com os `engines` do `package.json`
    (`^22.22.3 || ^24.15.0 || >=26.0.0` conforme `package-lock.json`) — seleccionar a LTS mais
    próxima disponível nas definições de Node.js da Vercel.

## Variáveis de ambiente

Nesta fase o site não depende de segredos (sem backend próprio de agendamento/chatbot com IA
real). Se/quando for adicionada uma integração real (ex.: envio de email/webhook do formulário de
agendamento, endpoint do chatbot), documentar aqui as variáveis necessárias
(`BOOKING_WEBHOOK_URL`, etc.) e configurá-las no dashboard da Vercel (Settings → Environment
Variables), nunca commitadas no repositório.

## Pré-render vs Server

Ver `docs/04-arquitectura-angular.md` § `app.routes.server.ts` para a divisão de `RenderMode` por
rota. Páginas `Prerender` ficam como HTML estático servido via CDN da Vercel (mais rápido); rotas
`Server` (ex. `/agendamento`) correm como função serverless/edge a cada pedido.

## Domínio

O domínio final (`afrodourado.co.ao` ou `afrodourado.ao`, conforme PDF de requisitos secção 7)
ainda não está definido/confirmado pela AfroDourado. Até lá, usar o domínio de preview da Vercel.
Quando o domínio for confirmado, associá-lo em Vercel → Settings → Domains, e actualizar:
- `<link rel="canonical">` / URLs absolutos usados em SEO (`docs/09`)
- `sitemap.xml` / `robots.txt`
- Qualquer URL absoluta usada em Open Graph

## Checklist antes de cada deploy para produção

- [ ] `npm run build` local sem erros
- [ ] `npm test` (Vitest) sem falhas
- [ ] Preview deploy da Vercel revisado em desktop e mobile antes de promover para produção
- [ ] Nenhum dado `[[PENDENTE-CLIENTE]]` sensível (preço, morada) apresentado como definitivo —
      confirmar que os placeholders continuam claramente identificáveis como pendentes
