/* =========================================================
   PLATAFORMA DE ESTUDO
   JAVASCRIPT PRINCIPAL
========================================================= */

"use strict";


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    iniciarCards();

    iniciarMapaMental();

    iniciarAtividades();

    iniciarMenuAtivo();

});


/* =========================================================
   MAPA MENTAL AUTOMÁTICO
========================================================= */

function iniciarMapaMental() {

    const container =
        document.getElementById("mapa-mental");

    if (!container) {
        return;
    }


    /*
       Pequeno atraso para garantir que o conteúdo
       da página já esteja totalmente disponível.
    */

    setTimeout(() => {

        gerarMapaMental(container);

    }, 100);

}


/* =========================================================
   EXTRAIR TÓPICOS DA AULA
========================================================= */

function extrairTopicos() {

    const aula =
        document.querySelector(
            ".aula-conteudo"
        );

    if (!aula) {

        return {
            titulo: "Algoritmos e Estruturas de Dados",
            topicos: []
        };

    }


    /* -----------------------------------------------------
       TÍTULO PRINCIPAL
    ----------------------------------------------------- */

    const h2 =
        aula.querySelector("h2");


    let titulo =
        h2
            ? h2.textContent.trim()
            : "Algoritmos e Estruturas de Dados";


    /*
       Limita o tamanho do título para o mapa.
    */

    titulo =
        limparTexto(titulo);


    /* -----------------------------------------------------
       LISTA DE TÓPICOS
    ----------------------------------------------------- */

    const topicos = [];

    const elementos =
        aula.querySelectorAll(
            "h3, p"
        );


    elementos.forEach(elemento => {

        let texto =
            elemento.textContent
                .replace(/\s+/g, " ")
                .trim();


        if (!texto) {
            return;
        }


        /*
           Ignora parágrafos muito grandes.
        */

        if (texto.length > 120) {
            return;
        }


        /* -------------------------------------------------
           H3
        ------------------------------------------------- */

        if (
            elemento.tagName.toLowerCase() === "h3"
        ) {

            adicionarTopico(
                topicos,
                texto
            );

            return;
        }


        /* -------------------------------------------------
           PARÁGRAFOS COM TÍTULOS NUMERADOS
           
           Exemplo:
           
           1. Organização Básica de um Computador
           1.1 Unidade de Entrada
           3. Linguagem de Máquina
        ------------------------------------------------- */

        if (
            /^\d+(\.\d+)*\.?\s+/.test(texto)
        ) {

            texto =
                texto.replace(
                    /^\d+(\.\d+)*\.?\s+/,
                    ""
                );

            adicionarTopico(
                topicos,
                texto
            );

            return;
        }


        /* -------------------------------------------------
           PARÁGRAFOS EM NEGRITO
        ------------------------------------------------- */

        const strong =
            elemento.querySelector("strong");


        if (
            strong &&
            strong.textContent.trim().length > 3
        ) {

            let tituloStrong =
                strong.textContent
                    .replace(/\s+/g, " ")
                    .trim();


            tituloStrong =
                tituloStrong
                    .replace(
                        /^\d+(\.\d+)*\.?\s+/,
                        ""
                    );


            adicionarTopico(
                topicos,
                tituloStrong
            );

        }

    });


    /*
       Se não encontrar tópicos,
       cria tópicos padrão.
    */

    if (topicos.length === 0) {

        topicos.push(
            "Computador",
            "CPU",
            "Memória",
            "Entrada e saída",
            "Linguagem de máquina",
            "Bits e bytes",
            "ASCII e Unicode",
            "Programação"
        );

    }


    /*
       Remove duplicados.
    */

    const unicos =
        [...new Set(topicos)];


    return {

        titulo,

        topicos:
            unicos.slice(0, 12)

    };

}


/* =========================================================
   ADICIONAR TÓPICO
========================================================= */

function adicionarTopico(lista, texto) {

    texto =
        limparTexto(texto);


    if (!texto) {
        return;
    }


    /*
       Não aceita textos extremamente curtos.
    */

    if (texto.length < 3) {
        return;
    }


    /*
       Não aceita parágrafos que parecem conteúdo
       normal em vez de título.
    */

    if (texto.length > 100) {
        return;
    }


    lista.push(texto);
}


/* =========================================================
   LIMPAR TEXTO
========================================================= */

function limparTexto(texto) {

    return texto
        .replace(/\s+/g, " ")
        .replace(/^[•●▪\-]+\s*/, "")
        .trim();
}


/* =========================================================
   QUEBRAR TEXTO EM LINHAS
========================================================= */

function quebrarTexto(texto, tamanho) {

    const palavras =
        texto.split(" ");

    const linhas = [];

    let linha = "";


    palavras.forEach(palavra => {

        const tentativa =
            linha
                ? linha + " " + palavra
                : palavra;


        if (
            tentativa.length > tamanho &&
            linha
        ) {

            linhas.push(linha);

            linha = palavra;

        } else {

            linha = tentativa;

        }

    });


    if (linha) {

        linhas.push(linha);

    }


    return linhas;
}


/* =========================================================
   ESCAPAR HTML/SVG
========================================================= */

function escaparSVG(texto) {

    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   CRIAR TEXTO SVG
========================================================= */

function criarTextoSVG(
    texto,
    x,
    y,
    classe,
    tamanhoMaximo
) {

    const linhas =
        quebrarTexto(
            texto,
            tamanhoMaximo
        );


    let resultado = "";


    const altura =
        classe === "texto-central"
            ? 20
            : 15;


    const inicio =
        y -
        ((linhas.length - 1) * altura) / 2;


    linhas.forEach(
        (linha, indice) => {

            resultado += `
                <text
                    x="${x}"
                    y="${inicio + indice * altura}"
                    class="${classe}"
                >
                    ${escaparSVG(linha)}
                </text>
            `;

        }
    );


    return resultado;
}


/* =========================================================
   GERAR MAPA MENTAL
========================================================= */

function gerarMapaMental(container) {

    try {

        const dados =
            extrairTopicos();


        const titulo =
            dados.titulo;


        const topicos =
            dados.topicos;


        /*
           Dimensões do mapa.
        */

        const largura = 1200;

        const altura = 650;


        /*
           Centro do mapa.
        */

        const centroX = 600;

        const centroY = 325;


        /*
           Limpa o carregamento.
        */

        container.innerHTML = "";


        /*
           Cria SVG.
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


        svg.setAttribute(
            "width",
            largura
        );


        svg.setAttribute(
            "height",
            altura
        );


        svg.setAttribute(
            "role",
            "img"
        );


        svg.setAttribute(
            "aria-label",
            "Mapa mental automático da aula"
        );


        /* =================================================
           DEFINITIONS
        ================================================= */

        const defs =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "defs"
            );


        const sombra =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "filter"
            );


        sombra.setAttribute(
            "id",
            "sombraMapa"
        );


        sombra.innerHTML = `
            <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="5"
                flood-color="#ff6b00"
                flood-opacity="0.25"
            />
        `;


        defs.appendChild(sombra);

        svg.appendChild(defs);


        /* =================================================
           GRUPO DAS LINHAS
        ================================================= */

        const grupoLinhas =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );


        grupoLinhas.setAttribute(
            "class",
            "linhas-mapa"
        );


        svg.appendChild(grupoLinhas);


        /* =================================================
           GRUPO DOS NÓS
        ================================================= */

        const grupoNos =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );


        grupoNos.setAttribute(
            "class",
            "nos-mapa"
        );


        svg.appendChild(grupoNos);


        /* =================================================
           CONFIGURAÇÃO DOS NÓS
        ================================================= */

        const quantidade =
            topicos.length;


        /*
           Distribui os tópicos em volta do centro.
        */

        const raioX = 390;

        const raioY = 245;


        topicos.forEach(
            (topico, indice) => {

                const angulo =
                    (-Math.PI / 2) +
                    (
                        indice *
                        (Math.PI * 2) /
                        quantidade
                    );


                const x =
                    centroX +
                    Math.cos(angulo) *
                    raioX;


                const y =
                    centroY +
                    Math.sin(angulo) *
                    raioY;


                /*
                   Determina o tamanho do nó.
                */

                const larguraNo =
                    Math.max(
                        150,
                        Math.min(
                            230,
                            topico.length * 6 + 50
                        )
                    );


                const alturaNo =
                    70;


                /* -----------------------------------------
                   LINHA
                ----------------------------------------- */

                const linha =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );


                /*
                   Curva de Bézier.
                */

                const controleX =
                    (centroX + x) / 2;


                const controleY =
                    (centroY + y) / 2;


                const deslocamento =
                    indice % 2 === 0
                        ? 35
                        : -35;


                const caminho = `
                    M ${centroX} ${centroY}
                    Q
                    ${controleX + deslocamento}
                    ${controleY}
                    ${x}
                    ${y}
                `;


                linha.setAttribute(
                    "d",
                    caminho
                );


                linha.setAttribute(
                    "class",
                    "linha-mapa"
                );


                grupoLinhas.appendChild(linha);


                /* -----------------------------------------
                   NÓ PRINCIPAL
                ----------------------------------------- */

                const grupo =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "g"
                    );


                grupo.setAttribute(
                    "class",
                    "no-grupo"
                );


                /* -----------------------------------------
                   RETÂNGULO
                ----------------------------------------- */

                const no =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "rect"
                    );


                no.setAttribute(
                    "x",
                    x - larguraNo / 2
                );


                no.setAttribute(
                    "y",
                    y - alturaNo / 2
                );


                no.setAttribute(
                    "width",
                    larguraNo
                );


                no.setAttribute(
                    "height",
                    alturaNo
                );


                no.setAttribute(
                    "rx",
                    18
                );


                no.setAttribute(
                    "class",
                    "no-principal"
                );


                no.setAttribute(
                    "filter",
                    "url(#sombraMapa)"
                );


                grupo.appendChild(no);


                /* -----------------------------------------
                   TEXTO
                ----------------------------------------- */

                const textoSVG =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "text"
                    );


                textoSVG.setAttribute(
                    "x",
                    x
                );


                textoSVG.setAttribute(
                    "y",
                    y
                );


                textoSVG.setAttribute(
                    "class",
                    "texto-principal"
                );


                textoSVG.setAttribute(
                    "text-anchor",
                    "middle"
                );


                textoSVG.setAttribute(
                    "dominant-baseline",
                    "middle"
                );


                const linhas =
                    quebrarTexto(
                        topico,
                        22
                    );


                const alturaLinha = 15;


                const inicio =
                    y -
                    (
                        (linhas.length - 1) *
                        alturaLinha
                    ) / 2;


                linhas.forEach(
                    (linhaTexto, i) => {

                        const tspan =
                            document.createElementNS(
                                "http://www.w3.org/2000/svg",
                                "tspan"
                            );


                        tspan.setAttribute(
                            "x",
                            x
                        );


                        tspan.setAttribute(
                            "y",
                            inicio +
                            i *
                            alturaLinha
                        );


                        tspan.textContent =
                            linhaTexto;


                        textoSVG.appendChild(
                            tspan
                        );

                    }
                );


                grupo.appendChild(
                    textoSVG
                );


                grupoNos.appendChild(
                    grupo
                );

            }
        );


        /* =================================================
           NÓ CENTRAL
        ================================================= */

        const centro =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );


        centro.setAttribute(
            "x",
            centroX - 150
        );


        centro.setAttribute(
            "y",
            centroY - 75
        );


        centro.setAttribute(
            "width",
            300
        );


        centro.setAttribute(
            "height",
            150
        );


        centro.setAttribute(
            "rx",
            30
        );


        centro.setAttribute(
            "class",
            "no-central"
        );


        centro.setAttribute(
            "filter",
            "url(#sombraMapa)"
        );


        grupoNos.appendChild(
            centro
        );


        /* =================================================
           TEXTO CENTRAL
        ================================================= */

        const textoCentral =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );


        textoCentral.setAttribute(
            "x",
            centroX
        );


        textoCentral.setAttribute(
            "y",
            centroY
        );


        textoCentral.setAttribute(
            "class",
            "texto-central"
        );


        textoCentral.setAttribute(
            "text-anchor",
            "middle"
        );


        textoCentral.setAttribute(
            "dominant-baseline",
            "middle"
        );


        const linhasCentro =
            quebrarTexto(
                titulo,
                25
            );


        const alturaCentro = 20;


        const inicioCentro =
            centroY -
            (
                (linhasCentro.length - 1) *
                alturaCentro
            ) / 2;


        linhasCentro.forEach(
            (linhaTexto, i) => {

                const tspan =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "tspan"
                    );


                tspan.setAttribute(
                    "x",
                    centroX
                );


                tspan.setAttribute(
                    "y",
                    inicioCentro +
                    i *
                    alturaCentro
                );


                tspan.textContent =
                    linhaTexto;


                textoCentral.appendChild(
                    tspan
                );

            }
        );


        grupoNos.appendChild(
            textoCentral
        );


        /* =================================================
           INSERE SVG
        ================================================= */

        container.appendChild(svg);


        /*
           Mensagem de sucesso no console.
        */

        console.log(
            "Mapa mental gerado automaticamente:",
            topicos
        );

    } catch (erro) {

        console.error(
            "Erro ao gerar o mapa mental:",
            erro
        );


        container.innerHTML = `
            <p class="carregando-mapa">
                Não foi possível gerar o mapa mental.
            </p>
        `;

    }

}


/* =========================================================
   CARDS
========================================================= */

function iniciarCards() {

    const cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "ativo"
                );

            }
        );

    });

}


/* =========================================================
   FUNÇÃO COMPATÍVEL COM onclick="abrirCard(this)"
========================================================= */

function abrirCard(card) {

    if (!card) {
        return;
    }


    card.classList.toggle(
        "ativo"
    );

}


/* =========================================================
   ATIVIDADES
========================================================= */

function iniciarAtividades() {

    const botao =
        document.getElementById(
            "btnGerarAtividadeTopico"
        );


    if (!botao) {
        return;
    }


    botao.addEventListener(
        "click",
        gerarAtividade
    );

}


/* =========================================================
   BANCO DE QUESTÕES
========================================================= */

const bancoQuestoes = {

    algoritmos: [

        {
            pergunta:
                "O que é um algoritmo?",

            resposta:
                "É uma sequência organizada de instruções utilizada para resolver um problema ou executar uma tarefa."
        },

        {
            pergunta:
                "Qual é uma característica importante de um bom algoritmo?",

            resposta:
                "Ele deve possuir passos claros, organizados e capazes de produzir uma solução para o problema."
        }

    ],


    estruturas: [

        {
            pergunta:
                "O que são estruturas de dados?",

            resposta:
                "São formas de organizar, armazenar e manipular dados de maneira adequada para determinada aplicação."
        }

    ],


    arrays: [

        {
            pergunta:
                "O que é um array?",

            resposta:
                "É uma estrutura que armazena vários elementos organizados em posições indexadas."
        }

    ],


    listas: [

        {
            pergunta:
                "O que é uma lista encadeada?",

            resposta:
                "É uma estrutura formada por nós, normalmente contendo dados e referências para outros nós."
        }

    ],


    pilhas: [

        {
            pergunta:
                "Qual princípio é utilizado por uma pilha?",

            resposta:
                "LIFO — Last In, First Out, ou seja, o último elemento inserido é o primeiro a sair."
        }

    ],


    filas: [

        {
            pergunta:
                "Qual princípio é utilizado por uma fila?",

            resposta:
                "FIFO — First In, First Out, ou seja, o primeiro elemento inserido é o primeiro a sair."
        }

    ],


    arvores: [

        {
            pergunta:
                "O que é uma árvore em estruturas de dados?",

            resposta:
                "É uma estrutura não linear formada por nós organizados de maneira hierárquica."
        }

    ],


    grafos: [

        {
            pergunta:
                "O que é um grafo?",

            resposta:
                "É uma estrutura formada por vértices e arestas utilizada para representar relações entre elementos."
        }

    ],


    hash: [

        {
            pergunta:
                "Para que serve uma tabela hash?",

            resposta:
                "Para armazenar e localizar informações utilizando uma função de espalhamento."
        }

    ],


    ordenacao: [

        {
            pergunta:
                "Qual é o objetivo de um algoritmo de ordenação?",

            resposta:
                "Organizar elementos de acordo com determinado critério."
        }

    ],


    complexidade: [

        {
            pergunta:
                "O que a notação Big O representa?",

            resposta:
                "Representa uma forma de analisar como o custo de um algoritmo cresce em relação ao tamanho da entrada."
        }

    ],


    "programacao-dinamica": [

        {
            pergunta:
                "O que é programação dinâmica?",

            resposta:
                "É uma técnica que resolve problemas dividindo-os em subproblemas e armazenando resultados para evitar cálculos repetidos."
        }

    ]

};


/* =========================================================
   GERAR ATIVIDADE
========================================================= */

function gerarAtividade() {

    const select =
        document.getElementById(
            "topico"
        );


    const area =
        document.getElementById(
            "atividade"
        );


    const resultado =
        document.getElementById(
            "resultado"
        );


    if (!select || !area) {
        return;
    }


    const topico =
        select.value;


    let questoes = [];


    if (
        topico === "todos"
    ) {

        Object.values(
            bancoQuestoes
        ).forEach(lista => {

            questoes =
                questoes.concat(lista);

        });

    } else {

        questoes =
            bancoQuestoes[topico] || [];

    }


    if (
        questoes.length === 0
    ) {

        area.innerHTML = `
            <div class="atividade-inicial">
                <h3>Nenhuma questão encontrada.</h3>
            </div>
        `;

        return;
    }


    const questao =
        questoes[
            Math.floor(
                Math.random() *
                questoes.length
            )
        ];


    area.innerHTML = `
        <div class="questao">
            
            <h3>
                📝 Questão
            </h3>

            <p>
                ${questao.pergunta}
            </p>

            <button
                type="button"
                id="btnMostrarResposta"
            >
                Mostrar resposta
            </button>

            <div
                id="respostaQuestao"
                style="
                    display:none;
                    margin-top:20px;
                    padding:20px;
                    background:#fff3e6;
                    border-left:4px solid #ff6b00;
                    border-radius:10px;
                "
            >
                <strong>Resposta:</strong>

                <p>
                    ${questao.resposta}
                </p>
            </div>

        </div>
    `;


    if (resultado) {

        resultado.innerHTML = "";

    }


    const btnResposta =
        document.getElementById(
            "btnMostrarResposta"
        );


    const resposta =
        document.getElementById(
            "respostaQuestao"
        );


    if (
        btnResposta &&
        resposta
    ) {

        btnResposta.addEventListener(
            "click",
            () => {

                resposta.style.display =
                    resposta.style.display === "none"
                        ? "block"
                        : "none";


                btnResposta.textContent =
                    resposta.style.display === "none"
                        ? "Mostrar resposta"
                        : "Ocultar resposta";

            }
        );

    }

}


/* =========================================================
   MENU ATIVO
========================================================= */

function iniciarMenuAtivo() {

    const links =
        document.querySelectorAll(
            "nav a"
        );


    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    links.forEach(link => {

        const href =
            link
                .getAttribute("href");


        if (!href) {
            return;
        }


        const paginaLink =
            href
                .split("/")
                .pop()
                .toLowerCase();


        if (
            paginaLink === paginaAtual
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}
