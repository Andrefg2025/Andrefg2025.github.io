/* =========================================================
   PLATAFORMA DE ESTUDO
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Plataforma de Estudo carregada.");

    inicializarMapaMental();

    inicializarCards();

    inicializarAtividades();

    marcarMenuAtual();

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


    try {

        const aulaConteudo =
            mapa.closest(".aula-conteudo");


        if (!aulaConteudo) {

            throw new Error(
                "Não foi possível localizar o conteúdo da aula."
            );
        }


        /*
         * Título central.
         *
         * Primeiro tenta utilizar o data-titulo.
         * Caso não exista, procura o primeiro h2.
         */

        let tituloCentral =
            mapa.dataset.titulo;


        if (!tituloCentral) {

            const h2 =
                aulaConteudo.querySelector("h2");

            tituloCentral =
                h2
                    ? h2.textContent.trim()
                    : "Mapa Mental";
        }


        /*
         * Procura todos os h3 da aula.
         */

        const subtitulos =
            Array.from(
                aulaConteudo.querySelectorAll("h3")
            );


        /*
         * Remove títulos vazios.
         */

        const topicos =
            subtitulos
                .map(function (elemento) {

                    return elemento.textContent
                        .replace(/\s+/g, " ")
                        .trim();

                })
                .filter(function (texto) {

                    return texto.length > 0;

                });


        /*
         * Se não houver tópicos,
         * mostra mensagem de erro.
         */

        if (topicos.length === 0) {

            throw new Error(
                "Nenhum <h3> foi encontrado para gerar o mapa."
            );
        }


        /*
         * Limita a quantidade para evitar
         * um mapa exageradamente grande.
         */

        const limite =
            18;

        const topicosMapa =
            topicos.slice(0, limite);


        /*
         * Cria o SVG.
         */

        criarMapaSVG(
            mapa,
            tituloCentral,
            topicosMapa
        );


        console.log(
            "Mapa mental gerado automaticamente."
        );


    } catch (erro) {

        console.error(
            "Erro ao gerar mapa mental:",
            erro
        );


        mapa.innerHTML = `

            <div class="erro-mapa">

                <strong>
                    ⚠️ Não foi possível gerar o mapa mental.
                </strong>

                <span>
                    ${escapeHTML(erro.message)}
                </span>

            </div>

        `;
    }
}


/* =========================================================
   CRIAR MAPA SVG
========================================================= */

function criarMapaSVG(
    container,
    titulo,
    topicos
) {

    /*
     * Dimensões do mapa.
     */

    const largura =
        1400;

    const altura =
        680;


    /*
     * Limpa o carregamento.
     */

    container.innerHTML = "";


    /*
     * Cria SVG.
     */

    const svg =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );


    svg.setAttribute(
        "class",
        "mapa-svg"
    );


    svg.setAttribute(
        "viewBox",
        `0 0 ${largura} ${altura}`
    );


    svg.setAttribute(
        "preserveAspectRatio",
        "xMidYMid meet"
    );


    /*
     * Definições.
     */

    const defs =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
        );


    /*
     * Gradiente central.
     */

    const gradienteCentral =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "linearGradient"
        );


    gradienteCentral.setAttribute(
        "id",
        "gradienteCentral"
    );


    gradienteCentral.setAttribute(
        "x1",
        "0%"
    );


    gradienteCentral.setAttribute(
        "y1",
        "0%"
    );


    gradienteCentral.setAttribute(
        "x2",
        "100%"
    );


    gradienteCentral.setAttribute(
        "y2",
        "100%"
    );


    adicionarStop(
        gradienteCentral,
        "0%",
        "#ff4500"
    );


    adicionarStop(
        gradienteCentral,
        "100%",
        "#ff7a00"
    );


    defs.appendChild(
        gradienteCentral
    );


    svg.appendChild(
        defs
    );


    /*
     * Grupo das linhas.
     *
     * É colocado primeiro para que os nós
     * apareçam por cima das linhas.
     */

    const grupoLinhas =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );


    grupoLinhas.setAttribute(
        "class",
        "linhas-mapa"
    );


    svg.appendChild(
        grupoLinhas
    );


    /*
     * Centro.
     */

    const centroX =
        largura / 2;

    const centroY =
        altura / 2;


    const raioCentral =
        135;


    /*
     * Número de tópicos.
     */

    const quantidade =
        topicos.length;


    /*
     * Raio da distribuição.
     */

    const raioX =
        Math.min(
            500,
            250 + quantidade * 18
        );


    const raioY =
        Math.min(
            260,
            170 + quantidade * 8
        );


    /*
     * Cria os tópicos.
     */

    topicos.forEach(
        function (topico, indice) {

            /*
             * Distribuição circular.
             */

            const angulo =
                -Math.PI / 2 +
                (indice / quantidade) *
                Math.PI * 2;


            const x =
                centroX +
                Math.cos(angulo) *
                raioX;


            const y =
                centroY +
                Math.sin(angulo) *
                raioY;


            /*
             * Tamanho do nó.
             */

            const larguraNo =
                calcularLarguraNo(
                    topico,
                    190,
                    280
                );


            const alturaNo =
                58;


            /*
             * Linha principal.
             */

            const linha =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );


            const pontoInicio =
                calcularPontoNaDirecao(
                    centroX,
                    centroY,
                    x,
                    y,
                    raioCentral
                );


            const pontoFim =
                calcularPontoNaDirecao(
                    x,
                    y,
                    centroX,
                    centroY,
                    larguraNo / 2
                );


            const controleX =
                (pontoInicio.x +
                 pontoFim.x) / 2;


            const controleY =
                (pontoInicio.y +
                 pontoFim.y) / 2;


            linha.setAttribute(
                "d",
                `M ${pontoInicio.x} ${pontoInicio.y}
                 Q ${controleX} ${controleY}
                 ${pontoFim.x} ${pontoFim.y}`
            );


            linha.setAttribute(
                "class",
                "linha-mapa"
            );


            grupoLinhas.appendChild(
                linha
            );


            /*
             * Cria grupo do tópico.
             */

            const grupo =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                );


            grupo.setAttribute(
                "class",
                "grupo-mapa"
            );


            /*
             * Nó principal.
             */

            const rect =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "rect"
                );


            rect.setAttribute(
                "class",
                "no-principal"
            );


            rect.setAttribute(
                "x",
                x - larguraNo / 2
            );


            rect.setAttribute(
                "y",
                y - alturaNo / 2
            );


            rect.setAttribute(
                "width",
                larguraNo
            );


            rect.setAttribute(
                "height",
                alturaNo
            );


            rect.setAttribute(
                "rx",
                "18"
            );


            rect.setAttribute(
                "ry",
                "18"
            );


            grupo.appendChild(
                rect
            );


            /*
             * Texto.
             */

            const linhasTexto =
                quebrarTexto(
                    topico,
                    28
                );


            const texto =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                );


            texto.setAttribute(
                "class",
                "texto-principal"
            );


            texto.setAttribute(
                "x",
                x
            );


            texto.setAttribute(
                "y",
                calcularYTexto(
                    y,
                    linhasTexto.length
                )
            );


            linhasTexto.forEach(
                function (linhaTexto, i) {

                    const tspan =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "tspan"
                        );


                    tspan.setAttribute(
                        "x",
                        x
                    );


                    if (i > 0) {

                        tspan.setAttribute(
                            "dy",
                            "16"
                        );
                    }


                    tspan.textContent =
                        linhaTexto;


                    texto.appendChild(
                        tspan
                    );

                }
            );


            grupo.appendChild(
                texto
            );


            /*
             * Tooltip.
             */

            const title =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "title"
                );


            title.textContent =
                topico;


            grupo.appendChild(
                title
            );


            /*
             * Clique no tópico.
             *
             * Procura o h3 correspondente
             * na aula e leva o usuário até ele.
             */

            grupo.addEventListener(
                "click",
                function () {

                    const h3Encontrado =
                        encontrarTitulo(
                            aulaConteudoAtual(container),
                            topico
                        );


                    if (h3Encontrado) {

                        h3Encontrado.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });


                        h3Encontrado.style
                            .transition =
                            "background 0.3s ease";


                        h3Encontrado.style
                            .background =
                            "#fff3e6";


                        setTimeout(
                            function () {

                                h3Encontrado.style
                                    .background =
                                    "";

                            },
                            1200
                        );
                    }

                }
            );


            svg.appendChild(
                grupo
            );

        }
    );


    /*
     * Nó central.
     */

    const centro =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );


    centro.setAttribute(
        "class",
        "grupo-central"
    );


    const circulo =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );


    circulo.setAttribute(
        "class",
        "no-central"
    );


    circulo.setAttribute(
        "x",
        centroX - 135
    );


    circulo.setAttribute(
        "y",
        centroY - 70
    );


    circulo.setAttribute(
        "width",
        "270"
    );


    circulo.setAttribute(
        "height",
        "140"
    );


    circulo.setAttribute(
        "rx",
        "35"
    );


    circulo.setAttribute(
        "ry",
        "35"
    );


    circulo.setAttribute(
        "fill",
        "url(#gradienteCentral)"
    );


    centro.appendChild(
        circulo
    );


    /*
     * Texto central.
     */

    const textoCentral =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );


    textoCentral.setAttribute(
        "class",
        "texto-central"
    );


    textoCentral.setAttribute(
        "x",
        centroX
    );


    const linhasCentral =
        quebrarTexto(
            titulo,
            25
        );


    textoCentral.setAttribute(
        "y",
        calcularYTexto(
            centroY,
            linhasCentral.length
        )
    );


    linhasCentral.forEach(
        function (linhaTexto, i) {

            const tspan =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "tspan"
                );


            tspan.setAttribute(
                "x",
                centroX
            );


            if (i > 0) {

                tspan.setAttribute(
                    "dy",
                    "21"
                );
            }


            tspan.textContent =
                linhaTexto;


            textoCentral.appendChild(
                tspan
            );

        }
    );


    centro.appendChild(
        textoCentral
    );


    svg.appendChild(
        centro
    );


    /*
     * Insere SVG no mapa.
     */

    container.appendChild(
        svg
    );
}


/* =========================================================
   ADICIONAR STOP DO GRADIENTE
========================================================= */

function adicionarStop(
    gradiente,
    offset,
    cor
) {

    const stop =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "stop"
        );


    stop.setAttribute(
        "offset",
        offset
    );


    stop.setAttribute(
        "stop-color",
        cor
    );


    gradiente.appendChild(
        stop
    );
}


/* =========================================================
   CALCULAR LARGURA DO NÓ
========================================================= */

function calcularLarguraNo(
    texto,
    minimo,
    maximo
) {

    const tamanho =
        texto.length * 6.5 + 50;


    return Math.max(
        minimo,
        Math.min(
            maximo,
            tamanho
        )
    );
}


/* =========================================================
   QUEBRAR TEXTO
========================================================= */

function quebrarTexto(
    texto,
    caracteresPorLinha
) {

    const palavras =
        texto.split(/\s+/);


    const linhas =
        [];

    let linhaAtual =
        "";


    palavras.forEach(
        function (palavra) {

            const tentativa =
                linhaAtual
                    ? linhaAtual + " " + palavra
                    : palavra;


            if (
                tentativa.length >
                caracteresPorLinha
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
                    tentativa;
            }

        }
    );


    if (linhaAtual) {

        linhas.push(
            linhaAtual
        );
    }


    /*
     * Evita excesso de linhas.
     */

    return linhas.slice(
        0,
        4
    );
}


/* =========================================================
   POSIÇÃO VERTICAL DO TEXTO
========================================================= */

function calcularYTexto(
    centro,
    quantidadeLinhas
) {

    const alturaLinha =
        16;


    return centro -
        ((quantidadeLinhas - 1) *
        alturaLinha) / 2;
}


/* =========================================================
   PONTO DE INTERSEÇÃO
========================================================= */

function calcularPontoNaDirecao(
    origemX,
    origemY,
    destinoX,
    destinoY,
    distancia
) {

    const dx =
        destinoX - origemX;

    const dy =
        destinoY - origemY;


    const comprimento =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (!comprimento) {

        return {
            x: origemX,
            y: origemY
        };
    }


    return {

        x:
            origemX +
            (dx / comprimento) *
            distancia,

        y:
            origemY +
            (dy / comprimento) *
            distancia
    };
}


/* =========================================================
   LOCALIZAR A AULA
========================================================= */

function aulaConteudoAtual(
    mapa
) {

    return mapa.closest(
        ".aula-conteudo"
    );
}


/* =========================================================
   ENCONTRAR TÍTULO
========================================================= */

function encontrarTitulo(
    aula,
    texto
) {

    if (!aula) {

        return null;
    }


    const elementos =
        aula.querySelectorAll(
            "h3"
        );


    for (
        const elemento of elementos
    ) {

        const atual =
            elemento.textContent
                .replace(/\s+/g, " ")
                .trim();


        if (atual === texto) {

            return elemento;
        }
    }


    return null;
}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHTML(
    texto
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        texto;


    return div.innerHTML;
}


/* =========================================================
   CARDS
========================================================= */

function inicial
