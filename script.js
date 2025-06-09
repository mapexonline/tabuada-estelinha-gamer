let perguntas = [],
  perguntaAtual = 0,
  erros = 0;
const maxErros = 7;

function gerarPerguntas() {
  for (let i = 2; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      perguntas.push({ a: i, b: j, resultado: i * j });
    }
  }

  perguntas = perguntas.sort(() => Math.random() - 0.5); // embaralha
}

function mostrarPergunta() {
  if (perguntaAtual < perguntas.length) {
    const p = perguntas[perguntaAtual];
    document.getElementById(
      "pergunta"
    ).textContent = `Quanto é ${p.a} x ${p.b}?`;
  } else {
    document.getElementById("mensagemFinal").textContent =
      "🎉 PARABÉNS, VOCÊ É FERA!";
    document.getElementById("resposta").disabled = true;
    document.querySelector("button").disabled = true;
  }
}

function atualizarBarraEnergia() {
  const barra = document.getElementById("barraEnergia");
  const porcentagem = ((maxErros - erros) / maxErros) * 100;
  barra.style.width = `${porcentagem}%`;

  if (porcentagem > 70) {
    barra.style.backgroundColor = "green";
  } else if (porcentagem > 40) {
    barra.style.backgroundColor = "gold";
  } else if (porcentagem > 20) {
    barra.style.backgroundColor = "orange";
  } else {
    barra.style.backgroundColor = "red";
  }

  if (porcentagem <= 0) {
    barra.style.width = "0%";
  }
}

function verificarResposta() {
  const input = document.getElementById("resposta");
  const valor = input.value.trim();

  if (valor === "") {
    alert("Digite uma resposta antes de continuar!");
    return;
  }

  const resposta = parseInt(valor);
  const p = perguntas[perguntaAtual];

  if (resposta === p.resultado) {
    if (erros > 0) {
      erros--;
    }
  } else {
    erros++;
    if (erros >= maxErros) {
      atualizarBarraEnergia();
      document.getElementById("mensagemFinal").textContent =
        "❌ QUE PENA, ACABOU SUAS CHANCES!";
      input.disabled = true;
      document.querySelector("button").disabled = true;
      return;
    }
  }

  atualizarBarraEnergia();
  perguntaAtual++;
  mostrarPergunta();
  input.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  gerarPerguntas();
  mostrarPergunta();
  atualizarBarraEnergia();

  // Enter ativa resposta
  document.getElementById("resposta").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      verificarResposta();
    }
  });
});
