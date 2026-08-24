/* =========================================================
   PLATAFORMA DE ESTUDO
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
   ABRIR / FECHAR INFORMAÇÃO EXTRA DOS CARDS
========================================================= */

function abrirCard(card) {

    // Alterna o estado do card
    card.classList.toggle("ativo");

    // Localiza o texto de orientação
    const texto = card.querySelector(".ver-mais");

    // Altera o texto
    if (card.classList.contains("ativo")) {

        texto.textContent = "Clique para fechar −";

    } else {

        texto.textContent = "Clique para ver mais +";

    }

}
    /* =====================================================
       MAPA MENTAL
    ===================================================== */

    const mapa =
        document.getElementById("mapa-mental");


    if (!mapa) {

        return;

    }


    /*
     * Localiza a primeira aula que possui
     * conteúdo.
     */

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


    /*
     * O H2 será o tema central.
     */

    const titulo =
        aula.querySelector("h2");


    const temaCentral =
        titulo
            ? titulo.textContent.trim()
            : "Algoritmos e Estruturas de Dados";


    /*
     * Todos os H3 serão os ramos principais.
     */

    const titulos =
        aula.querySelectorAll("h3");


    /*
     * Quantidade máxima de tópicos.
     */

    const limite =
        14;


    const topicos =
        Array.from(titulos)
            .slice(0, limite);


    /*
     * Configuração do SVG.
     */

    const largura =
        1200;


    const altura =
        700;


    const centroX =
        largura / 2;


    const centroY =
        altura / 2;


    /*
     * Cria SVG.
     */

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );


    svg.setAttribute(
        "viewBox",
        `0 0 ${largura} ${altura}`
    );


    /*
     * Grupos.
     */

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


    /*
     * Cria linha.
     */

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

    }


    /*
     * Cria círculo.
     */

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


    /*
     * Quebra texto em linhas.
     */

    function quebrarTexto(
        texto,
        limite
    ) {

        const palavras =
            texto.split(" ");


        const linhas = [];


        let linhaAtual = "";


        palavras.forEach(
            function (palavra) {

                const teste =
                    linhaAtual
                    ? linhaAtual + " " + palavra
                    : palavra;


                if (
                    teste.length >
                    limite
                ) {

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


    /*
     * Cria texto.
     */

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

    const raio =
        250;


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


            /*
             * Linha principal.
             */

            criarLinha(
                centroX,
                centroY,
                x,
                y
            );


            /*
             * Nó principal.
             */

            criarCirculo(
                x,
                y,
                65,
                "no-principal"
            );


            /*
             * Nome do tópico.
             */

            criarTexto(
                x,
                y,
                titulo.textContent.trim(),
                "texto-principal",
                15
            );


            /*
             * Procura o primeiro parágrafo
             * depois do H3.
             */

            let elemento =
                titulo.nextElementSibling;


            let quantidade =
                0;


            while (
                elemento &&
                quantidade < 1
            ) {

                if (
                    elemento.tagName === "P"
                ) {

                    const texto =
                        elemento.textContent
                            .trim();


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


                        /*
                         * Linha secundária.
                         */

                        criarLinha(
                            x,
                            y,
                            x2,
                            y2
                        );


                        /*
                         * Nó secundário.
                         */

                        criarCirculo(
                            x2,
                            y2,
                            38,
                            "no-secundario"
                        );


                        /*
                         * Texto secundário.
                         */

                        criarTexto(
                            x2,
                            y2,
                            texto,
                            "texto-secundario",
                            12
                        );


                        quantidade++;

                    }

                }


                /*
                 * Não ultrapassa o próximo H3.
                 */

                if (
                    elemento.nextElementSibling &&
                    elemento.nextElementSibling.tagName === "H3"
                ) {

                    break;

                }


                elemento =
                    elemento.nextElementSibling;

            }

        }
    );


    /*
     * Coloca SVG na página.
     */

    mapa.innerHTML = "";

    mapa.appendChild(
        svg
    );


});
/* =========================================================
   BANCO DE QUESTÕES
========================================================= */

const bancoQuestoes = [

    /* =====================================================
       ALGORITMOS
    ===================================================== */

    {
        topico: "algoritmos",

        pergunta:
            "O que é um algoritmo?",

        alternativas: [
            "Uma sequência lógica e finita de instruções para resolver um problema.",
            "Um tipo de banco de dados.",
            "Uma linguagem de programação.",
            "Um componente físico do computador."
        ],

        correta: 0,

        explicacao:
            "Um algoritmo é uma sequência organizada e finita de passos utilizada para solucionar um problema ou executar uma tarefa."
    },


    {
        topico: "algoritmos",

        pergunta:
            "Qual é uma característica importante de um algoritmo?",

        alternativas: [
            "Deve possuir instruções infinitas.",
            "Deve ser uma sequência organizada de passos.",
            "Deve utilizar obrigatoriamente JavaScript.",
            "Deve utilizar banco de dados."
        ],

        correta: 1,

        explicacao:
            "Um algoritmo deve apresentar uma sequência organizada de instruções para alcançar determinado resultado."
    },


    {
        topico: "algoritmos",

        pergunta:
            "Antes de transformar uma solução em código, podemos utilizar:",

        alternativas: [
            "Fluxogramas e pseudocódigo.",
            "Somente imagens.",
            "Somente banco de dados.",
            "Somente sistemas operacionais."
        ],

        correta: 0,

        explicacao:
            "Fluxogramas, pseudocódigo e descrições textuais ajudam a organizar o raciocínio antes da implementação."
    },


    /* =====================================================
       ESTRUTURAS DE DADOS
    ===================================================== */

    {
        topico: "estruturas",

        pergunta:
            "Qual é a principal finalidade de uma estrutura de dados?",

        alternativas: [
            "Organizar e armazenar informações de maneira eficiente.",
            "Criar imagens.",
            "Substituir o sistema operacional.",
            "Aumentar fisicamente a memória RAM."
        ],

        correta: 0,

        explicacao:
            "Estruturas de dados organizam informações para que possam ser armazenadas, acessadas e manipuladas de maneira eficiente."
    },


    {
        topico: "estruturas",

        pergunta:
            "Qual alternativa apresenta apenas estruturas de dados?",

        alternativas: [
            "Fila, pilha e árvore.",
            "HTML, CSS e monitor.",
            "Mouse, teclado e impressora.",
            "JavaScript, Python e banco de dados."
        ],

        correta: 0,

        explicacao:
            "Fila, pilha e árvore são exemplos clássicos de estruturas de dados."
    },


    /* =====================================================
       ARRAYS
    ===================================================== */

    {
        topico: "arrays",

        pergunta:
            "Como os elementos de um array normalmente são acessados?",

        alternativas: [
            "Por índices.",
            "Por senhas.",
            "Por arquivos externos.",
            "Somente por comandos de voz."
        ],

        correta: 0,

        explicacao:
            "Arrays armazenam elementos em posições que podem ser acessadas por índices."
    },


    {
        topico: "arrays",

        pergunta:
            "Qual dos exemplos representa um array?",

        alternativas: [
            "[10, 20, 30, 40]",
            "10 + 20 + 30",
            "if (idade > 18)",
            "function calcular()"
        ],

        correta: 0,

        explicacao:
            "[10, 20, 30, 40] representa uma coleção de elementos organizada sequencialmente."
    },


    /* =====================================================
       LISTAS
    ===================================================== */

    {
        topico: "listas",

        pergunta:
            "Uma lista encadeada é formada principalmente por:",

        alternativas: [
            "Nós que armazenam dados e referências.",
            "Imagens.",
            "Arquivos de vídeo.",
            "Somente números."
        ],

        correta: 0,

        explicacao:
            "Cada nó de uma lista encadeada normalmente contém um dado e uma referência para outro nó."
    },


    {
        topico: "listas",

        pergunta:
            "Uma vantagem das listas encadeadas é:",

        alternativas: [
            "Facilitar determinadas inserções e remoções.",
            "Eliminar completamente o uso da memória.",
            "Impedir qualquer alteração nos dados.",
            "Substituir o processador."
        ],

        correta: 0,

        explicacao:
            "Dependendo da posição e da implementação, listas encadeadas podem facilitar inserções e remoções sem deslocar todos os elementos."
    },


    /* =====================================================
       PILHAS
    ===================================================== */

    {
        topico: "pilhas",

        pergunta:
            "Qual princípio é utilizado pelas pilhas?",

        alternativas: [
            "FIFO.",
            "LIFO.",
            "HTTP.",
            "HTML."
        ],

        correta: 1,

        explicacao:
            "Pilhas utilizam o princípio LIFO — Last In, First Out: o último elemento inserido é o primeiro a sair."
    },


    {
        topico: "pilhas",

        pergunta:
            "Qual situação pode utilizar uma pilha?",

        alternativas: [
            "Desfazer e refazer ações.",
            "Representar exclusivamente cidades em um mapa.",
            "Armazenar somente imagens.",
            "Criar uma página HTML."
        ],

        correta: 0,

        explicacao:
            "Pilhas podem ser utilizadas para histórico de ações, desfazer/refazer e gerenciamento de chamadas de funções."
    },


    /* =====================================================
       FILAS
    ===================================================== */

    {
        topico: "filas",

        pergunta:
            "Qual princípio é utilizado pelas filas?",

        alternativas: [
            "LIFO.",
            "FIFO.",
            "HTML.",
            "CSS."
        ],

        correta: 1,

        explicacao:
            "Filas utilizam FIFO — First In, First Out: o primeiro elemento que entra é o primeiro a sair."
    },


    {
        topico: "filas",

        pergunta:
            "Qual situação representa uma fila?",

        alternativas: [
            "Pessoas aguardando atendimento por ordem de chegada.",
            "Histórico de desfazer ações.",
            "Uma árvore de diretórios.",
            "Uma tabela de chave e valor."
        ],

        correta: 0,

        explicacao:
            "Uma fila de atendimento é um exemplo clássico de FIFO."
    },


    /* =====================================================
       ÁRVORES
    ===================================================== */

    {
        topico: "arvores",

        pergunta:
            "As árvores representam os dados de maneira:",

        alternativas: [
            "Hierárquica.",
            "Exclusivamente linear.",
            "Aleatória.",
            "Somente numérica."
        ],

        correta: 0,

        explicacao:
            "Árvores representam relações hierárquicas entre elementos."
    },


    {
        topico: "arvores",

        pergunta:
            "Em uma árvore, o nó principal é chamado de:",

        alternativas: [
            "Raiz.",
            "Fila.",
            "Índice.",
            "Aresta."
        ],

        correta: 0,

        explicacao:
            "O nó principal de uma árvore é chamado de raiz."
    },


    /* =====================================================
       GRAFOS
    ===================================================== */

    {
        topico: "grafos",

        pergunta:
            "Um grafo é formado principalmente por:",

        alternativas: [
            "Vértices e arestas.",
            "Filas e pilhas.",
            "Classes e métodos.",
            "HTML e CSS."
        ],

        correta: 0,

        explicacao:
            "Grafos são formados por vértices, que representam elementos, e arestas, que representam conexões."
    },


    {
        topico: "grafos",

        pergunta:
            "Em um mapa, as cidades podem ser representadas por:",

        alternativas: [
            "Vértices.",
            "Arestas.",
            "Índices.",
            "Pilhas."
        ],

        correta: 0,

        explicacao:
            "Em uma representação de mapa usando grafos, cidades podem ser vértices e estradas podem ser arestas."
    },


    /* =====================================================
       TABELA HASH
    ===================================================== */

    {
        topico: "hash",

        pergunta:
            "Uma tabela hash trabalha principalmente com:",

        alternativas: [
            "Chaves e valores.",
            "Somente imagens.",
            "Somente vídeos.",
            "Apenas árvores."
        ],

        correta: 0,

        explicacao:
            "Tabelas hash associam chaves a valores, permitindo localizar informações de forma eficiente quando a chave é conhecida."
    },


    {
        topico: "hash",

        pergunta:
            "Em uma agenda de contatos, o nome da pessoa pode representar:",

        alternativas: [
            "A chave.",
            "A aresta.",
            "A raiz.",
            "A fila."
        ],

        correta: 0,

        explicacao:
            "Em uma tabela hash de contatos, o nome pode funcionar como chave e o telefone como valor."
    },


    /* =====================================================
       ORDENAÇÃO
    ===================================================== */

    {
        topico: "ordenacao",

        pergunta:
            "Qual é a finalidade de um algoritmo de ordenação?",

        alternativas: [
            "Organizar dados de acordo com determinado critério.",
            "Excluir todos os dados.",
            "Criar uma rede social.",
            "Aumentar a memória RAM."
        ],

        correta: 0,

        explicacao:
            "Algoritmos de ordenação organizam elementos de acordo com um critério, como ordem crescente ou decrescente."
    },


    {
        topico: "ordenacao",

        pergunta:
            "Qual alternativa apresenta algoritmos de ordenação?",

        alternativas: [
            "Bubble Sort, Merge Sort e Quick Sort.",
            "HTML, CSS e JavaScript.",
            "FIFO, LIFO e HTTP.",
            "RAM, ROM e CPU."
        ],

        correta: 0,

        explicacao:
            "Bubble Sort, Merge Sort e Quick Sort são exemplos de algoritmos de ordenação."
    },


    /* =====================================================
       COMPLEXIDADE
    ===================================================== */

    {
        topico: "complexidade",

        pergunta:
            "O que a complexidade de tempo representa?",

        alternativas: [
            "A quantidade de operações conforme aumenta a entrada.",
            "O tamanho físico do computador.",
            "A quantidade de usuários de uma aplicação.",
            "A resolução do monitor."
        ],

        correta: 0,

        explicacao:
            "A complexidade de tempo analisa como o número de operações cresce conforme aumenta o tamanho da entrada."
    },


    {
        topico: "complexidade",

        pergunta:
            "O que representa O(n)?",

        alternativas: [
            "Um crescimento linear em relação à entrada.",
            "Um crescimento sempre constante.",
            "Uma linguagem de programação.",
            "Um tipo de banco de dados."
        ],

        correta: 0,

        explicacao:
            "O(n) representa crescimento linear. Uma busca linear, por exemplo, pode ter complexidade O(n)."
    },


    /* =====================================================
       PROGRAMAÇÃO DINÂMICA
    ===================================================== */

    {
        topico: "programacao-dinamica",

        pergunta:
            "Qual é uma característica da programação dinâmica?",

        alternativas: [
            "Armazenar resultados de subproblemas para evitar cálculos repetidos.",
            "Executar sempre os mesmos cálculos.",
            "Eliminar todas as estruturas de dados.",
            "Utilizar somente HTML."
        ],

        correta: 0,

        explicacao:
            "A programação dinâmica aproveita resultados já calculados para evitar recomputações desnecessárias."
    }

];


/* =========================================================
   VARIÁVEIS DO SISTEMA
========================================================= */

let questaoAtual = null;

let pontuacao = 0;

let totalRespondidas = 0;


/* =========================================================
   EMBARALHAR ARRAY
========================================================= */

function embaralhar(array) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
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
   ATIVIDADES AUTOMÁTICAS
   ALGORITMOS E ESTRUTURAS DE DADOS
========================================================= */


/* =========================================================
   BANCO DE QUESTÕES
========================================================= */

const bancoQuestoes = [

    {
        pergunta: "O que é um algoritmo?",

        alternativas: [
            "Uma sequência lógica e finita de instruções para resolver um problema.",
            "Um tipo de computador utilizado para armazenar dados.",
            "Um programa responsável apenas pela criação de páginas web.",
            "Um dispositivo utilizado para conectar computadores."
        ],

        resposta: 0
    },


    {
        pergunta: "O que é uma estrutura de dados?",

        alternativas: [
            "Uma linguagem de programação.",
            "Uma forma de organizar, armazenar e manipular dados.",
            "Um sistema operacional.",
            "Um tipo de navegador."
        ],

        resposta: 1
    },


    {
        pergunta: "Qual princípio é utilizado pelas filas?",

        alternativas: [
            "LIFO",
            "FIFO",
            "FILO",
            "LOOP"
        ],

        resposta: 1
    },


    {
        pergunta: "O que significa FIFO?",

        alternativas: [
            "First In, First Out",
            "First Input, Final Output",
            "Fast Input, Fast Output",
            "Final In, First Out"
        ],

        resposta: 0
    },


    {
        pergunta: "Qual princípio é utilizado pelas pilhas?",

        alternativas: [
            "FIFO",
            "LIFO",
            "FILO apenas em bancos de dados",
            "HASH"
        ],

        resposta: 1
    },


    {
        pergunta: "O que significa LIFO?",

        alternativas: [
            "Last In, First Out",
            "Last Input, Final Output",
            "Linear Input, Fast Output",
            "List In, First Out"
        ],

        resposta: 0
    },


    {
        pergunta: "Qual estrutura de dados representa informações de maneira hierárquica?",

        alternativas: [
            "Fila",
            "Pilha",
            "Árvore",
            "Array"
        ],

        resposta: 2
    },


    {
        pergunta: "Em um grafo, o que os vértices representam?",

        alternativas: [
            "As conexões entre os elementos.",
            "Os elementos ou entidades.",
            "Os algoritmos utilizados.",
            "A quantidade de memória."
        ],

        resposta: 1
    },


    {
        pergunta: "Em um grafo, o que as arestas representam?",

        alternativas: [
            "As conexões entre os elementos.",
            "Os elementos principais.",
            "Os índices dos arrays.",
            "As funções do programa."
        ],

        resposta: 0
    },


    {
        pergunta: "Qual estrutura utiliza pares de chave e valor?",

        alternativas: [
            "Fila",
            "Pilha",
            "Tabela Hash",
            "Lista encadeada"
        ],

        resposta: 2
    },


    {
        pergunta: "Para que serve um array?",

        alternativas: [
            "Para armazenar elementos organizados em posições ou índices.",
            "Para executar apenas algoritmos recursivos.",
            "Para criar exclusivamente bancos de dados.",
            "Para conectar computadores em rede."
        ],

        resposta: 0
    },


    {
        pergunta: "O que caracteriza uma lista encadeada?",

        alternativas: [
            "Seus elementos não possuem relação entre si.",
            "Cada nó pode armazenar um dado e uma referência para outro nó.",
            "Todos os dados precisam estar em posições consecutivas.",
            "Ela funciona obrigatoriamente como uma fila."
        ],

        resposta: 1
    },


    {
        pergunta: "Qual é a função de um algoritmo de ordenação?",

        alternativas: [
            "Excluir todos os dados.",
            "Organizar os dados de acordo com determinado critério.",
            "Criar uma conexão de internet.",
            "Armazenar arquivos de vídeo."
        ],

        resposta: 1
    },


    {
        pergunta: "Qual alternativa apresenta algoritmos de ordenação?",

        alternativas: [
            "HTML, CSS e JavaScript.",
            "Bubble Sort, Merge Sort e Quick Sort.",
            "FIFO, LIFO e HASH.",
            "Windows, Linux e Android."
        ],

        resposta: 1
    },


    {
        pergunta: "Para que serve um algoritmo de busca?",

        alternativas: [
            "Para localizar informações em uma estrutura de dados.",
            "Para apagar o sistema operacional.",
            "Para criar imagens.",
            "Para alterar o hardware."
        ],

        resposta: 0
    },


    {
        pergunta: "O que representa a complexidade de tempo?",

        alternativas: [
            "A quantidade de memória disponível no computador.",
            "A quantidade de operações realizadas conforme aumenta a entrada.",
            "O tamanho físico do computador.",
            "A velocidade da internet."
        ],

        resposta: 1
    },


    {
        pergunta: "O que representa a complexidade de espaço?",

        alternativas: [
            "A quantidade de memória necessária para executar um algoritmo.",
            "A quantidade de usuários de um sistema.",
            "A velocidade do processador.",
            "O número de linhas do código HTML."
        ],

        resposta: 0
    },


    {
        pergunta: "Para que serve a notação Big O?",

        alternativas: [
            "Para representar o comportamento de um algoritmo conforme a entrada cresce.",
            "Para criar interfaces gráficas.",
            "Para definir cores de um site.",
            "Para armazenar imagens."
        ],

        resposta: 0
    },


    {
        pergunta: "Uma busca linear pode apresentar qual complexidade no pior caso?",

        alternativas: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ],

        resposta: 2
    },


    {
        pergunta: "O que é recursão?",

        alternativas: [
            "Quando uma função chama a si própria para solucionar um problema.",
            "Quando um programa é executado sem nenhuma instrução.",
            "Quando os dados são sempre armazenados em arrays.",
            "Quando uma fila é transformada em árvore."
        ],

        resposta: 0
    },


    {
        pergunta: "Qual é o objetivo da programação dinâmica?",

        alternativas: [
            "Evitar computadores lentos.",
            "Dividir problemas em subproblemas e reutilizar resultados já calculados.",
            "Criar exclusivamente páginas web.",
            "Substituir todas as estruturas de dados."
        ],

        resposta: 1
    },


    {
        pergunta: "O que significa DSA?",

        alternativas: [
            "Data Structures and Algorithms.",
            "Digital System Application.",
            "Data Software Architecture.",
            "Dynamic System Algorithm."
        ],

        resposta: 0
    },


    {
        pergunta: "Qual estrutura é adequada para representar uma hierarquia de pastas?",

        alternativas: [
            "Árvore",
            "Fila",
            "Pilha",
            "Array simples"
        ],

        resposta: 0
    },


    {
        pergunta: "Qual estrutura pode representar uma rede social?",

        alternativas: [
            "Fila",
            "Grafo",
            "Pilha",
            "Array"
        ],

        resposta: 1
    },


    {
        pergunta: "Qual estrutura é muito utilizada para implementar operações de desfazer (undo)?",

        alternativas: [
            "Pilha",
            "Fila",
            "Grafo",
            "Tabela Hash"
        ],

        resposta: 0
    },


    {
        pergunta: "Qual estrutura pode organizar solicitações de usuários pela ordem de chegada?",

        alternativas: [
            "Árvore",
            "Grafo",
            "Fila",
            "Tabela Hash"
        ],

        resposta: 2
    },


    {
        pergunta: "Qual é uma característica importante de uma boa estrutura de dados?",

        alternativas: [
            "Facilitar o armazenamento e acesso eficiente aos dados.",
            "Aumentar sempre o consumo de memória.",
            "Impedir a busca de informações.",
            "Eliminar a necessidade de algoritmos."
        ],

        resposta: 0
    },


    {
        pergunta: "Por que algoritmos e estruturas de dados são importantes?",

        alternativas: [
            "Porque ajudam a criar sistemas mais eficientes, organizados e escaláveis.",
            "Porque substituem completamente os computadores.",
            "Porque servem somente para criar jogos.",
            "Porque eliminam a necessidade de programação."
        ],

        resposta: 0
    },


    {
        pergunta: "Qual alternativa apresenta apenas estruturas de dados?",

        alternativas: [
            "HTML, CSS e JavaScript.",
            "Fila, pilha, árvore e grafo.",
            "Chrome, Firefox e Edge.",
            "Python, Java e C++."
        ],

        resposta: 1
    }

];


/* =========================================================
   VARIÁVEIS
========================================================= */

let questoesAtuais = [];
let respostasUsuario = [];


/* =========================================================
   FUNÇÃO PARA EMBARALHAR ARRAY
========================================================= */

function embaralhar(array) {

    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
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
   GERAR QUESTÕES
========================================================= */

function gerarAtividades() {

    const quantidadeElemento =
        document.getElementById(
            "quantidadeQuestoes"
        );

    const quantidade =
        Number(quantidadeElemento.value);


    /* Verificação de segurança */

    if (!bancoQuestoes.length) {

        alert(
            "Não existem questões cadastradas."
        );

        return;
    }


    /* Embaralha e seleciona as questões */

    questoesAtuais = embaralhar(
        bancoQuestoes
    ).slice(
        0,
        Math.min(
            quantidade,
            bancoQuestoes.length
        )
    );


    respostasUsuario =
        new Array(
            questoesAtuais.length
        ).fill(null);


    /* Limpa resultado anterior */

    document.getElementById(
        "resultadoAtividade"
    ).innerHTML = "";


    /* Atualiza status */

    document.getElementById(
        "statusAtividade"
    ).innerHTML = `
        🎲 ${questoesAtuais.length}
        questões foram geradas aleatoriamente.
    `;


    /* Renderiza */

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


    container.innerHTML = "";


    questoesAtuais.forEach(
        (questao, indice) => {

            const alternativas =
                embaralhar(

                    questao.alternativas.map(
                        (texto, index) => ({
                            texto: texto,
                            correta:
                                index ===
                                questao.resposta
                        })
                    )

                );


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "questao";


            div.dataset.indice =
                indice;


            let html = `

                <div class="numero-questao">
                    Questão ${indice + 1}
                </div>

                <h3>
                    ${questao.pergunta}
                </h3>

                <div class="alternativas">
            `;


            alternativas.forEach(
                (alternativa, letra) => {

                    html += `

                        <label
                            class="alternativa"
                        >

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


            const inputs =
                div.querySelectorAll(
                    `input[name="questao-${indice}"]`
                );


            inputs.forEach(
                input => {

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


    /* Botão de finalizar */

    const botao =
        document.createElement(
            "button"
        );


    botao.type = "button";

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

    const questao =
        questoesAtuais[indice];


    const correta =
        valor === "true";


    respostasUsuario[indice] =
        correta;


    const feedback =
        document.getElementById(
            `feedback-${indice}`
        );


    if (correta) {

        feedback.innerHTML =
            "✅ Resposta correta!";

        feedback.className =
            "feedback correto";

    } else {

        feedback.innerHTML =
            `❌ Resposta incorreta.
             Revise o conteúdo desta questão.`;

        feedback.className =
            "feedback incorreto";
    }
}


/* =========================================================
   FINALIZAR ATIVIDADE
========================================================= */

function finalizarAtividade() {

    let respondidas = 0;
    let acertos = 0;


    respostasUsuario.forEach(
        resposta => {

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


    const resultado =
        document.getElementById(
            "resultadoAtividade"
        );


    resultado.innerHTML = `

        <h3>
            Resultado
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

    `;


    resultado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    document
        .getElementById(
            "btnNovaAtividade"
        )
        .addEventListener(
            "click",
            gerarAtividades
        );
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const botao =
            document.getElementById(
                "btnGerarAtividades"
            );


        if (botao) {

            botao.addEventListener(
                "click",
                gerarAtividades
            );

        }

    }
);
