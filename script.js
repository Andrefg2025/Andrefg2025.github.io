/* ============================================================
   PLATAFORMA DE ESTUDO
   SCRIPT PRINCIPAL
============================================================ */


/* ============================================================
   INICIALIZAÇÃO
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    gerarMapaMental();

    configurarCards();

    configurarAtividades();

});



/* ============================================================
   MAPA MENTAL AUTOMÁTICO
============================================================ */

function gerarMapaMental() {

    const mapa = document.getElementById("mapa-mental");

    if (!mapa) {

        console.warn(
            "Elemento #mapa-mental não encontrado."
        );

        return;
    }


    /*
        Localiza a aula principal.
    */

    const aula = document.querySelector(
        "[data-mapa-aula]"
    );


    if (!aula) {

        mapa.innerHTML = `
            <div class="erro-mapa">
                Não foi possível localizar o conteúdo da aula.
            </div>
        `;

        return;
    }


    /*
        Procura os títulos da aula.
    */

    const titulos = aula.querySelectorAll(
        ".conteudo-estudo h3"
    );


    if (!titulos.length) {

        mapa.innerHTML = `
            <div class="erro-mapa">
                Nenhum tópico foi encontrado para criar o mapa.
            </div>
        `;

        return;
    }


    /*
        Remove duplicações.
    */

    const topicos = [];

    titulos.forEach((titulo) => {

        const texto = titulo.textContent
            .replace(/\s+/g, " ")
            .trim();


        if (
            texto &&
            !topicos.includes(texto)
        ) {

            topicos.push(texto);

        }

    });


    /*
        Nome principal do mapa.
    */

    const tituloPrincipal =
        "Algoritmos e Estruturas de Dados";


    /*
        Monta o HTML do mapa.
    */

    let html = `

        <div class="mapa">

            <div class="no central">

                <span>
                    🧠
                </span>

                ${tituloPrincipal}

            </div>

            <div class="conexoes">

    `;


    topicos.forEach((topico, index) => {

        const classe =
            index % 2 === 0
                ? "ramo-esquerdo"
                : "ramo-direito";


        html += `

            <div class="ramo ${classe}">

                <div class="linha"></div>

                <div
                    class="no topico"
                    data-indice="${index}"
                >

                    ${escapeHTML(topico)}

                </div>

            </div>

        `;

    });


    html += `

            </div>

        </div>

    `;


    mapa.innerHTML = html;


    /*
        Adiciona interação aos tópicos.
    */

    configurarInteracaoMapa();

}



/* ============================================================
   INTERAÇÃO DO MAPA
============================================================ */

function configurarInteracaoMapa() {

    const nos =
        document.querySelectorAll(
            ".mapa .topico"
        );


    nos.forEach((no) => {

        no.addEventListener(
            "click",
            () => {

                const indice =
                    Number(
                        no.dataset.indice
                    );


                const titulos =
                    document.querySelectorAll(
                        ".conteudo-estudo h3"
                    );


                const titulo =
                    titulos[indice];


                if (!titulo) {
                    return;
                }


                /*
                    Faz o navegador ir até o conteúdo.
                */

                titulo.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                /*
                    Destaca o título.
                */

                titulo.classList.add(
                    "titulo-destaque"
                );


                setTimeout(() => {

                    titulo.classList.remove(
                        "titulo-destaque"
                    );

                }, 1800);

            }
        );

    });

}



/* ============================================================
   ESCAPAR HTML
============================================================ */

function escapeHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}



/* ============================================================
   CARDS
============================================================ */

function configurarCards() {

    const cards =
        document.querySelectorAll(
            ".card"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                abrirCard(card);

            }
        );

    });

}



function abrirCard(card) {

    if (!card) {
        return;
    }


    /*
        Fecha outros cards.
    */

    document
        .querySelectorAll(".card.ativo")
        .forEach((outroCard) => {

            if (outroCard !== card) {

                outroCard.classList.remove(
                    "ativo"
                );

            }

        });


    /*
        Abre ou fecha o card clicado.
    */

    card.classList.toggle(
        "ativo"
    );

}



/* ============================================================
   ATIVIDADES
============================================================ */

function configurarAtividades() {

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


    const botaoTopico =
        document.getElementById(
            "btnGerarAtividadeTopico"
        );


    if (botaoTopico) {

        botaoTopico.addEventListener(
            "click",
            gerarAtividadeTopico
        );

    }

}



/* ============================================================
   BANCO DE QUESTÕES
============================================================ */

const bancoQuestoes = [

    {
        pergunta:
            "O que é um algoritmo?",

        alternativas: [
            "Um conjunto de instruções para resolver um problema",
            "Um componente físico do computador",
            "Um tipo de memória",
            "Um dispositivo de entrada"
        ],

        correta: 0,

        topico: "algoritmos"
    },


    {
        pergunta:
            "Qual componente é responsável por executar instruções?",

        alternativas: [
            "Monitor",
            "CPU",
            "Teclado",
            "Impressora"
        ],

        correta: 1,

        topico: "algoritmos"
    },


    {
        pergunta:
            "Qual memória é considerada volátil?",

        alternativas: [
            "SSD",
            "HD",
            "RAM",
            "DVD"
        ],

        correta: 2,

        topico: "complexidade"
    },


    {
        pergunta:
            "Quantos bits existem em um byte?",

        alternativas: [
            "2",
            "4",
            "8",
            "16"
        ],

        correta: 2,

        topico: "estruturas"
    },


    {
        pergunta:
            "Qual estrutura utiliza o princípio LIFO?",

        alternativas: [
            "Fila",
            "Pilha",
            "Árvore",
            "Grafo"
        ],

        correta: 1,

        topico: "pilhas"
    },


    {
        pergunta:
            "Qual estrutura utiliza o princípio FIFO?",

        alternativas: [
            "Pilha",
            "Fila",
            "Árvore",
            "Hash"
        ],

        correta: 1,

        topico: "filas"
    },


    {
        pergunta:
            "Qual algoritmo divide o problema em partes menores e depois combina os resultados?",

        alternativas: [
            "Merge Sort",
            "Selection Sort",
            "Linear Search",
            "Bubble Search"
        ],

        correta: 0,

        topico: "ordenacao"
    },


    {
        pergunta:
            "Qual estrutura possui uma organização hierárquica?",

        alternativas: [
            "Árvore",
            "Fila",
            "Array",
            "Pilha"
        ],

        correta: 0,

        topico: "arvores"
    },


    {
        pergunta:
            "Qual padrão é amplamente utilizado atualmente para representar textos Unicode?",

        alternativas: [
            "UTF-8",
            "ASCII-1",
            "RAM",
            "CPU"
        ],

        correta: 0,

        topico: "algoritmos"
    },


    {
        pergunta:
            "Qual é a função principal de uma estrutura de dados?",

        alternativas: [
            "Organizar e armazenar dados",
            "Aumentar a tensão elétrica",
            "Substituir a CPU",
            "Produzir energia"
        ],

        correta: 0,

        topico: "estruturas"
    }

];



/* ============================================================
   EMBARALHAR ARRAY
============================================================ */

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
                Math.random() * (i + 1)
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



/* ============================================================
   GERAR ATIVIDADES
============================================================ */

function gerarAtividades() {

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
            bancoQuestoes
        ).slice(
            0,
            Math.min(
                quantidade,
                bancoQuestoes.length
            )
        );


    lista.innerHTML = "";

    resultado.innerHTML = "";


    status.textContent =
        `${questoes.length} questões geradas.`;


    questoes.forEach(
        (questao, indice) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "questao";


            let alternativas = "";


            questao.alternativas.forEach(
                (alternativa, i) => {

                    alternativas += `

                        <label class="alternativa">

                            <input
                                type="radio"
                                name="questao-${indice}"
                                value="${i}"
                            >

                            <span>
                                ${escapeHTML(alternativa)}
                            </span>

                        </label>

                    `;

                }
            );


            div.innerHTML = `

                <h3>
                    ${indice + 1}. 
                    ${escapeHTML(questao.pergunta)}
                </h3>

                <div class="alternativas">

                    ${alternativas}

                </div>

            `;


            lista.appendChild(div);

        });


    const botao =
        document.createElement(
            "button"
        );


    botao.type =
        "button";


    botao.className =
        "btn-gerar";


    botao.textContent =
        "✅ Corrigir Atividade";


    botao.addEventListener(
        "click",
        () => {

            corrigirAtividade(
                questoes
            );

        }
    );


    lista.appendChild(botao);

}



/* ============================================================
   CORRIGIR ATIVIDADE
============================================================ */

function corrigirAtividade(
    questoes
) {

    let acertos = 0;


    questoes.forEach(
        (questao, indice) => {

            const resposta =
                document.querySelector(
                    `input[name="questao-${indice}"]:checked`
                );


            if (
                resposta &&
                Number(resposta.value)
                === questao.correta
            ) {

                acertos++;

            }

        }
    );


    const porcentagem =
        Math.round(
            (acertos / questoes.length) * 100
        );


    const resultado =
        document.getElementById(
            "resultadoAtividade"
        );


    if (!resultado) {
        return;
    }


    let mensagem;


    if (porcentagem >= 80) {

        mensagem =
            "🎉 Excelente! Você domina muito bem o conteúdo.";

    } else if (porcentagem >= 60) {

        mensagem =
            "👍 Bom trabalho! Continue estudando.";

    } else {

        mensagem =
            "📚 Continue estudando e tente novamente.";

    }


    resultado.innerHTML = `

        <div class="resultado-final">

            <h3>
                Resultado
            </h3>

            <p>
                Você acertou
                <strong>${acertos}</strong>
                de
                <strong>${questoes.length}</strong>
                questões.
            </p>

            <p>
                Aproveitamento:
                <strong>${porcentagem}%</strong>
            </p>

            <p>
                ${mensagem}
            </p>

        </div>

    `;

}



/* ============================================================
   GERAR ATIVIDADE POR TÓPICO
============================================================ */

function gerarAtividadeTopico() {

    const seletor =
        document.getElementById(
            "topico"
        );


    const atividade =
        document.getElementById(
            "atividade"
        );


    if (!seletor || !atividade) {
        return;
    }


    const topico =
        seletor.value;


    let questoes;


    if (topico === "todos") {

        questoes =
            embaralhar(
                bancoQuestoes
            );

    } else {

        questoes =
            bancoQuestoes.filter(
                questao =>
                    questao.topico === topico
            );

    }


    if (!questoes.length) {

        atividade.innerHTML = `

            <div class="atividade-inicial">

                😕 Ainda não existem questões
                cadastradas para este tópico.

            </div>

        `;

        return;
    }


    const questao =
        embaralhar(
            questoes
        )[0];


    atividade.innerHTML = `

        <div class="questao">

            <h3>
                ${escapeHTML(questao.pergunta)}
            </h3>


            <div class="alternativas">

                ${questao.alternativas
                    .map(
                        (alternativa, index) => `

                            <label class="alternativa">

                                <input
                                    type="radio"
                                    name="atividade-unica"
                                    value="${index}"
                                >

                                <span>
                                    ${escapeHTML(alternativa)}
                                </span>

                            </label>

                        `
                    )
                    .join("")}

            </div>


            <button
                type="button"
                class="btn-gerar"
                onclick="corrigirQuestaoUnica()"
            >
                Verificar resposta
            </button>


            <div
                id="resultadoQuestao"
                class="resultado"
            ></div>

        </div>

    `;


    /*
        Guarda temporariamente a resposta correta.
    */

    window.questaoAtual =
        questao;

}



/* ============================================================
   CORRIGIR QUESTÃO ÚNICA
============================================================ */

function corrigirQuestaoUnica() {

    const resposta =
        document.querySelector(
            'input[name="atividade-unica"]:checked'
        );


    const resultado =
        document.getElementById(
            "resultadoQuestao"
        );


    if (!resposta) {

        resultado.innerHTML = `
            ⚠️ Selecione uma alternativa.
        `;

        return;
    }


    const correta =
        Number(
            resposta.value
        ) ===
        window.questaoAtual.correta;


    if (correta) {

        resultado.innerHTML = `
            <div class="resposta-correta">
                ✅ Resposta correta!
            </div>
        `;

    } else {

        resultado.innerHTML = `

            <div class="resposta-incorreta">

                ❌ Resposta incorreta.

                <br><br>

                A resposta correta é:

                <strong>
                    ${escapeHTML(
                        window.questaoAtual
                            .alternativas[
                                window.questaoAtual.correta
                            ]
                    )}
                </strong>

            </div>

        `;

    }

}
