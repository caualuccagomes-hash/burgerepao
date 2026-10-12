# Burger e Pão Tianguá

Site estático em português brasileiro, sem dependências de instalação. A logo enviada foi preservada. Interface em carvão, creme e amarelo, com títulos expressivos, composição editorial, imagens responsivas WebP, menu móvel e barra de pedidos.

## Abrir e executar

Abra `index.html` no navegador para ver a página, com seus recursos locais. Para desenvolver com servidor, use Node.js 18 ou superior na pasta do projeto:

```sh
npm run build
npm start
```

Acesse http://localhost:4173. Não precisa executar npm install. A compilação gera `dist/`, além da prévia na raiz.

## Editar e publicar

- Informações do negócio, avaliações, links e domínio: `src/business.mjs`.
- Conteúdo e marcação: `src/page.html`.
- Estilos e tokens: `src/styles.css`.
- Menu e revelações: `src/app.js`.
- Recursos otimizados: `assets/`.

Depois de editar, execute `npm run build`. Publique **o conteúdo de dist/** em qualquer hospedagem estática com HTTPS. Defina antes `domain` com a URL final em `src/business.mjs` para gerar canonical, URL/imagem absoluta de compartilhamento, sitemap e robots.txt. Produção não foi publicada.

## Design e movimento

- Logo fornecida, preto quente, amarelo da identidade e creme.
- Impact para títulos e Arial para texto; fontes do sistema, sem requisições externas nem distribuição de arquivos de fonte. Fallbacks locais definidos em CSS. A aparência dos títulos pode variar entre sistemas.
- CSS nativo: entrada inicial concluída em 1 segundo, sequência do título com intervalo de 60 ms, movimento suave na imagem e linha de progresso de 1000 ms. Textos permanecem visíveis durante toda a entrada e as revelações. Respostas de botão em 150 ms. Curva `cubic-bezier(.23,1,.32,1)`.
- Movimento inicial serve à apresentação da marca; respostas de botões dão feedback. Hover de escala apenas com mouse. Movimento reduzido remove deslocamentos, preservando transições suaves de opacidade. Conteúdo visível se JavaScript ou animação falhar.
- Menu móvel usa navegação expansível, foco no primeiro link ao abrir, Escape com retorno ao botão e fechamento ao navegar ou sair do cabeçalho. Não é modal nem prende o foco.

## Skills aplicadas

`design`: direção de arte; `brand`: consistência de marca e linguagem; `design-system`: tokens primitivos, semânticos e de componentes; `animate`: movimento CSS, curvas, sequência, hover e movimento reduzido; `imagegen`: recurso gastronômico ilustrativo. `animation-vocabulary` e `break-ui` foram avaliadas e não aplicadas por terem escopos específicos de nomenclatura e testes de dados adversariais.

## Informações e pendências

- A consulta ao cardápio oficial pela ferramenta web não retornou conteúdo acessível. Não foram criados nomes de produtos, preços, ingredientes nem categorias fictícias. O endereço Yooga completo foi preservado.
- O endereço foi mantido integralmente, inclusive “vila salles, 12”. A apresentação desse trecho precisa de confirmação do responsável.
- Nota 5,0 e quatro avaliações são do registro fornecido, com indicação pública de que não há atualização em tempo real. Os dois depoimentos foram preservados. Avaliações não constam no JSON-LD.
- Não há grade semanal confirmada. Horários e “aberto agora” não foram publicados.
- A imagem de hambúrguer e batatas é gerada por IA, identificada como ilustrativa nas duas utilizações. Substituir por fotos reais autorizadas quando disponíveis.
- Domínio e hospedagem ainda não foram definidos. Metadados específicos de domínio só serão gerados após configuração.
- Contato abre WhatsApp; não há links tel: nem botão de ligação. A página nunca envia a mensagem automaticamente.

## Verificação efetivamente realizada

Compilação Node concluída; sintaxe JavaScript verificada; validação estática de um h1, idioma, JSON-LD, IDs/âncoras, links externos com noopener/noreferrer, preservação exata dos links oficiais e recursos locais. Imagens conferidas com Pillow e imagem gerada inspecionada visualmente. Veja `verificacao.json`.

Hero de 1440 px: 154.298 bytes; versão de 640 px: 45.572 bytes. Sem bibliotecas JS, vídeos, mapas incorporados ou fontes remotas.

**Limitação:** Edge headless encerrou na inicialização no ambiente gerenciado. A prévia no navegador integrado não conseguiu conectar aos servidores locais. Por isso não houve revisão visual final em navegador, execução dos testes de interação, medição de Lighthouse ou confirmação de Core Web Vitals. Os layouts de 360 px, tablet e desktop foram implementados e revisados no código, mas ainda exigem validação visual em navegador. Não há notas ou métricas de laboratório inventadas. INP também depende de dados reais após publicação.

Antes da publicação: revisar visualmente em celular/tablet/desktop, navegar por teclado, testar Menu/Escape e âncoras, ativar movimento reduzido, abrir os destinos oficiais, medir Lighthouse móvel e configurar domínio.


## Ajuste da prévia e carregamento

O antigo acesso src/template.html encaminha à página completa index.html. A duração de 1 segundo corresponde à animação visual; o tempo real de download depende da conexão. Não há espera artificial nem bloqueio dos botões.


## Expansão com imagens fornecidas

A página ganhou galeria editorial, visualizador de fotos com anterior/próxima e navegação por setas/Escape, passo a passo de pedido, faixa de ajuda e seis dúvidas frequentes em acordeões nativos. Fontes, botões e largura de composição foram ampliados. A entrada continua concluindo em 1 segundo e o conteúdo não fica oculto durante a animação.

Estilos adicionais: src/details.css. As duas novas fotos ficam em assets/foto-burgers.webp e assets/foto-mesa.webp. Foram fornecidas para o projeto em 172 × 224 px; não são imagens geradas. Para exibição maior com nitidez, substituir por originais de maior resolução. As fotos não foram usadas para inventar produtos, preços, ingredientes ou disponibilidade. A imagem principal continua ilustrativa e identificada.

Sem JavaScript, os links da galeria abrem os próprios arquivos de imagem e os acordeões continuam funcionando. Com JavaScript, a galeria abre em um dialog nativo com foco modal e retorno ao link de origem.

Compilação, sintaxe JavaScript e 12 verificações estáticas passaram novamente. A inspeção final em navegador continua pendente pela limitação já registrada.

## Publicação na Vercel

A raiz do projeto na Vercel deve ser a raiz do repositório (campo Root Directory vazio ou `.`). Não use `src` nem `dist` como Root Directory. O vercel.json define Framework = Other (null), compilação `node build.mjs` e Output Directory = `dist`. O servidor de prévia está em scripts/preview.mjs e serve apenas para uso local por npm start. O deploy publica HTML, CSS, JavaScript e imagens estáticos, sem invocar uma função Node para abrir a página.

Se o projeto existente da Vercel tiver configurações diferentes, ajuste Root Directory para a raiz e Framework Preset para Other, depois gere um novo deploy do último commit. Um deployment anterior não recebe mudanças de configuração automaticamente.
