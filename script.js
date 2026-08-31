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
    iniciarGeradorPorTopico();
    iniciarGeradorDeAtividades();
    iniciarMenuAtivo();
});


/* =========================================================
   UTILITÁRIOS
========================================================= */

function limparTexto(texto) {
    return String(texto)
        .replace(/\s+/g, " ")
        .replace(/^[•●▪\-]+\s*/, "")
        .trim();
}


function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}


function quebrarTexto(texto, tamanho = 22) {
    const palavras = texto.split(/\s+/);
    const linhas = [];

    let linhaAtual = "";

    palavras.forEach((palavra) => {
        const tentativa = linhaAtual
            ? `${linhaAtual} ${palavra}`
            : palavra;

        if (
            tentativa.length > tamanho &&
            linhaAtual
        ) {
            linhas.push(linhaAtual);
            linhaAtual = palavra;
        } else {
            linhaAtual = tentativa;
        }
    });

    if (linhaAtual) {
        linhas.push(linhaAtual);
    }

    return linhas;
}


/* =========================================================
   MAPA MENTAL
========================================================= */

function iniciarMapaMental() {
    const container =
        document.getElementById("mapa-mental");

    if (!container) {
        return;
    }

    setTimeout(() => {
        gerarMapaMental(container);
    }, 100);
}


/* =========================================================
   EXTRAIR TÓPICOS
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


    const tituloElemento =
        aula.querySelector("h2");

    let titulo =
        tituloElemento
            ? limparTexto(tituloElemento.textContent)
            : "Algoritmos e Estruturas de Dados";


    const topicos = [];

    const elementos =
        aula.querySelectorAll("h3");


    elementos.forEach((elemento) => {

        const texto =
            limparTexto(elemento.textContent);

        if (
            texto &&
            texto.length >= 3 &&
            texto.length <= 100
        ) {
            adicionarTopico(
                topicos,
                texto
            );
        }
    });


    if (topicos.length === 0) {
        return {
            titulo,
            topicos: [
                "Computador",
                "CPU",
                "Memória",
                "Entrada e saída",
                "Linguagem de máquina",
                "Bits e bytes",
                "ASCII e Unicode",
                "Programação"
            ]
        };
    }


    return {
        titulo,
        topicos: [...new Set(topicos)].slice(0, 12)
    };
}


function adicionarTopico(lista, texto) {

    texto = limparTexto(texto);

    texto = texto.replace(
        /^\d+(\.\d+)*\.?\s+/,
        ""
    );

    if (
        texto.length >= 3 &&
        texto.length <= 100
    ) {
        lista.push(texto);
    }
}


/* =========================================================
   CRIAR TEXTO SVG
========================================================= */

function adicionarTextoSVG(
    svg,
    texto,
    x,
    y,
    classe,
    tamanho = 22,
    alturaLinha = 15
) {

    const linhas =
        quebrarTexto(
            texto,
            tamanho
        );

    const textoSVG =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );

    textoSVG.setAttribute("x", x);
    textoSVG.setAttribute("y", y);
    textoSVG.setAttribute("class", classe);
    textoSVG.setAttribute(
        "text-anchor",
        "middle"
    );
    textoSVG.setAttribute(
        "dominant-baseline",
        "middle"
    );

    const inicio =
        y -
        ((linhas.length - 1) * alturaLinha) / 2;

    linhas.forEach((linha, indice) => {

        const tspan =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "tspan"
            );

        tspan.setAttribute("x", x);

        tspan.setAttribute(
            "y",
            inicio + indice * alturaLinha
        );

        tspan.textContent = linha;

        textoSVG.appendChild(tspan);
    });

    svg.appendChild(textoSVG);
}


/* =========================================================
   GERAR MAPA
========================================================= */

function gerarMapaMental(container) {

    try {

        const dados =
            extrairTopicos();

        const titulo =
            dados.titulo;

        const topicos =
            dados.topicos;


        const largura = 1200;
        const altura = 650;

        const centroX = 600;
        const centroY = 325;


        container.innerHTML = "";


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

        svg.setAttribute(
            "role",
            "img"
        );

        svg.setAttribute(
            "aria-label",
            "Mapa mental automático da aula"
        );


        /* -------------------------------------------------
           DEFINITIONS
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           GRUPO DAS LINHAS
        ------------------------------------------------- */

        const grupoLinhas =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );

        svg.appendChild(grupoLinhas);


        /* -------------------------------------------------
           GRUPO DOS NÓS
        ------------------------------------------------- */

        const grupoNos =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );

        svg.appendChild(grupoNos);


        /* -------------------------------------------------
           TÓPICOS
        ------------------------------------------------- */

        const quantidade =
            topicos.length;

        const raioX = 390;
        const raioY = 245;


        topicos.forEach((topico, indice) => {

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


            const larguraNo =
                Math.max(
                    150,
                    Math.min(
                        230,
                        topico.length * 6 + 50
                    )
                );


            const alturaNo = 70;


            /* ---------------------------------------------
               LINHA
            --------------------------------------------- */

            const linha =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            const controleX =
                (centroX + x) / 2;

            const controleY =
                (centroY + y) / 2;

            const deslocamento =
                indice % 2 === 0
                    ? 35
                    : -35;


            linha.setAttribute(
                "d",
                `
                    M ${centroX} ${centroY}
                    Q
                    ${controleX + deslocamento}
                    ${controleY}
                    ${x}
                    ${y}
                `
            );

            linha.setAttribute(
                "class",
                "linha-mapa"
            );

            grupoLinhas.appendChild(linha);


            /* ---------------------------------------------
               GRUPO
            --------------------------------------------- */

            const grupo =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                );


            /* ---------------------------------------------
               NÓ
            --------------------------------------------- */

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


            /* ---------------------------------------------
               TEXTO
            --------------------------------------------- */

            adicionarTextoSVG(
                grupo,
                topico,
                x,
                y,
                "texto-principal",
                22,
                15
            );


            grupoNos.appendChild(grupo);
        });


        /* -------------------------------------------------
           NÓ CENTRAL
        ------------------------------------------------- */

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

        grupoNos.appendChild(centro);


        /* -------------------------------------------------
           TEXTO CENTRAL
        ------------------------------------------------- */

        adicionarTextoSVG(
            grupoNos,
            titulo,
            centroX,
            centroY,
            "texto-central",
            25,
            20
        );


        container.appendChild(svg);


        console.log(
            "Mapa mental gerado:",
            topicos
        );

    } catch (erro) {

        console.error(
            "Erro ao gerar mapa mental:",
            erro
        );

        container.innerHTML = `
            <div class="carregando-mapa">
                <p>
                    Não foi possível gerar o mapa mental.
                </p>
            </div>
        `;
    }
}


/* =========================================================
   CARDS
========================================================= */

function iniciarCards() {

    const cards =
        document.querySelectorAll(".card");


    cards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {
                card.classList.toggle("ativo");
            }
        );


        card.addEventListener(
            "keydown",
            (evento) => {

                if (
                    evento.key === "Enter" ||
                    evento.key === " "
                ) {

                    evento.preventDefault();

                    card.classList.toggle(
                        "ativo"
                    );
                }
            }
        );
    });
}


/* =========================================================
   COMPATIBILIDADE
========================================================= */

function abrirCard(card) {

    if (!card) {
        return;
    }

    card.classList.toggle("ativo");
}


/* =========================================================
   BANCO DE QUESTÕES
========================================================= */

const bancoQuestoes = {

    algoritmos: [
        {
            pergunta: "O que é um algoritmo?",
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
                "LIFO — Last In, First Out. O último elemento inserido é o primeiro a sair."
        }
    ],

    filas: [
        {
            pergunta:
                "Qual princípio é utilizado por uma fila?",
            resposta:
                "FIFO — First In, First Out. O primeiro elemento inserido é o primeiro a sair."
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
   OBTER QUESTÕES
========================================================= */

function obterTodasQuestoes() {

    return Object.values(
        bancoQuestoes
    ).flat();
}


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
   GERADOR DE ATIVIDADES DA AULA
========================================================= */

function iniciarGeradorDeAtividades() {

    const botao =
        document.getElementById(
            "btnGerarAtividades"
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        "click",
        gerarListaDeAtividades
    );
}


function gerarListaDeAtividades() {

    const quantidade =
        Number(
            document.getElementById(
                "quantidadeQuestoes"
            )?.value || 10
        );


    const lista =
        document.getElementById(
            "listaQuestoes"
        );

    const resultado =
        document.getElementById(
            "resultadoAtividade"
        );

    const status =
        document.getElementById(
            "statusAtividade"
        );


    if (!lista) {
        return;
    }


    const questoes =
        embaralhar(
            obterTodasQuestoes()
        ).slice(
            0,
            quantidade
        );


    lista.innerHTML = "";

    if (resultado) {
        resultado.innerHTML = "";
    }


    if (status) {
        status.textContent =
            `${questoes.length} questão(ões) gerada(s).`;
    }


    questoes.forEach(
        (questao, indice) => {

            const elemento =
                document.createElement(
                    "article"
                );

            elemento.className =
                "questao";

            elemento.style.marginBottom =
                "15px";


            elemento.innerHTML = `
                <h3>
                    📝 Questão ${indice + 1}
                </h3>

                <p>
                    ${escaparHTML(
                        questao.pergunta
                    )}
                </p>

                <button
                    type="button"
                    class="btn-resposta"
                >
                    Mostrar resposta
                </button>

                <div class="resposta" hidden>
                    <strong>Resposta:</strong>

                    <p>
                        ${escaparHTML(
                            questao.resposta
                        )}
                    </p>
                </div>
            `;


            const botaoResposta =
                elemento.querySelector(
                    ".btn-resposta"
                );

            const resposta =
                elemento.querySelector(
                    ".resposta"
                );


            botaoResposta.addEventListener(
                "click",
                () => {

                    const aberta =
                        !resposta.hidden;

                    resposta.hidden =
                        aberta;

                    botaoResposta.textContent =
                        aberta
                            ? "Mostrar resposta"
                            : "Ocultar resposta";
                }
            );


            lista.appendChild(elemento);
        }
    );
}


/* =========================================================
   GERADOR POR TÓPICO
========================================================= */

function iniciarGeradorPorTopico() {

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


    let questoes;


    if (topico === "todos") {

        questoes =
            obterTodasQuestoes();

    } else {

        questoes =
            bancoQuestoes[topico] || [];
    }


    if (questoes.length === 0) {

        area.innerHTML = `
            <div class="atividade-inicial">
                <h3>
                    Nenhuma questão encontrada.
                </h3>
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
        <article class="questao">

            <h3>
                📝 Questão
            </h3>

            <p>
                ${escaparHTML(
                    questao.pergunta
                )}
            </p>

            <button
                type="button"
                id="btnMostrarResposta"
            >
                Mostrar resposta
            </button>

            <div
                id="respostaQuestao"
                class="resposta"
                hidden
            >
                <strong>Resposta:</strong>

                <p>
                    ${escaparHTML(
                        questao.resposta
                    )}
                </p>
            </div>

        </article>
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

                const aberta =
                    !resposta.hidden;

                resposta.hidden =
                    aberta;

                btnResposta.textContent =
                    aberta
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
            ".menu-principal a"
        );


    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    links.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        const paginaLink =
            href
                .split("/")
                .pop()
                .toLowerCase();


        if (
            paginaLink === paginaAtual ||
            (
                paginaAtual === "" &&
                paginaLink === "index.html"
            )
        ) {

            link.classList.add(
                "active"
            );
        }
    });
}
