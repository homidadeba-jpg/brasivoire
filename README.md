# Brasivoire

Site institucional responsivo em React, TypeScript e Vite. HTML pré-renderizado no build para disponibilizar o conteúdo aos buscadores. Sem backend, CRM, banco de dados ou persistência de dados pessoais.

## Executar

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Identidade e informações oficiais

A logo foi enviada pelo usuário. A paleta azul-marinho, azul e prata segue esse material. O original está preservado em `public/brand/brasivoire-original.jpg`. O recorte transparente foi preparado com a ferramenta de imagem integrada, salvo em `assets/brand/brasivoire-recorte.png` e redimensionado para PNG leve na interface com proporção preservada e `object-fit: contain`. Como todo recorte assistido, é uma variante derivada; o original permanece disponível para comparação e substituição. Prompt usado: retirar somente o fundo externo, manter escudo, estrela azul, monograma e aparência metálica, sem redesenhar ou distorcer.

WhatsApp oficial confirmado: **+55 19 99100-1577**. Instagram confirmado: **https://www.instagram.com/brasivoire/**. O Instagram limitou a leitura automatizada, portanto nenhuma história, cobertura ou serviço adicional foi inferido do perfil. As fotografias são ilustrativas. Não há afirmações sobre tempo de atuação, história, seguradoras, coberturas, taxas ou outras modalidades de consórcio.

História aprovada, fotos próprias, endereço completo, e-mail e eventual informação institucional ou regulatória ainda podem ser acrescentados quando enviados. Imóveis e automóveis são as únicas modalidades de consórcio listadas.

## WhatsApp

O número oficial `5519991001577` já está configurado em `src/company.ts`. Para substituição futura, copiar `.env.example` para `.env.local` e preencher `VITE_BRASIVOIRE_WHATSAPP`. Refazer o build após alterações. Nunca utilizar o telefone do desenvolvedor como contato da corretora.

Sem número válido, o formulário gera uma prévia e informa que nada foi enviado. Com o número oficial configurado, a abertura do WhatsApp acontece diretamente no gesto de envio, sem espera assíncrona; a mensagem contém modalidade, nome, WhatsApp e campos opcionais. O visitante confirma o envio no WhatsApp. Os estados de abertura são restaurados ao retornar à página e após uma espera limitada.

As modalidades e dados confirmados estão em `src/company.ts`. O ponto de evolução para um sistema de leads é o `submit` do `LeadForm` em `src/App.tsx`. Nenhuma integração externa é feita atualmente, além da navegação voluntária ao WhatsApp.

## Publicação e SEO

Durante aprovação, o site é gerado com `noindex, nofollow` e `robots.txt` bloqueado. Para a publicação oficial, definir `SITE_URL=https://dominio-oficial` no ambiente do build. O script gera canonical, Open Graph, dados estruturados InsuranceAgency, sitemap e robots público. Não definir domínio fictício. Confirmar os dados oficiais e o contato antes de publicar.

Não são carregados analytics, mapas, fontes ou imagens de terceiros em tempo de navegação. Fontes e fotografias são servidas localmente. Não há cookies próprios nem armazenamento local. O texto de privacidade descreve o tratamento realizado por esta implementação e deve acompanhar futuras alterações.

## Fotografia provisória

- Hero e seção de guindastes: fotografia original fornecida pelo usuário, 720 × 1280, SHA-256 iniciado em e37fa0dc.
- Pátio residencial: Matheus Bertelli / Pexels, https://www.pexels.com/photo/glass-wall-of-modern-house-13872621/
- A arte com textos da referência não é publicada como imagem; o conteúdo é HTML real.

As fotografias de guindaste, imóveis e veículos ilustram as modalidades e foram fornecidas pelo usuário. O detalhe de gancho e cabos em ambiente industrial é uma fotografia de Cemrecan Yurtman, Pexels 29224569, licenciada para uso no site. Nenhuma foto do site antigo é utilizada. Fonte Montserrat: SIL Open Font License, distribuída por `@fontsource/montserrat`. Pesos 500, 600, 700 e 800, com 800 itálico na faixa do Hero. Ícones Phosphor: MIT.

## Verificação

`npm test` executa a rodada de verificações de navegação, responsividade, formulários, tema, acessibilidade automatizada e HTML pré-renderizado. Os testes não comprovam comportamento de um aparelho físico nem o envio efetivo de mensagem. Imagens da conferência ficam em `.artifacts/`.


## Hero e movimento

A fotografia original do guindaste é utilizada sem reenquadramento relativo entre camadas, sem regenerar ou substituir o equipamento. Uma máscara SVG não destrutiva isola a silhueta sobre uma segunda instância da mesma fotografia, permitindo que os textos passem atrás dela. No mobile, ambos ocupam a mesma composição 9:16. O título, descrição, textos auxiliares e CTA seguem coordenadas proporcionais à referência. No desktop, a imagem fica à direita e os textos à esquerda. O Hero não inclui logo ou ícones decorativos.

A entrada usa GSAP e `useGSAP` com cleanup. As animações de entrada e scroll são aplicadas a elementos distintos para evitar conflito entre controladores. O restante da página usa deslocamentos curtos ligados à posição de rolagem, com reversão contínua e sem zerar opacidade. `prefers-reduced-motion` desativa as animações. Não há scroll hijacking, vídeo, loops de parallax ou estado React atualizado a cada frame.

A fotografia e a máscara usam nomes com hash. O arquivo original de referência permanece no anexo da conversa; a cópia da foto sem textos está em `public/images/guindaste-hero-e37fa0dc.jpg`. A tipografia é hospedada localmente.

## Vercel

Projeto: `brasivoire`. A URL pública da produção é obtida de `VERCEL_PROJECT_PRODUCTION_URL` (ou `SITE_URL`, quando definido explicitamente) para gerar canonical, sitemap e dados estruturados. Builds locais sem domínio continuam com noindex. Não é necessário servidor de aplicação ou serviço de banco de dados.

## Fotografia editorial

Revisão visual autorizada para reduzir texto e dar mais espaço à fotografia. O Hero permanece preservado. As fotos de automóvel e residência são as fornecidas pelo usuário. A apresentação institucional usa uma fotografia de detalhe de içamento, relacionada à especialidade da corretora. Cada arquivo novo usa hash de conteúdo no nome. As fotos entram com ampliação suave ligada ao scroll, sem reiniciar opacidade; movimento reduzido mantém o enquadramento estático.

As fotografias genéricas usadas em revisões anteriores foram substituídas. O transporte de cargas é ilustrado por uma fotografia de Boris Hamer, Pexels 15595843. As fontes e decisões editoriais sobre a história, serviços, parceiros, contatos e fotografia estão em `docs/official-content.md`.


Fotos residenciais substituídas conforme solicitação: fachada paulistana de Emanuel Pedro / Pexels (https://www.pexels.com/photo/charming-urban-residential-facade-in-sao-paulo-34105082/) e pátio de Matheus Bertelli / Pexels (https://www.pexels.com/photo/glass-wall-of-modern-house-13872621/). As imagens anteriores foram removidas da pasta pública, preservando o histórico Git.


## Fotografias fornecidas pela empresa

As quatro imagens enviadas nesta conversa substituem as fotos anteriores de automóvel e residência. As versões originais estão preservadas em `assets/company/` com os nomes dos anexos. As cópias públicas são WebP com hash de conteúdo, sem ampliar os originais nem recriar fachadas ou veículos. A casa térrea e o Jeep aparecem em seguros; a casa de dois pavimentos e o Toyota compõem a galeria de consórcios. Não há afirmação de que sejam bens segurados ou de clientes da corretora.

Os cortes são janelas de enquadramento definidas em `src/providedPhotos.css` e refinadas em `src/refinement.css`: proporção 4:3 para os seguros e posições focais individuais para os consórcios. Os originais mantêm todos os pixels e a geometria. A animação dessas fotos usa somente 2,5% de ampliação, sem deslocamento vertical interno, para manter os assuntos inteiros durante a entrada. O movimento é reversível e desativado com movimento reduzido. A referência de autoria visível no original da casa de dois pavimentos permanece no arquivo preservado.

## Refinamento final

A hierarquia prioriza seguros de guindastes e, em seguida, consórcios. Os demais seguros e a apresentação institucional permanecem acessíveis. Cabeçalho, navegação principal, formulário e rodapé seguem essa ordem. O CTA principal seleciona guindastes; as fotos e a chamada de consórcios selecionam a modalidade correspondente.

Foram retirados a seção repetida de diferenciais, os convites redundantes do rodapé, a duplicação de guindastes na lista de outros seguros e as instruções repetidas antes do formulário. A galeria de consórcios não sobrepõe fotografias. No desktop são dois enquadramentos quadrados; no mobile, duas imagens em sequência. As quatro fotos fornecidas e o Hero permanecem no projeto. Os controles compactos têm área de toque mínima de 44 px e os campos têm tipografia legível no celular. Não há contadores, indicadores numéricos promocionais ou novas promessas de cobertura.

## Profundidade no Hero e fotografias únicas

A entrada do título parte do trecho superior da lança e percorre uma distância curta até a posição final, sem subir desde o caminhão. A descrição emerge do braço do guindaste para o céu livre. Uma transição inicial de opacidade dura 200 ms; a profundidade vem exclusivamente do equipamento na camada de primeiro plano, sem recorte retangular nos textos. As posições iniciais são projetadas a partir de coordenadas da foto original para o object-fit atual, mantendo fundo e máscara alinhados em desktop e mobile. Ao retornar de outro aplicativo durante a entrada, a cena conclui na composição legível.

A cena tem duração limitada, sem rotação ou deformação do equipamento. Uma mudança de largura conclui a entrada, e retornar à seção não reinicia a animação. Movimento reduzido mantém a composição final estática. Listeners, timelines e tentativas assíncronas são limpos ao sair.

A fotografia do guindaste aparece somente no Hero, em duas camadas coincidentes que formam uma única composição. A seção da especialidade foi reorganizada com título, texto e CTA, sem repetir a foto. Nenhuma outra fotografia do conteúdo é reutilizada.
