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
