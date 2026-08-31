/* =========================================================
   PLATAFORMA DE ESTUDO
   JAVASCRIPT PRINCIPAL
========================================================= */

"use strict";

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Plataforma de Estudo iniciada.");

    inicializarCards();

    inicializarMapaMental();

    inicializarAtividades();

    inicializarMenuAtivo();

});


/* =========================================================
   MAPA MENTAL AUTOMÁTICO
========================================================= */

function inicializarMapaMental() {

    const mapa = document.getElementById("mapa-mental");

    if (!mapa) {

        console.warn(
            "Elemento #mapa-mental não encontrado."
        );

        return;
    }

    console.log("Iniciando geração do mapa mental...");

    try {

        const texto =
            mapa.dataset.mapa ||
            "Algoritmos e Estruturas de Dados";

        gerarMapaMental(mapa, texto);

        console.log(
            "Mapa mental gerado com sucesso."
        );

    } catch (erro) {

        console.error(
            "Erro ao gerar o mapa mental:",
            erro
        );

        mapa.innerHTML = `
            <div class="erro-mapa">
                <strong>Não foi possível gerar o mapa mental.</strong>
                <span>Verifique o console do navegador para mais informações.</span>
            </div>
        `;
    }
}


/* =========================================================
   GERAR MAPA
========================================================= */

function gerarMapaMental(container, titulo) {

    /*
        Limpa o conteúdo antigo.
    */

    container.innerHTML = "";


    /*
        Dados do mapa.
        Você pode adicionar ou remover tópicos aqui.
    */

    const dados = {

        centro: titulo,

        topicos: [

            {
                titulo: "Computador",
                subtitulos: [
                    "Entrada",
                    "Saída",
                    "CPU",
                    "Memória"
                ]
            },

            {
                titulo: "Programação",
                subtitulos: [
                    "Variáveis",
                    "Dados",
                    "Instruções",
                    "Algoritmos"
                ]
            },

            {
                titulo: "Linguagem",
                subtitulos: [
                    "Bits",
                    "Bytes",
                    "ASCII",
                    "Unicode"
                ]
            },

            {
                titulo: "Estruturas",
                subtitulos: [
                    "Arrays",
                    "Listas",
                    "Pilhas",
                    "Filas"
                ]
            },

            {
                titulo: "Algoritmos",
                subtitulos: [
                    "Ordenação",
                    "Busca",
                    "Recursão",
                    "Divisão e Conquista"
                ]
            },

            {
                titulo: "Aplicações",
                subtitulos: [
                    "Sistemas",
                    "Banco de Dados",
                    "Redes",
                    "Inteligência Artificial"
                ]
            }

        ]

    };


    /*
        Dimensões do SVG.
    */

    const largura = 1200;

    const altura = 700;


    /*
        Centro do mapa.
    */

    const centroX = largura / 2;

    const centroY = altura / 2;


    /*
        Cria SVG.
    */

    const svg =
        criarElementoSVG(
            "svg",
            {
                class: "mapa-svg",
                viewBox: `0 0 ${largura} ${altura}`,
                width: largura,
                height: altura,
                role: "img",
                "aria-label":
                    `Mapa mental: ${titulo}`
            }
        );


    /*
        Definições visuais.
    */

    const defs =
        criarElementoSVG("defs");


    /*
        Gradiente do centro.
    */

    const gradienteCentro =
        criarElementoSVG(
            "linearGradient",
            {
                id: "gradienteCentro",
                x1: "0%",
                y1: "0%",
                x2: "100%",
                y2: "100%"
            }
        );

    adicionarSVG(
        gradienteCentro,
        criarElementoSVG(
            "stop",
            {
                offset: "0%",
                "stop-color": "#ff4500"
            }
        )
    );

    adicionarSVG(
        gradienteCentro,
        criarElementoSVG(
            "stop",
            {
                offset: "100%",
                "stop-color": "#ff8500"
            }
        )
    );

    adicionarSVG(
        defs,
        gradienteCentro
    );

    adicionarSVG(svg, defs);


    /*
        Camada das linhas.
    */

    const linhas =
        criarElementoSVG(
            "g",
            {
                class: "linhas-mapa"
            }
        );


    /*
        Camada dos nós.
    */

    const nos =
        criarElementoSVG(
            "g",
            {
                class: "nos-mapa"
            }
        );


    adicionarSVG(svg, linhas);

    adicionarSVG(svg, nos);


    /*
        Nó central.
    */

    const raioCentro = 105;


    const noCentral =
        criarElementoSVG(
            "circle",
            {
                cx: centroX,
                cy: centroY,
                r: raioCentro,
                class: "no-central",
                fill: "url(#gradienteCentro)"
            }
        );


    adicionarSVG(
        nos,
        noCentral
    );


    /*
        Texto do centro.
    */

    const textoCentral =
        criarTextoSVG(
            centroX,
            centroY,
            quebrarTexto(
                titulo,
                24
            ),
            "texto-central"
        );


    adicionarSVG(
        nos,
        textoCentral
    );


    /*
        Configuração dos tópicos.
    */

    const raioPrincipal = 265;

    const raioSecundario = 130;


    /*
        Quantidade de tópicos.
    */

    const quantidade =
        dados.topicos.length;


    /*
        Cria cada tópico.
    */

    dados.topicos.forEach(
        (topico, indice) => {

            /*
                Ângulo de cada tópico.
            */

            const angulo =
                (
                    indice / quantidade
                ) *
                Math.PI *
                2
                -
                Math.PI / 2;


            /*
                Coordenadas do nó principal.
            */

            const x =
                centroX +
                Math.cos(angulo) *
                raioPrincipal;


            const y =
                centroY +
                Math.sin(angulo) *
                raioPrincipal;


            /*
                Linha entre centro e tópico.
            */

            const linhaPrincipal =
                criarElementoSVG(
                    "line",
                    {
                        x1: centroX,
                        y1: centroY,
                        x2: x,
                        y2: y,
                        class: "linha-mapa"
                    }
                );


            adicionarSVG(
                linhas,
                linhaPrincipal
            );


            /*
                Grupo do tópico.
            */

            const grupo =
                criarElementoSVG(
                    "g",
                    {
                        class: "grupo-mapa"
                    }
                );


            /*
                Nó principal.
            */

            const noPrincipal =
                criarElementoSVG(
                    "circle",
                    {
                        cx: x,
                        cy: y,
                        r: 65,
                        class: "no-principal"
                    }
                );


            adicionarSVG(
                grupo,
                noPrincipal
            );


            /*
                Texto principal.
            */

            const textoPrincipal =
                criarTextoSVG(
                    x,
                    y,
                    quebrarTexto(
                        topico.titulo,
                        17
                    ),
                    "texto-principal"
                );


            adicionarSVG(
                grupo,
                textoPrincipal
            );


            /*
                Adiciona o grupo ao SVG.
            */

            adicionarSVG(
                nos,
                grupo
            );


            /*
                Cria os subtópicos.
            */

            const quantidadeSub =
                topico.subtitulos.length;


            topico.subtitulos.forEach(
                (subtitulo, subIndice) => {

                    /*
                        Distribui os subtópicos
                        ao redor do tópico.
                    */

                    const spread =
                        Math.PI * 0.85;


                    const inicio =
                        angulo -
                        spread / 2;


                    const anguloSub =
                        inicio +
                        (
                            subIndice /
                            Math.max(
                                1,
                                quantidadeSub - 1
                            )
                        ) *
                        spread;


                    /*
                        Coordenadas.
                    */

                    const subX =
                        x +
                        Math.cos(
                            anguloSub
                        ) *
                        raioSecundario;


                    const subY =
                        y +
                        Math.sin(
                            anguloSub
                        ) *
                        raioSecundario;


                    /*
                        Linha secundária.
                    */

                    const linhaSecundaria =
                        criarElementoSVG(
                            "line",
                            {
                                x1: x,
                                y1: y,
                                x2: subX,
                                y2: subY,
                                class:
                                    "linha-secundaria"
                            }
                        );


                    adicionarSVG(
                        linhas,
                        linhaSecundaria
                    );


                    /*
                        Nó secundário.
                    */

                    const noSecundario =
                        criarElementoSVG(
                            "circle",
                            {
                                cx: subX,
                                cy: subY,
                                r: 48,
                                class:
                                    "no-secundario"
                            }
                        );


                    /*
                        Grupo do subtópico.
                    */

                    const grupoSub =
                        criarElementoSVG(
                            "g",
                            {
                                class:
                                    "grupo-mapa"
                            }
                        );


                    adicionarSVG(
                        grupoSub,
                        noSecundario
                    );


                    /*
                        Texto.
                    */

                    const textoSub =
                        criarTextoSVG(
                            subX,
                            subY,
                            quebrarTexto(
                                subtitulo,
                                14
                            ),
                            "texto-secundario"
                        );


                    adicionarSVG(
                        grupoSub,
                        textoSub
                    );


                    adicionarSVG(
                        nos,
                        grupoSub
                    );

                }

            );

        }
    );


    /*
        Adiciona SVG ao container.
    */

    adicionarSVG(
        container,
        svg
    );

}


/* =========================================================
   CRIAR ELEMENTO SVG
========================================================= */

function criarElementoSVG(
    tipo,
    atributos = {}
) {

    const elemento =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            tipo
        );


    Object.entries(
        atributos
    ).forEach(
        ([chave, valor]) => {

            elemento.setAttribute(
                chave,
                valor
            );

        }
    );


    return elemento;

}


/* =========================================================
   ADICIONAR ELEMENTO SVG
========================================================= */

function adicionarSVG(
    pai,
    filho
) {

    pai.appendChild(
        filho
    );

}


/* =========================================================
   CRIAR TEXTO SVG
========================================================= */

function criarTextoSVG(
    x,
    y,
    linhas,
    classe
) {

    const texto =
        criarElementoSVG(
            "text",
            {
                x,
                y,
                class: classe
            }
        );


    /*
        Centraliza verticalmente
        quando existe mais de uma linha.
    */

    const quantidade =
        linhas.length;


    linhas.forEach(
        (linha, indice) => {

            const tspan =
                criarElementoSVG(
                    "tspan",
                    {
                        x,
                        dy:
                            indice === 0
                                ? `${-(
                                    (quantidade - 1) *
                                    0.55
                                )}em`
                                : "1.1em"
                    }
                );


            tspan.textContent =
                linha;


            adicionarSVG(
                texto,
                tspan
            );

        }
    );


    return texto;

}


/* =========================================================
   QUEBRAR TEXTO
========================================================= */

function quebrarTexto(
    texto,
    quantidadeMaxima
) {

    if (!texto) {

        return [""];
    }


    const palavras =
        texto.split(" ");


    const linhas = [];

    let linhaAtual = "";


    palavras.forEach(
        palavra => {

            const tentativa =
                linhaAtual
                    ? `${linhaAtual} ${palavra}`
                    : palavra;


            if (
                tentativa.length <=
                quantidadeMaxima
            ) {

                linhaAtual =
                    tentativa;

            } else {

                if (linhaAtual) {

                    linhas.push(
                        linhaAtual
                    );
                }

                linhaAtual =
                    palavra;
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


/* =========================================================
   CARDS
========================================================= */

function inicializarCards() {

    const cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    card.classList.toggle(
                        "ativo"
                    );

                }
            );

        }
    );

}


function abrirCard(card) {

    if (!card) {
        return;
    }

    card.classList.toggle(
        "ativo"
    );

}


/* =========================================================
   MENU ATIVO
========================================================= */

function inicializarMenuAtivo() {

    const links =
        document.querySelectorAll(
            "nav a"
        );


    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    links.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            const paginaLink =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (
                paginaLink ===
                paginaAtual
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
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

            alternativas: [
                "Um conjunto ordenado de instruções para resolver um problema.",
                "Um componente físico do computador.",
                "Um tipo de memória.",
                "Um sistema operacional."
            ],

            resposta: 0
        },

        {
            pergunta:
                "Qual é uma característica importante de um algoritmo?",

            alternativas: [
                "Possuir passos definidos.",
                "Precisar sempre usar internet.",
                "Ser obrigatoriamente escrito em Java.",
                "Ser executado somente por humanos."
            ],

            resposta: 0
        }

    ],


    estruturas: [

        {
            pergunta:
                "O que são estruturas de dados?",

            alternativas: [
                "Formas de organizar e armazenar dados.",
                "Dispositivos de entrada.",
                "Tipos de monitores.",
                "Sistemas operacionais."
            ],

            resposta: 0
        }

    ],


    arrays: [

        {
            pergunta:
                "O que caracteriza um array?",

            alternativas: [
                "Armazena elementos organizados por posições ou índices.",
                "É sempre uma árvore.",
                "Não pode armazenar números.",
                "É um dispositivo de saída."
            ],

            resposta: 0
        }

    ],


    pilhas: [

        {
            pergunta:
                "Qual princípio é utilizado por uma pilha?",

            alternativas: [
                "LIFO.",
                "FIFO.",
                "HTTP.",
                "ASCII."
            ],

            resposta: 0
        }

    ],


    filas: [

        {
            pergunta:
                "Qual princípio normalmente caracteriza uma fila?",

            alternativas: [
                "FIFO.",
                "LIFO.",
                "CPU.",
                "RAM."
            ],

            resposta: 0
        }

    ],


    complexidade: [

        {
            pergunta:
                "O que a análise de complexidade permite avaliar?",

            alternativas: [
                "O consumo de tempo e espaço de um algoritmo.",
                "A cor do computador.",
                "O tamanho do monitor.",
                "A velocidade da internet."
            ],

            resposta: 0
        }

    ]

};


/* =========================================================
   ATIVIDADES
========================================================= */

function inicializarAtividades() {

    const botao =
        document.getElementById(
            "btnGerarAtividadeTopico"
        );


    if (botao) {

        botao.addEventListener(
            "click",
            gerarAtividadeTopico
        );

    }


    const botaoQuestoes =
        document.getElementById(
            "btnGerarAtividades"
        );


    if (botaoQuestoes) {

        botaoQuestoes.addEventListener(
            "click",
            gerarListaQuestoes
        );

    }

}


/* =========================================================
   GERAR ATIVIDADE POR TÓPICO
========================================================= */

function gerarAtividadeTopico() {

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
        ).forEach(
            lista => {

                questoes =
                    questoes.concat(
                        lista
                    );

            }
        );

    } else {

        questoes =
            bancoQuestoes[
                topico
            ] || [];

    }


    if (
        questoes.length === 0
    ) {

        area.innerHTML = `
            <div class="atividade-inicial">
                <span>📚</span>
                <h3>Nenhuma questão disponível</h3>
                <p>
                    Ainda não existem questões cadastradas
                    para este tópico.
                </p>
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


    resultado.innerHTML = "";


    area.innerHTML = `
        <div class="questao-gerada">

            <h3>
                ${escaparHTML(
                    questao.pergunta
                )}
            </h3>

            <div class="alternativas">

                ${questao.alternativas
                    .map(
                        (alternativa, indice) => `
                            <button
                                type="button"
                                class="alternativa"
                                data-indice="${indice}"
                            >
                                ${escaparHTML(
                                    alternativa
                                )}
                            </button>
                        `
                    )
                    .join("")
                }

            </div>

        </div>
    `;


    const alternativas =
        area.querySelectorAll(
            ".alternativa"
        );


    alternativas.forEach(
        botaoAlternativa => {

            botaoAlternativa.addEventListener(
                "click",
                () => {

                    const indice =
                        Number(
                            botaoAlternativa
                                .dataset
                                .indice
                        );


                    alternativas.forEach(
                        botao => {

                            botao.disabled =
                                true;

                        }
                    );


                    if (
                        indice ===
                        questao.resposta
                    ) {

                        botaoAlternativa.style
                            .background =
                            "#16a34a";

                        resultado.innerHTML = `
                            <strong style="color:#16a34a;">
                                ✅ Resposta correta!
                            </strong>
                        `;

                    } else {

                        botaoAlternativa.style
                            .background =
                            "#dc2626";


                        alternativas[
                            questao.resposta
                        ].style.background =
                            "#16a34a";


                        resultado.innerHTML = `
                            <strong style="color:#dc2626;">
                                ❌ Resposta incorreta.
                            </strong>
                        `;

                    }

                }
            );

        }
    );

}


/* =========================================================
   GERAR LISTA DE QUESTÕES
========================================================= */

function gerarListaQuestoes() {

    const quantidadeSelect =
        document.getElementById(
            "quantidadeQuestoes"
        );


    const lista =
        document.getElementById(
            "listaQuestoes"
        );


    const status =
        document.getElementById(
            "statusAtividade"
        );


    if (
        !quantidadeSelect ||
        !lista
    ) {

        return;
    }


    const quantidade =
        Number(
            quantidadeSelect.value
        );


    let todas = [];


    Object.values(
        bancoQuestoes
    ).forEach(
        grupo => {

            todas =
                todas.concat(
                    grupo
                );

        }
    );


    todas =
        embaralhar(
            todas
        );


    const selecionadas =
        todas.slice(
            0,
            Math.min(
                quantidade,
                todas.length
            )
        );


    lista.innerHTML =
        selecionadas
            .map(
                (questao, indice) => `

                    <div
                        class="questao-item"
                        style="
                            background:#fff;
                            padding:20px;
                            margin-bottom:15px;
                            border-radius:12px;
                            border:1px solid #e2e8f0;
                        "
                    >

                        <h3>
                            ${indice + 1}.
                            ${escaparHTML(
                                questao.pergunta
                            )}
                        </h3>

                        ${questao.alternativas
                            .map(
                                alternativa => `
                                    <p>
                                        ○
                                        ${escaparHTML(
                                            alternativa
                                        )}
                                    </p>
                                `
                            )
                            .join("")
                        }

                    </div>

                `
            )
            .join("");


    if (status) {

        status.textContent =
            `${selecionadas.length} questão(ões) gerada(s).`;

    }

}


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
        ] =
        [
            copia[j],
            copia[i]
        ];

    }


    return copia;

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escaparHTML(texto) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        texto;


    return div.innerHTML;

}
