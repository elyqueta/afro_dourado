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

- **Conteúdo definido** (usar tal como está): headlines, CTAs, labels de navegação, estrutura do fluxo de agendamento, opções do assistente, estrutura do FAQ.
- **Conteúdo realista para demonstração**: textos, descrições e imagens contextualizadas para Angola/Luanda/Huambo, sem inventar factos clínicos específicos.
- **Conteúdo pendente de validação da Afro Dourado** (PDF de requisitos, secções 2–7): fotos reais da equipa/espaço, morada exacta, horários, telefone/WhatsApp, preços, nomes/formação da equipa, texto final de "Sobre Nós", descrições técnicas de tratamentos, política de agendamento, domínio/email.

## Navegação (Navbar)

```
Afro Dourado (logo)   Tricologia   Tranças   Produtos   Sobre   Journal   [Agendar]
```

## Home — headlines e textos definidos

- **Hero**
  - Eyebrow: `Afro Dourado`
  - Headline: `Natural é vida.`
  - Descrição: `Cuidado especializado para a saúde, beleza e identidade do cabelo afro em Luanda e Huambo.`
  - CTA primário: `Agendar atendimento`
  - CTA secundário: `Descobrir a Afro Dourado`
- **"O cuidado começa aqui"**
  - Headline: `O teu cabelo conta uma história. Nós ajudamos a escrevê-la com ciência, técnica e produtos naturais.`
- **Três Pilares**
  - Tricologia — `Ciência para compreender. Cuidado para transformar.`
  - Tranças & Estética — `Técnica, identidade e expressão.`
  - Produtos Naturais — `Cuidado pensado para a rotina real.`
- **CTA global**: `Agendar atendimento` / secundário `Falar no WhatsApp`

## Tricologia — página interna

- Hero: `Compreender o cabelo é o primeiro passo para cuidar dele.`
- Lista de tratamentos (nomes definidos, descrições contextualizadas para demo):
  ```
  01  AVALIAÇÃO TRICOLÓGICA        Consulta inicial com análise do couro cabeludo e haste capilar.
  02  TERAPIA CAPILAR              Tratamento intensivo para queda, quebra e danos químicos.
  03  MICROAGULHAMENTO             Procedimento minimamente invasivo para estimular a regeneração.
  04  TRATAMENTOS ESPECÍFICOS      Protocolos personalizados conforme diagnóstico.
  ```
- Cada tratamento: problema, abordagem, benefícios, processo, duração, preparação, cuidados posteriores, CTA.
- CTA persistente desktop: `Agendar avaliação`. Mobile: barra inferior `Agendar atendimento`.

## Tranças & Estética — página interna

- Hero headline: `O teu cabelo. A tua expressão.`
- Galeria com imagens de demonstração contextualizadas.
- Conteúdo textual: tipos de tranças, técnicas, cuidados prévios e manutenção.

## Produtos Naturais — página interna

- Cards editoriais com produtos realistas: nome, benefícios, modo de utilização e imagem.
- Estrutura pronta para receber dados reais da linha de produtos.

## Sobre Nós

- Abertura: `Cuidar do cabelo é também cuidar daquilo que somos.`
- Texto contextualizado sobre a missão, valores e presença em Luanda e Huambo.

## Equipa

- Estrutura por membro: nome, cargo, biografia curta e fotografia.
- Dados realistas para demonstração; fotos podem ser substituídas por material real da equipa.

## Journal

- 3 artigos editoriais: queda capilar, rotina de cuidados para cabelo afro, tranças e identidade.
- Texto educativo sem alegações clínicas definitivas.

## Contactos / Unidades

- Duas unidades: **Luanda** e **Huambo**.
- UX: `Escolha a sua unidade` → `[ LUANDA ]` `[ HUAMBO ]` → morada, horário, telefone.
- Dados realistas para demonstração; confirmar dados reais com a Afro Dourado antes de lançar.

## Sistema de Agendamento

Fluxo definido (ver `docs/05-biblioteca-de-componentes.md` § Booking):

1. `O que procura?` → Tricologia / Tranças & Estética / Outro
2. `Qual serviço?` (depende do passo 1)
3. `Onde?` → Luanda / Huambo
4. `Quando?`
5. Dados de contacto
6. `Confirmar pedido`

Regra: nunca pedir mais informação do que a necessária nestes 5 passos.

## Assistente Afro Dourado (FAQ guiado)

Botão: `Afro Dourado Assist`. Opções iniciais:

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
