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
   GERAR ATIVIDADE
========================================================= */

function gerarAtividade() {

    const topico =
        document.getElementById("topico").value;


    /* FILTRAR QUESTÕES */

    let questoesDisponiveis;


    if (topico === "todos") {

        questoesDisponiveis =
            bancoQuestoes;

    } else {

        questoesDisponiveis =
            bancoQuestoes.filter(
                questao =>
                    questao.topico === topico
            );

    }


    /* VERIFICAR SE EXISTEM QUESTÕES */

    if (questoesDisponiveis.length === 0) {

        document.getElementById("atividade").innerHTML = `

            <div class="atividade-erro">

                <h3>
                    ⚠️ Nenhuma questão encontrada
                </h3>

                <p>
                    Ainda não existem atividades cadastradas
                    para este tópico.
                </p>

            </div>

        `;

        return;
    }


    /* SORTEAR QUESTÃO */

    const sorteadas =
        embaralhar(
            questoesDisponiveis
        );

    questaoAtual =
        sorteadas[0];


    /* EMBARALHAR ALTERNATIVAS */

    const alternativas =
        questaoAtual.alternativas.map(
            (texto, indiceOriginal) => ({
                texto,
                indiceOriginal
            })
        );


    const alternativasEmbaralhadas =
        embaralhar(alternativas);


    /* CRIAR HTML */

    let html = `

        <div class="questao">

            <div class="cabecalho-questao">

                <span>
                    📚 ${questaoAtual.topico}
                </span>

                <span>
                    Questão aleatória
                </span>

            </div>


            <h3>
                ${questaoAtual.pergunta}
            </h3>


            <div class="alternativas">
    `;


    alternativasEmbaralhadas.forEach(
        (alternativa, indice) => {

            html += `

                <button
                    class="alternativa"
                    onclick="responder(${alternativa.indiceOriginal}, this)"
                >

                    <span class="letra">
                        ${String.fromCharCode(65 + indice)}
                    </span>

                    <span>
                        ${alternativa.texto}
                    </span>

                </button>

            `;

        }
    );


    html += `

            </div>

            <div
                id="feedback"
                class="feedback"
            ></div>

        </div>

    `;


    document.getElementById(
        "atividade"
    ).innerHTML = html;

}


/* =========================================================
   RESPONDER QUESTÃO
========================================================= */

function responder(indice, botao) {

    /* IMPEDIR DUPLA RESPOSTA */

    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach(
        botao => {
            botao.disabled = true;
        }
    );


    totalRespondidas++;


    const feedback =
        document.getElementById(
            "feedback"
        );


    /* RESPOSTA CORRETA */

    if (
        indice ===
        questaoAtual.correta
    ) {

        pontuacao++;


        botao.classList.add(
            "correta"
        );


        feedback.innerHTML = `

            <div class="feedback-correto">

                <strong>
                    ✅ Resposta correta!
                </strong>

                <p>
                    ${questaoAtual.explicacao}
                </p>

            </div>

        `;

    }

    /* RESPOSTA ERRADA */

    else {

        botao.classList.add(
            "incorreta"
        );


        botoes.forEach(
            botao => {

                const onclick =
                    botao.getAttribute(
                        "onclick"
                    );

                if (
                    onclick &&
                    onclick.includes(
                        `responder(${questaoAtual.correta},`
                    )
                ) {

                    botao.classList.add(
                        "correta"
                    );

                }

            }
        );


        feedback.innerHTML = `

            <div class="feedback-erro">

                <strong>
                    ❌ Resposta incorreta!
                </strong>

                <p>
                    ${questaoAtual.explicacao}
                </p>

            </div>

        `;

    }


    /* ATUALIZAR PLACAR */

    atualizarPlacar();


    /* BOTÃO PRÓXIMA QUESTÃO */

    feedback.innerHTML += `

        <button
            class="proxima"
            onclick="gerarAtividade()"
        >
            🎲 Próxima atividade
        </button>

    `;

}


/* =========================================================
   PLACAR
========================================================= */

function atualizarPlacar() {

    const resultado =
        document.getElementById(
            "resultado"
        );


    let porcentagem = 0;


    if (totalRespondidas > 0) {

        porcentagem =
            Math.round(
                (pontuacao /
                    totalRespondidas) *
                100
            );

    }


    resultado.innerHTML = `

        <div class="placar">

            <div>
                <strong>
                    ${pontuacao}
                </strong>

                <span>
                    Acertos
                </span>
            </div>


            <div>
                <strong>
                    ${totalRespondidas}
                </strong>

                <span>
                    Respondidas
                </span>
            </div>


            <div>
                <strong>
                    ${porcentagem}%
                </strong>

                <span>
                    Aproveitamento
                </span>
            </div>

        </div>

    `;

}
