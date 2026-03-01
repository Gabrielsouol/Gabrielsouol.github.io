let historico = [];

function digitar(caractere) { 
    let visor = document.getElementById("visor");

    if (visor.value === "0") {
        visor.value = caractere;
    } else {
        visor.value += caractere;
    }
}

function limpar() {
    document.getElementById("visor").value = "0";
}

function apagar() {
    let visor = document.getElementById("visor");

    if (visor.value.length > 1) { 
        visor.value = visor.value.slice(0, -1);
    } else { 
        visor.value = "0";
    }
}

function calcular() { 
    let visor = document.getElementById("visor");

    let expressaoOriginal = visor.value; // ← FALTAVA ISSO
    let expressao = expressaoOriginal;

    // converte virgula para ponto
    expressao = expressao.replace(/,/g, ".");

    // porcentagem
    expressao = expressao.replace(/%/g, "/100");

    // raiz quadrada
    expressao = expressao.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");

    try {
        let resultado = eval(expressao);
        resultado = parseFloat(resultado.toFixed(10));

        let resultadoFormatado = resultado.toString().replace(/\./g, ",");

        visor.value = resultadoFormatado;

        // SALVAR NO HISTÓRICO
        historico.push(`${expressaoOriginal} = ${resultadoFormatado}`);
        atualizarHistorico();

    } catch (erro) {
        visor.value = "Erro";
    }
}

function atualizarHistorico() {
    let lista = document.getElementById("listaHistorico");
    lista.innerHTML = "";

    historico.slice().reverse().forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });
}