/* =========================================================
   PLATAFORMA DE ESTUDO
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ABRIR / FECHAR CARDS
    ===================================================== */

    window.abrirCard = function (card) {

        if (!card) {
            return;
        }

        card.classList.toggle("ativo");

        const texto =
            card.querySelector(".ver-mais");

        if (!texto) {
            return;
        }

        if (card.classList.contains("ativo")) {

            texto.textContent =
                "Clique para fechar −";

        } else {

            texto.textContent =
                "Clique para ver mais +";
        }
    };


    /* =====================================================
       MAPA MENTAL
    ===================================================== */

    gerarMapaMental();


    /* =====================================================
       ATIVIDADES DA AULA
    ===================================================== */

    inicializarAtividades();


    /* =====================================================
       GERADOR GERAL DE ATIVIDADES
    ===================================================== */

    inicializarGeradorGeral();

});


/* =========================================================
   MAPA MENTAL
========================================================= */

function gerarMapaMental() {

    const mapa =
        document.getElementById("mapa-mental");


    if (!mapa) {
        return;
    }


    const aula =
        mapa.closest(".aula-conteudo");


    if (!aula) {

        mapa.innerHTML = `
            <p class="carregando-mapa">
                Conteúdo da aula não encontrado.
            </p>
        `;

        return;
    }


    /* =====================================================
       TEMA CENTRAL
    ===================================================== */

    const titulo =
        aula.querySelector("h2");


    const temaCentral =
        titulo
            ? titulo.textContent.trim()
            : "Algoritmos e Estruturas de Dados";


    /* =====================================================
       TÓPICOS
    ===================================================== */

    const titulos =
        aula.querySelectorAll("h3");


    const limite =
        14;


    const topicos =
        Array.from(titulos)
            .filter(function (h3) {

                return h3.textContent.trim() !== "";

            })
            .slice(0, limite);


    if (!topicos.length) {

        mapa.innerHTML = `
            <p class="carregando-mapa">
                Nenhum tópico encontrado para gerar
                o mapa mental.
            </p>
        `;

        return;
    }


    /* =====================================================
       CONFIGURAÇÃO SVG
    ===================================================== */

    const largura = 1200;
    const altura = 700;

    const centroX =
        largura / 2;

    const centroY =
        altura / 2;


    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );


    svg.setAttribute(
        "viewBox",
        `0 0 ${largura} ${altura}`
    );


    svg.setAttribute(
        "preserveAspectRatio",
        "xMidYMid meet"
    );


    /* =====================================================
       GRUPOS
    ===================================================== */

    const grupoLinhas =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );


    const grupoNos =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );


    svg.appendChild(
        grupoLinhas
    );


    svg.appendChild(
        grupoNos
    );


    /* =====================================================
       CRIAR LINHA
    ===================================================== */

    function criarLinha(
        x1,
        y1,
        x2,
        y2
    ) {

        const linha =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        linha.setAttribute(
            "x1",
            x1
        );


        linha.setAttribute(
            "y1",
            y1
        );


        linha.setAttribute(
            "x2",
            x2
        );


        linha.setAttribute(
            "y2",
            y2
        );


        linha.classList.add(
            "linha-mapa"
        );


        grupoLinhas.appendChild(
            linha
        );


        return linha;
    }


    /* =====================================================
       CRIAR CÍRCULO
    ===================================================== */

    function criarCirculo(
        x,
        y,
        raio,
        classe
    ) {

        const circulo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        circulo.setAttribute(
            "cx",
            x
        );


        circulo.setAttribute(
            "cy",
            y
        );


        circulo.setAttribute(
            "r",
            raio
        );


        circulo.classList.add(
            classe
        );


        grupoNos.appendChild(
            circulo
        );


        return circulo;
    }


    /* =====================================================
       QUEBRAR TEXTO
    ===================================================== */

    function quebrarTexto(
        texto,
        limite
    ) {

        const palavras =
            texto.split(/\s+/);


        const linhas = [];

        let linhaAtual = "";


        palavras.forEach(
            function (palavra) {

                const teste =
                    linhaAtual
                        ? linhaAtual + " " + palavra
                        : palavra;


                if (teste.length > limite) {

                    if (linhaAtual) {

                        linhas.push(
                            linhaAtual
                        );
                    }


                    linhaAtual =
                        palavra;

                } else {

                    linhaAtual =
                        teste;
                }

            }
        );


        if (linhaAtual) {

            linhas.push(
                linhaAtual
            );
        }


        return linhas;
    }


    /* =====================================================
       CRIAR TEXTO
    ===================================================== */

    function criarTexto(
        x,
        y,
        texto,
        classe,
        limite
    ) {

        const linhas =
            quebrarTexto(
                texto,
                limite
            );


        linhas.forEach(
            function (linha, indice) {

                const elemento =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );


                elemento.setAttribute(
                    "x",
                    x
                );


                elemento.setAttribute(
                    "y",
                    y +
                    (
                        indice -
                        (linhas.length - 1) / 2
                    ) * 16
                );


                elemento.setAttribute(
                    "text-anchor",
                    "middle"
                );


                elemento.classList.add(
                    classe
                );


                elemento.textContent =
                    linha;


                grupoNos.appendChild(
                    elemento
                );

            }
        );
    }


    /* =====================================================
       NÓ CENTRAL
    ===================================================== */

    criarCirculo(
        centroX,
        centroY,
        105,
        "no-central"
    );


    criarTexto(
        centroX,
        centroY,
        temaCentral,
        "texto-central",
        18
    );


    /* =====================================================
       RAMOS
    ===================================================== */

    const raio = 250;


    topicos.forEach(
        function (titulo, indice) {

            const angulo =
                (
                    indice /
                    topicos.length
                ) *
                Math.PI *
                2
                -
                Math.PI / 2;


            const x =
                centroX +
                Math.cos(angulo) *
                raio;


            const y =
                centroY +
                Math.sin(angulo) *
                raio;


            /* Linha principal */

            criarLinha(
                centroX,
                centroY,
                x,
                y
            );


            /* Nó principal */

            criarCirculo(
                x,
                y,
                65,
                "no-principal"
            );


            /* Texto */

            criarTexto(
                x,
                y,
                titulo.textContent.trim(),
                "texto-principal",
                15
            );


            /* =================================================
               PROCURAR PRIMEIRO PARÁGRAFO
            ================================================= */

            let elemento =
                titulo.nextElementSibling;


            while (elemento) {

                if (
                    elemento.tagName === "H3"
                ) {
                    break;
                }


                if (
                    elemento.tagName === "P"
                ) {

                    const texto =
                        elemento.textContent.trim();


                    if (texto) {

                        const distancia =
                            125;


                        const x2 =
                            x +
                            Math.cos(angulo) *
                            distancia;


                        const y2 =
                            y +
                            Math.sin(angulo) *
                            distancia;


                        criarLinha(
                            x,
                            y,
                            x2,
                            y2
                        );


                        criarCirculo(
                            x2,
                            y2,
                            38,
                            "no-secundario"
                        );


                        criarTexto(
                            x2,
                            y2,
                            texto,
                            "texto-secundario",
                            12
                        );


                        break;
                    }
                }


                elemento =
                    elemento.nextElementSibling;
            }

        }
    );


    /* =====================================================
       COLOCAR MAPA NA PÁGINA
    ===================================================== */

    mapa.innerHTML = "";

    mapa.appendChild(
        svg
    );
}


/* =========================================================
   BANCO DE QUESTÕES
========================================================= */

const bancoQuestoes = [

    {
        pergunta:
            "O que é um algoritmo?",

        alternativas: [
            "Uma sequência lógica e finita de instruções para resolver um problema.",
            "Um tipo de computador utilizado para armazenar dados.",
            "Um programa responsável apenas pela criação de páginas web.",
            "Um dispositivo utilizado para conectar computadores."
        ],

        resposta: 0,

        topicos: [
            "algoritmos"
        ],

        explicacao:
            "Um algoritmo é uma sequência organizada e finita de passos utilizada para solucionar um problema."
    },


    {
        pergunta:
            "O que é uma estrutura de dados?",

        alternativas: [
            "Uma linguagem de programação.",
            "Uma forma de organizar, armazenar e manipular dados.",
            "Um sistema operacional.",
            "Um tipo de navegador."
        ],

        resposta: 1,

        topicos: [
            "estruturas"
        ],

        explicacao:
            "Estruturas de dados permitem organizar, armazenar e manipular informações de maneira eficiente."
    },


    {
        pergunta:
            "Qual princípio é utilizado pelas filas?",

        alternativas: [
            "LIFO",
            "FIFO",
            "FILO",
            "LOOP"
        ],

        resposta: 1,

        topicos: [
            "filas",
            "estruturas"
        ],

        explicacao:
            "FIFO significa First In, First Out: o primeiro elemento inserido é o primeiro a sair."
    },


    {
        pergunta:
            "Qual princípio é utilizado pelas pilhas?",

        alternativas: [
            "FIFO",
            "LIFO",
            "FILO",
            "HASH"
        ],

        resposta: 1,

        topicos: [
            "pilhas",
            "estruturas"
        ],

        explicacao:
            "LIFO significa Last In, First Out: o último elemento inserido é o primeiro a sair."
    },


    {
        pergunta:
            "Qual estrutura representa informações de maneira hierárquica?",

        alternativas: [
            "Fila",
            "Pilha",
            "Árvore",
            "Array"
        ],

        resposta: 2,

        topicos: [
            "arvores",
            "estruturas"
        ],

        explicacao:
            "Árvores são estruturas de dados que representam relações hierárquicas."
    },


    {
        pergunta:
            "Em um grafo, o que os vértices representam?",

        alternativas: [
            "As conexões entre os elementos.",
            "Os elementos ou entidades.",
            "Os algoritmos utilizados.",
            "A quantidade de memória."
        ],

        resposta: 1,

        topicos: [
            "grafos",
            "estruturas"
        ],

        explicacao:
            "Os vértices representam entidades ou elementos do grafo."
    },


    {
        pergunta:
            "Em um grafo, o que as arestas representam?",

        alternativas: [
            "As conexões entre os elementos.",
            "Os elementos principais.",
            "Os índices dos arrays.",
            "As funções do programa."
        ],

        resposta: 0,

        topicos: [
            "grafos",
            "estruturas"
        ],

        explicacao:
            "As arestas representam as conexões entre os vértices."
    },


    {
        pergunta:
            "Qual estrutura utiliza pares de chave e valor?",

        alternativas: [
            "Fila",
            "Pilha",
            "Tabela Hash",
            "Lista encadeada"
        ],

        resposta: 2,

        topicos: [
            "hash",
            "estruturas"
        ],

        explicacao:
            "Tabelas Hash normalmente armazenam informações associando uma chave a um valor."
    },


    {
        pergunta:
            "Para que serve um array?",

        alternativas: [
            "Para armazenar elementos organizados em posições ou índices.",
            "Para executar apenas algoritmos recursivos.",
            "Para criar exclusivamente bancos de dados.",
            "Para conectar computadores em rede."
        ],

        resposta: 0,

        topicos: [
            "arrays",
            "estruturas"
        ],

        explicacao:
            "Arrays armazenam vários elementos que podem ser acessados por índices."
    },


    {
        pergunta:
            "O que caracteriza uma lista encadeada?",

        alternativas: [
            "Seus elementos não possuem relação entre si.",
            "Cada nó pode armazenar um dado e uma referência para outro nó.",
            "Todos os dados precisam estar em posições consecutivas.",
            "Ela funciona obrigatoriamente como uma fila."
        ],

        resposta: 1,

        topicos: [
            "listas",
            "estruturas"
        ],

        explicacao:
            "Em uma lista encadeada, cada nó pode armazenar um dado e uma referência para outro nó."
    },


    {
        pergunta:
            "Qual é a função de um algoritmo de ordenação?",

        alternativas: [
            "Excluir todos os dados.",
            "Organizar os dados de acordo com determinado critério.",
            "Criar uma conexão de internet.",
            "Armazenar arquivos de vídeo."
        ],

        resposta: 1,

        topicos: [
            "ordenacao"
        ],

        explicacao:
            "Algoritmos de ordenação organizam os dados de acordo com algum critério."
    },


    {
        pergunta:
            "Qual alternativa apresenta algoritmos de ordenação?",

        alternativas: [
            "HTML, CSS e JavaScript.",
            "Bubble Sort, Merge Sort e Quick Sort.",
            "FIFO, LIFO e HASH.",
            "Windows, Linux e Android."
        ],

        resposta: 1,

        topicos: [
            "ordenacao"
        ],

        explicacao:
            "Bubble Sort, Merge Sort e Quick Sort são algoritmos de ordenação."
    },


    {
        pergunta:
            "Para que serve um algoritmo de busca?",

        alternativas: [
            "Para localizar informações em uma estrutura de dados.",
            "Para apagar o sistema operacional.",
            "Para criar imagens.",
            "Para alterar o hardware."
        ],

        resposta: 0,

        topicos: [
            "algoritmos"
        ],

        explicacao:
            "Algoritmos de busca são utilizados para localizar informações."
    },


    {
        pergunta:
            "O que representa a complexidade de tempo?",

        alternativas: [
            "A quantidade de memória disponível no computador.",
            "A quantidade de operações realizadas conforme aumenta a entrada.",
            "O tamanho físico do computador.",
            "A velocidade da internet."
        ],

        resposta: 1,

        topicos: [
            "complexidade"
        ],

        explicacao:
            "A complexidade de tempo analisa como o número de operações cresce conforme aumenta o tamanho da entrada."
    },


    {
        pergunta:
            "O que representa a complexidade de espaço?",

        alternativas: [
            "A quantidade de memória necessária para executar um algoritmo.",
            "A quantidade de usuários de um sistema.",
            "A velocidade do processador.",
            "O número de linhas do código HTML."
        ],

        resposta: 0,

        topicos: [
            "complexidade"
        ],

        explicacao:
            "A complexidade de espaço analisa a quantidade de memória necessária."
    },


    {
        pergunta:
            "Para que serve a notação Big O?",

        alternativas: [
            "Para representar o comportamento de um algoritmo conforme a entrada cresce.",
            "Para criar interfaces gráficas.",
            "Para definir cores de um site.",
            "Para armazenar imagens."
        ],

        resposta: 0,

        topicos: [
            "complexidade"
        ],

        explicacao:
            "A notação Big O descreve o crescimento do custo de um algoritmo em relação ao tamanho da entrada."
    },


    {
        pergunta:
            "Uma busca linear pode apresentar qual complexidade no pior caso?",

        alternativas: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ],

        resposta: 2,

        topicos: [
            "complexidade",
            "algoritmos"
        ],

        explicacao:
            "No pior caso, uma busca linear pode precisar verificar todos os elementos, resultando em O(n)."
    },


    {
        pergunta:
            "O que é recursão?",

        alternativas: [
            "Quando uma função chama a si própria para solucionar um problema.",
            "Quando um programa é executado sem nenhuma instrução.",
            "Quando os dados são sempre armazenados em arrays.",
            "Quando uma fila é transformada em árvore."
        ],

        resposta: 0,

        topicos: [
            "algoritmos"
        ],

        explicacao:
            "Recursão ocorre quando uma função chama a si mesma, normalmente até atingir uma condição de parada."
    },


    {
        pergunta:
            "Qual é o objetivo da programação dinâmica?",

        alternativas: [
            "Evitar computadores lentos.",
            "Dividir problemas em subproblemas e reutilizar resultados já calculados.",
            "Criar exclusivamente páginas web.",
            "Substituir todas as estruturas de dados."
        ],

        resposta: 1,

        topicos: [
            "programacao-dinamica",
            "algoritmos"
        ],

        explicacao:
            "Programação dinâmica utiliza resultados de subproblemas já calculados para evitar trabalho repetido."
    },


    {
        pergunta:
            "Qual estrutura é adequada para representar uma hierarquia de pastas?",

        alternativas: [
            "Árvore",
            "Fila",
            "Pilha",
            "Array simples"
        ],

        resposta: 0,

        topicos: [
            "arvores"
        ],

        explicacao:
            "Uma árvore é adequada para representar estruturas hierárquicas, como diretórios e pastas."
    },


    {
        pergunta:
            "Qual estrutura pode representar uma rede social?",

        alternativas: [
            "Fila",
            "Grafo",
            "Pilha",
            "Array"
        ],

        resposta: 1,

        topicos: [
            "grafos"
        ],

        explicacao:
            "Uma rede social pode ser representada como um grafo, onde pessoas são vértices e relações são arestas."
    },


    {
        pergunta:
            "Qual estrutura é muito utilizada para implementar operações de desfazer (undo)?",

        alternativas: [
            "Pilha",
            "Fila",
            "Grafo",
            "Tabela Hash"
        ],

        resposta: 0,

        topicos: [
            "pilhas"
        ],

        explicacao:
            "Uma pilha é adequada para operações de desfazer porque a última ação realizada geralmente é a primeira a ser desfeita."
    },


    {
        pergunta:
            "Qual estrutura pode organizar solicitações de usuários pela ordem de chegada?",

        alternativas: [
            "Árvore",
            "Grafo",
            "Fila",
            "Tabela Hash"
        ],

        resposta: 2,

        topicos: [
            "filas"
        ],

        explicacao:
            "Uma fila organiza elementos pela ordem de chegada utilizando o princípio FIFO."
    },


    {
        pergunta:
            "Qual é uma característica importante de uma boa estrutura de dados?",

        alternativas: [
            "Facilitar o armazenamento e acesso eficiente aos dados.",
            "Aumentar sempre o consumo de memória.",
            "Impedir a busca de informações.",
            "Eliminar a necessidade de algoritmos."
        ],

        resposta: 0,

        topicos: [
            "estruturas"
        ],

        explicacao:
            "Uma boa estrutura de dados deve facilitar operações sobre as informações de acordo com as necessidades do sistema."
    },


    {
        pergunta:
            "Por que algoritmos e estruturas de dados são importantes?",

        alternativas: [
            "Porque ajudam a criar sistemas mais eficientes, organizados e escaláveis.",
            "Porque substituem completamente os computadores.",
            "Porque servem somente para criar jogos.",
            "Porque eliminam a necessidade de programação."
        ],

        resposta: 0,

        topicos: [
            "algoritmos",
            "estruturas"
        ],

        explicacao:
            "Algoritmos e estruturas de dados são fundamentais para desenvolver soluções eficientes e organizadas."
    },


    {
        pergunta:
            "Qual alternativa apresenta apenas estruturas de dados?",

        alternativas: [
            "HTML, CSS e JavaScript.",
            "Fila, pilha, árvore e grafo.",
            "Chrome, Firefox e Edge.",
            "Python, Java e C++."
        ],

        resposta: 1,

        topicos: [
            "estruturas"
        ],

        explicacao:
            "Fila, pilha, árvore e grafo são exemplos de estruturas de dados."
    }

];


/* =========================================================
   VARIÁVEIS DAS ATIVIDADES
========================================================= */

let questoesAtuais = [];

let respostasUsuario = [];

let atividadeFinalizada = false;


/* =========================================================
   EMBARALHAR
========================================================= */

function embaralhar(array) {

    const copia =
        [...array];


    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            copia[i],
            copia[j]
        ] = [
            copia[j],
            copia[i]
        ];
    }


    return copia;
}


/* =========================================================
   INICIALIZAR ATIVIDADES DA AULA
========================================================= */

function inicializarAtividades() {

    const botao =
        document.getElementById(
            "btnGerarAtividades"
        );


    if (!botao) {
        return;
    }


    /* =====================================================
       EVITA DUPLICAR EVENTO
    ===================================================== */

    botao.addEventListener(
        "click",
        function () {

            gerarAtividades();

        }
    );


    /* =====================================================
       VALOR PADRÃO
    ===================================================== */

    const quantidade =
        document.getElementById(
            "quantidadeQuestoes"
        );


    if (quantidade) {

        if (
            !quantidade.value ||
            Number(quantidade.value) < 1
        ) {

            quantidade.value = 10;
        }
    }


    /* =====================================================
       GERA A PRIMEIRA ATIVIDADE
    ===================================================== */

    gerarAtividades();
}


/* =========================================================
   LIMPAR ATIVIDADE
========================================================= */

function limparAtividade() {

    questoesAtuais = [];

    respostasUsuario = [];

    atividadeFinalizada = false;


    const lista =
        document.getElementById(
            "listaQuestoes"
        );


    if (lista) {

        lista.innerHTML = "";
    }


    const resultado =
        document.getElementById(
            "resultadoAtividade"
        );


    if (resultado) {

        resultado.innerHTML = "";
    }


    const status =
        document.getElementById(
            "statusAtividade"
        );


    if (status) {

        status.innerHTML = "";
    }
}


/* =========================================================
   GERAR ATIVIDADES DA AULA
========================================================= */

function gerarAtividades() {

    /* =====================================================
       PRIMEIRO:
       LIMPA COMPLETAMENTE A ATIVIDADE ANTERIOR
    ===================================================== */

    limparAtividade();


    if (!bancoQuestoes.length) {

        console.error(
            "Banco de questões vazio."
        );

        return;
    }


    const quantidadeElemento =
        document.getElementById(
            "quantidadeQuestoes"
        );


    let quantidade = 10;


    if (quantidadeElemento) {

        quantidade =
            parseInt(
                quantidadeElemento.value,
                10
            );
    }


    /* =====================================================
       VALIDAR QUANTIDADE
    ===================================================== */

    if (
        isNaN(quantidade) ||
        quantidade < 1
    ) {

        quantidade = 10;
    }


    quantidade =
        Math.min(
            quantidade,
            bancoQuestoes.length
        );


    /* =====================================================
       SORTEAR QUESTÕES
    ===================================================== */

    questoesAtuais =
        embaralhar(
            bancoQuestoes
        ).slice(
            0,
            quantidade
        );


    /* =====================================================
       ZERAR RESPOSTAS
    ===================================================== */

    respostasUsuario =
        new Array(
            questoesAtuais.length
        ).fill(null);


    atividadeFinalizada =
        false;


    /* =====================================================
       STATUS
    ===================================================== */

    const status =
        document.getElementById(
            "statusAtividade"
        );


    if (status) {

        status.innerHTML = `
            🎲 ${questoesAtuais.length}
            questões geradas aleatoriamente.
        `;
    }


    /* =====================================================
       MOSTRAR
    ===================================================== */

    mostrarQuestoes();
}


/* =========================================================
   MOSTRAR QUESTÕES
========================================================= */

function mostrarQuestoes() {

    const container =
        document.getElementById(
            "listaQuestoes"
        );


    if (!container) {

        console.error(
            "Elemento #listaQuestoes não encontrado."
        );

        return;
    }


    container.innerHTML = "";


    questoesAtuais.forEach(
        function (questao, indice) {

            /* =============================================
               EMBARALHAR ALTERNATIVAS
            ============================================= */

            const alternativas =
                embaralhar(
                    questao.alternativas.map(
                        function (
                            texto,
                            index
                        ) {

                            return {

                                texto: texto,

                                correta:
                                    index ===
                                    questao.resposta

                            };
                        }
                    )
                );


            /* =============================================
               CRIAR BLOCO
            ============================================= */

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "questao";


            div.dataset.indice =
                indice;


            /* =============================================
               TÍTULO
            ============================================= */

            let html = `

                <div class="numero-questao">
                    Questão ${indice + 1}
                </div>

                <h3>
                    ${questao.pergunta}
                </h3>

                <div class="alternativas">

            `;


            /* =============================================
               ALTERNATIVAS
            ============================================= */

            alternativas.forEach(
                function (
                    alternativa,
                    letra
                ) {

                    html += `

                        <label class="alternativa">

                            <input
                                type="radio"
                                name="questao-${indice}"
                                value="${alternativa.correta}"
                            >

                            <span>
                                ${String.fromCharCode(65 + letra)})
                                ${alternativa.texto}
                            </span>

                        </label>

                    `;
                }
            );


            html += `

                </div>

                <div
                    class="feedback"
                    id="feedback-${indice}"
                ></div>

            `;


            div.innerHTML =
                html;


            container.appendChild(
                div
            );


            /* =============================================
               EVENTOS
            ============================================= */

            const inputs =
                div.querySelectorAll(
                    `input[name="questao-${indice}"]`
                );


            inputs.forEach(
                function (input) {

                    input.addEventListener(
                        "change",
                        function () {

                            verificarResposta(
                                indice,
                                this.value
                            );

                        }
                    );
                }
            );

        }
    );


    /* =====================================================
       BOTÃO FINALIZAR
    ===================================================== */

    const botao =
        document.createElement(
            "button"
        );


    botao.type =
        "button";


    botao.className =
        "btn-finalizar";


    botao.textContent =
        "✅ Finalizar atividade";


    botao.addEventListener(
        "click",
        finalizarAtividade
    );


    container.appendChild(
        botao
    );
}


/* =========================================================
   VERIFICAR RESPOSTA
========================================================= */

function verificarResposta(
    indice,
    valor
) {

    if (atividadeFinalizada) {
        return;
    }


    const correta =
        valor === "true";


    respostasUsuario[indice] =
        correta;


    const feedback =
        document.getElementById(
            `feedback-${indice}`
        );


    if (!feedback) {
        return;
    }


    const questao =
        questoesAtuais[indice];


    if (correta) {

        feedback.innerHTML = `
            ✅ Resposta correta!
            <br>
            <small>
                ${questao.explicacao}
            </small>
        `;


        feedback.className =
            "feedback correto";

    } else {

        feedback.innerHTML = `
            ❌ Resposta incorreta.
            <br>
            <small>
                ${questao.explicacao}
            </small>
        `;


        feedback.className =
            "feedback incorreto";
    }
}


/* =========================================================
   FINALIZAR ATIVIDADE
========================================================= */

function finalizarAtividade() {

    if (atividadeFinalizada) {
        return;
    }


    atividadeFinalizada =
        true;


    let respondidas = 0;

    let acertos = 0;


    respostasUsuario.forEach(
        function (resposta) {

            if (resposta !== null) {

                respondidas++;
            }


            if (resposta === true) {

                acertos++;
            }

        }
    );


    const total =
        questoesAtuais.length;


    const percentual =
        total > 0
            ? Math.round(
                (acertos / total) * 100
            )
            : 0;


    /* =====================================================
       MENSAGEM
    ===================================================== */

    let mensagem;


    if (percentual >= 90) {

        mensagem =
            "🏆 Excelente! Você domina muito bem o conteúdo.";

    } else if (percentual >= 70) {

        mensagem =
            "👏 Muito bom! Continue praticando.";

    } else if (percentual >= 50) {

        mensagem =
            "📚 Bom começo! Revise alguns conceitos.";

    } else {

        mensagem =
            "💪 Continue estudando e tente novamente.";
    }


    /* =====================================================
       RESULTADO
    ===================================================== */

    const resultado =
        document.getElementById(
            "resultadoAtividade"
        );


    if (!resultado) {
        return;
    }


    resultado.innerHTML = `

        <div class="resultado-box">

            <h3>
                Resultado da atividade
            </h3>

            <div class="pontuacao">

                <strong>
                    ${acertos}
                </strong>

                /
                ${total}

            </div>

            <p>
                Respondidas:
                <strong>
                    ${respondidas}
                </strong>
                de
                <strong>
                    ${total}
                </strong>
            </p>

            <p>
                Aproveitamento:
                <strong>
                    ${percentual}%
                </strong>
            </p>

            <p class="mensagem-resultado">
                ${mensagem}
            </p>

            <button
                type="button"
                class="btn-gerar"
                id="btnNovaAtividade"
            >
                🎲 Gerar Nova Atividade
            </button>

        </div>

    `;


    /* =====================================================
       DESABILITAR RESPOSTAS
    ===================================================== */

    const inputs =
        document.querySelectorAll(
            "#listaQuestoes input[type='radio']"
        );


    inputs.forEach(
        function (input) {

            input.disabled = true;
        }
    );


    /* =====================================================
       MOSTRAR RESULTADO
    ===================================================== */

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    /* =====================================================
       BOTÃO NOVA ATIVIDADE
    ===================================================== */

    const nova =
        document.getElementById(
            "btnNovaAtividade"
        );


    if (nova) {

        nova.addEventListener(
            "click",
            function () {

                /* =========================================
                   AQUI ESTÁ A CORREÇÃO PRINCIPAL
                   =========================================

                   Toda vez que clicar em "Gerar Nova
                   Atividade", tudo é zerado e uma nova
                   atividade é criada.
                */

                gerarAtividades();

            }
        );
    }
}


/* =========================================================
   GERADOR GERAL DE ATIVIDADES
========================================================= */

function inicializarGeradorGeral() {

    const botao =
        document.getElementById(
            "btnGerarAtividadeTopico"
        );


    if (!botao) {
        return;
    }


    botao.addEventListener(
        "click",
        gerarAtividadePorTopico
    );
}


/* =========================================================
   GERAR ATIVIDADE POR TÓPICO
========================================================= */

function gerarAtividadePorTopico() {

    const seletor =
        document.getElementById(
            "topico"
        );


    const atividade =
        document.getElementById(
            "atividade"
        );


    const resultado =
        document.getElementById(
            "resultado"
        );


    if (!seletor || !atividade) {
        return;
    }


    /* =====================================================
       LIMPAR ATIVIDADE ANTERIOR
    ===================================================== */

    atividade.innerHTML = "";

    if (resultado) {

        resultado.innerHTML = "";
    }


    /* =====================================================
       TÓPICO SELECIONADO
    ===================================================== */

    const topico =
        seletor.value;


    /* =====================================================
       FILTRAR QUESTÕES
    ===================================================== */

    let bancoFiltrado;


    if (topico === "todos") {

        bancoFiltrado =
            [...bancoQuestoes];

    } else {

        bancoFiltrado =
            bancoQuestoes.filter(
                function (questao) {

                    return (
                        Array.isArray(
                            questao.topicos
                        ) &&
                        questao.topicos.includes(
                            topico
                        )
                    );
                }
            );
    }


    /* =====================================================
       VERIFICAR BANCO
    ===================================================== */

    if (!bancoFiltrado.length) {

        atividade.innerHTML = `

            <div class="atividade-inicial">

                <p>
                    ⚠️ Ainda não existem questões
                    cadastradas para este tópico.
                </p>

            </div>

        `;

        return;
    }


    /* =====================================================
       ESCOLHER QUESTÃO
    ===================================================== */

    const questao =
        embaralhar(
            bancoFiltrado
        )[0];


    /* =====================================================
       EMBARALHAR ALTERNATIVAS
    ===================================================== */

    const alternativas =
        embaralhar(
            questao.alternativas.map(
                function (
                    texto,
                    index
                ) {

                    return {

                        texto: texto,

                        correta:
                            index ===
                            questao.resposta
                    };
                }
            )
        );


    /* =====================================================
       CRIAR ATIVIDADE
    ===================================================== */

    let html = `

        <div class="questao">

            <div class="numero-questao">
                Questão
            </div>

            <h3>
                ${questao.pergunta}
            </h3>

            <div class="alternativas">

    `;


    alternativas.forEach(
        function (
            alternativa,
            indice
        ) {

            html += `

                <label class="alternativa">

                    <input
                        type="radio"
                        name="atividade-geral"
                        value="${alternativa.correta}"
                    >

                    <span>
                        ${String.fromCharCode(65 + indice)})
                        ${alternativa.texto}
                    </span>

                </label>

            `;
        }
    );


    html += `

            </div>

            <div
                id="feedbackGeral"
                class="feedback"
            ></div>

            <button
                type="button"
                id="btnResponderGeral"
                class="btn-finalizar"
            >
                ✅ Responder
            </button>

        </div>

    `;


    atividade.innerHTML =
        html;


    /* =====================================================
       RESPONDER
    ===================================================== */

    const responder =
        document.getElementById(
            "btnResponderGeral"
        );


    if (!responder) {
        return;
    }


    responder.addEventListener(
        "click",
        function () {

            const selecionada =
                atividade.querySelector(
                    "input[name='atividade-geral']:checked"
                );


            const feedback =
                document.getElementById(
                    "feedbackGeral"
                );


            if (!selecionada) {

                feedback.innerHTML =
                    "⚠️ Selecione uma alternativa.";

                feedback.className =
                    "feedback incorreto";

                return;
            }


            const correta =
                selecionada.value === "true";


            if (correta) {

                feedback.innerHTML = `
                    ✅ Resposta correta!
                    <br>
                    <small>
                        ${questao.explicacao}
                    </small>
                `;


                feedback.className =
                    "feedback correto";

            } else {

                feedback.innerHTML = `
                    ❌ Resposta incorreta.
                    <br>
                    <small>
                        ${questao.explicacao}
                    </small>
                `;


                feedback.className =
                    "feedback incorreto";
            }


            /* =============================================
               DESABILITAR RESPOSTAS
            ============================================= */

            const inputs =
                atividade.querySelectorAll(
                    "input[type='radio']"
                );


            inputs.forEach(
                function (input) {

                    input.disabled = true;
                }
            );


            responder.disabled =
                true;


            responder.textContent =
                "🎲 Gerar outra questão";


            /* =============================================
               TRANSFORMAR BOTÃO EM NOVA QUESTÃO
            ============================================= */

            responder.addEventListener(
                "click",
                function () {

                    gerarAtividadePorTopico();

                },
                {
                    once: true
                }
            );

        }
    );
}


/* =========================================================
   FIM DO JAVASCRIPT
========================================================= */
