# 07 — Mapa do Site e Conteúdo

## Sitemap (rotas)

```
/                    Home
/tricologia          Tricologia
/trancas-estetica     Tranças & Estética
/produtos            Produtos Naturais
/sobre               Sobre Nós
/equipa              Equipa
/journal             Journal (listagem)
/journal/:slug       Journal (artigo)
/contactos           Contactos / Unidades
/agendamento         Sistema de Agendamento
```

## Como distinguir conteúdo definido vs pendente

- **Conteúdo definido** (usar tal como está, vem do documento criativo): headlines, CTAs, labels
  de navegação, estrutura do fluxo de agendamento, opções do assistente, estrutura do FAQ.
- **Conteúdo pendente de validação da AfroDourado** (PDF de requisitos, secções 2–7): fotos reais,
  morada exacta, horários, telefone/WhatsApp, preços, nomes/formação da equipa, texto final de
  "Sobre Nós", descrições técnicas de tratamentos, política de agendamento, domínio/email.
  → Marcar sempre como `[[PENDENTE-CLIENTE]]` no conteúdo renderizado (texto visível, não escondido)
  de forma discreta mas honesta (ex.: itálico/opacidade reduzida), e com comentário
  `<!-- TODO: aguardar validação AfroDourado -->` junto à data/fonte no código.

## Navegação (Navbar)

```
AfroDourado (logo)   Tricologia   Tranças   Produtos   Sobre   Journal   [Agendar]
```

## Home — headlines e textos definidos

- **Hero**
  - Eyebrow: `AFRODOURADO`
  - Headline: `Natural é vida.`
  - Descrição: `Cuidado especializado para a saúde, beleza e identidade do teu cabelo.`
  - CTA primário: `Agendar atendimento`
  - CTA secundário: `Descobrir a AfroDourado`
- **"O cuidado começa aqui"**
  - Headline (text reveal, palavras douradas seleccionadas pelo agente com bom senso editorial,
    ex. destacar "história"): `O teu cabelo conta uma história.`
- **Três Pilares**
  - Tricologia — `Ciência para compreender. Cuidado para transformar.`
  - Tranças & Estética — `Técnica, identidade e expressão.`
  - Produtos Naturais — `Cuidado pensado para a rotina real.`
- **CTA global**: `Agendar atendimento` / secundário `Falar no WhatsApp`

## Tricologia — página interna

- Hero: `Compreender o cabelo é o primeiro passo para cuidar dele.`
- Lista de tratamentos (nomes definidos, descrições **pendentes** de validação clínica):
  ```
  01  AVALIAÇÃO TRICOLÓGICA        [[PENDENTE-CLIENTE: descrição, duração, preço]]
  02  TERAPIA CAPILAR              [[PENDENTE-CLIENTE: descrição, duração, preço]]
  03  MICROAGULHAMENTO             [[PENDENTE-CLIENTE: descrição, duração, preço]]
  04  TRATAMENTOS ESPECÍFICOS      [[PENDENTE-CLIENTE: descrição, duração, preço]]
  ```
- Cada tratamento (quando expandido/hover): problema, abordagem, benefícios, processo, duração,
  preparação, cuidados posteriores, CTA — todos os campos de conteúdo clínico ficam
  `[[PENDENTE-CLIENTE]]` até chegar o documento de "Descrição de Serviços" (PDF secção 3).
- CTA persistente desktop: `Agendar avaliação`. Mobile: barra inferior `Agendar atendimento`.

## Tranças & Estética — página interna

- Hero headline: `O teu cabelo. A tua expressão.`
- Galeria horizontal controlada por scroll (ver `docs/03-motion-system.md` e
  `docs/08-especificacao-de-paginas.md`).
- Cada item de trabalho: tipo de trança, técnica, informações relevantes — conteúdo textual
  `[[PENDENTE-CLIENTE]]`; imagens: stock temporário (ver `docs/06-media-e-assets.md`) até receber
  "Portfólio de Tranças" (PDF secção 2) com termo de autorização de imagem assinado.

## Produtos Naturais — página interna

- Cards editoriais (não grid e-commerce genérico). Nome de produto, benefícios, modo de utilização
  — tudo `[[PENDENTE-CLIENTE]]` (PDF menciona "Linha de Produtos": shampoos, condicionadores,
  óleos, finalizadores). Estrutura de card deve estar pronta para receber estes dados assim que
  chegarem (não hardcode nomes de produtos inventados — usar 4–6 placeholders genéricos tipo
  `Óleo Capilar Nutritivo [[PENDENTE-CLIENTE]]`).

## Sobre Nós

- Abertura (não usar "Somos uma clínica..."): usar variação de
  `Cuidar do cabelo é também cuidar daquilo que somos.` como headline de abertura.
- Restante história/missão/visão/valores: `[[PENDENTE-CLIENTE]]` (PDF secção 3: "História 'Sobre
  Nós'" — documento a validar pela direcção).

## Equipa

- Estrutura por membro: nome, formação, certificações, especialidades, mini-biografia (até 100
  palavras) — **todos** os campos `[[PENDENTE-CLIENTE]]` (PDF secção 3, "Perfil da Equipa").
  Preparar 3–4 cards placeholder com esta estrutura, fotos stock temporárias com o comentário
  indicado em `docs/06-media-e-assets.md`.

## Journal

- 4–6 artigos placeholder cobrindo os temas sugeridos no doc criativo (queda capilar, quebra,
  cuidados com cabelo afro, tranças, cuidados antes/depois, produtos naturais), servindo também de
  base para SEO (ver termos abaixo). Texto de cada artigo pode ser escrito de forma genérica e
  educativa (sem alegações clínicas específicas da AfroDourado) — isto **não** é conteúdo
  institucional sensível, pode ser produzido directamente para preencher a estrutura, claramente
  identificável como conteúdo editorial geral e não uma alegação da clínica.

## Contactos / Unidades

- Duas unidades: **Luanda** e **Huambo**.
- UX: `Escolha a sua unidade` → `[ LUANDA ]` `[ HUAMBO ]` → morada, horário, telefone, WhatsApp,
  mapa, CTA.
- Todos os dados de contacto reais `[[PENDENTE-CLIENTE]]` (PDF secção 4: "Dados Operacionais e
  Contactos" — telefone/WhatsApp com indicativo `+244`, moradas completas, horários).
- Placeholder de horário sugerido pelo próprio PDF como exemplo de formato (não usar como dado
  real): `Dom–Sex: 08h–18h | Sáb: Encerrado [[PENDENTE-CLIENTE]]`.

## Sistema de Agendamento

Fluxo definido (ver `docs/05-biblioteca-de-componentes.md` § Booking):
1. `O que procura?` → Tricologia / Tranças & Estética / Outro
2. `Qual serviço?` (depende do passo 1)
3. `Onde?` → Luanda / Huambo
4. `Quando?`
5. Dados de contacto
6. `Confirmar pedido`

Regra: nunca pedir mais informação do que a necessária nestes 5 passos.

## Assistente AfroDourado (FAQ guiado)

Botão: `AfroDourado Assist`. Opções iniciais:
```
Como podemos ajudar?
Tenho queda capilar
Quero cuidar do meu cabelo
Quero fazer tranças
Quero conhecer os produtos
Quero marcar atendimento
```
Respostas: apenas com base em conteúdo validado (nesta fase, praticamente tudo é
`[[PENDENTE-CLIENTE]]` — implementar a estrutura funcional com respostas genéricas seguras,
terminando sempre com `Para uma avaliação adequada, fale com a nossa equipa.` + CTA
`Agendar avaliação`). Nunca inventar preços, diagnósticos, tratamentos, horários ou resultados.

## FAQ (base para o assistente e para a página/secção FAQ)

Usar como esqueleto (perguntas reais sugeridas no PDF de requisitos, secção 5 — respostas ficam
`[[PENDENTE-CLIENTE]]` até à entrega do documento de 20–30 perguntas/respostas validado):

- Qual é o valor e o tempo de duração de uma consulta de tricologia?
- Posso fazer tranças se estiver a apresentar queda capilar ou quebra acentuada?
- Os produtos e cosméticos utilizados são veganos e livres de crueldade animal?
- Existe algum cuidado prévio necessário (ex: lavar o cabelo) antes da consulta tricológica?
- A unidade do Huambo oferece exactamente os mesmos serviços e produtos de Luanda?

## Termos de SEO prioritários (PDF secção 6)

Usar nos `<title>`, meta description e headings (H1/H2) das respectivas páginas — ver
`docs/09-seo-acessibilidade-performance.md`:

- `Tricologista em Luanda` → página Tricologia / Contactos
- `Tranças Nagô profissionais` → página Tranças & Estética
- `Queda capilar tem cura?` → artigo do Journal
- `Produtos naturais para cabelos afro` → página Produtos
- `Clínica capilar no Huambo` → página Contactos / Home

## Política de Agendamento

Texto das regras de marcação/tolerância/cancelamento: `[[PENDENTE-CLIENTE]]` (PDF secção 4). Deixar
um espaço reservado no `BookingSummaryComponent` / rodapé do fluxo de agendamento para este texto
assim que validado (nota legal curta, link para "ver política completa").
