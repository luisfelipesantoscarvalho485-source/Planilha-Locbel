let dataAtual = "";

const campoData = document.querySelector('input[type="date"]');
const campos = document.querySelectorAll("input, textarea");

campoData.addEventListener("change", () => {
  dataAtual = campoData.value;
  carregarDadosDoDia();
});

function pegarChave(campo, index) {
  return "planilha_locbel_" + dataAtual + "_campo_" + index;
}

function carregarDadosDoDia() {
  campos.forEach((campo, index) => {
    if (campo === campoData) return;

    const chave = pegarChave(campo, index);

    if (campo.type === "checkbox") {
      campo.checked = localStorage.getItem(chave) === "true";
    } else {
      campo.value = localStorage.getItem(chave) || "";
      ajustarAltura(campo);
    }
  });
}

campos.forEach((campo, index) => {
  campo.addEventListener("input", () => {
    if (!campoData.value) {
      alert("Escolha uma data primeiro.");
      return;
    }

    dataAtual = campoData.value;

    if (campo !== campoData) {
      salvarCampo(campo, pegarChave(campo, index));
      ajustarAltura(campo);
    }
  });

  campo.addEventListener("change", () => {
    if (!campoData.value) return;

    dataAtual = campoData.value;

    if (campo !== campoData) {
      salvarCampo(campo, pegarChave(campo, index));
      ajustarAltura(campo);
    }
  });
});

function salvarCampo(campo, chave) {
  if (campo.type === "checkbox") {
    localStorage.setItem(chave, campo.checked);
  } else {
    localStorage.setItem(chave, campo.value);
  }
}

function ajustarAltura(campo) {
  if (campo.tagName === "TEXTAREA") {
    campo.style.height = "auto";
    campo.style.height = campo.scrollHeight + "px";
  }
}

function limparDados() {
  if (!campoData.value) {
    alert("Escolha uma data para limpar.");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja apagar os dados deste dia?");

  if (confirmar) {
    const data = campoData.value;

    Object.keys(localStorage).forEach((chave) => {
      if (chave.startsWith("planilha_locbel_" + data)) {
        localStorage.removeItem(chave);
      }
    });

    carregarDadosDoDia();
  }
}

function pegarValor(linha, coluna, seletor = "input, textarea") {
  const campo = linha.children[coluna]?.querySelector(seletor);
  return campo ? campo.value : "";
}

function pegarCheck(linha, coluna) {
  const campo = linha.children[coluna]?.querySelector("input");
  return campo ? campo.checked : false;
}

function enviarWhatsApp() {
  let mensagem = "CONTROLE DE ABASTECIMENTO MÓVEL E MANUTENÇÃO DIÁRIA\n\n";

  const data = campoData.value;

  mensagem += "Nome: MARCELO WILLYANS\n";

  if (data) {
    mensagem += "Data: " + data + "\n";
  }

  mensagem += "\n";

  const linhas = document.querySelectorAll("tbody tr");
  let temMaquinaSelecionada = false;

  linhas.forEach((linha) => {
    const primeiraCelula = linha.children[0];

    if (!primeiraCelula) return;

    const inputMaquina = primeiraCelula.querySelector("input");
    const maquina = inputMaquina ? inputMaquina.value : primeiraCelula.innerText.trim();

    const selecionado = pegarCheck(linha, 1);

    if (selecionado) {
      temMaquinaSelecionada = true;
const oleoHD68 = pegarValor(linha, 7);
const filtroHD68 = pegarValor(linha, 8);
const proxRevisao = pegarValor(linha, 9);
const graxa = pegarValor(linha, 10);
const localObras = pegarValor(linha, 11);
const operador = pegarValor(linha, 12);
      
      mensagem += "Máquina: " + maquina + "\n";
      mensagem += "Horímetro/Hr: " + horimetro + "\n";
      mensagem += "Óleo Diesel: " + oleoDiesel + "\n";
      mensagem += "Filtro Diesel: " + filtroDiesel + "\n";
      mensagem += "Óleo Motor/Torque - 15WD40: " + oleoMotor + "\n";
      mensagem += "Filtro Óleo: " + filtroOleo + "\n";
      mensagem += "Prox. Revisão: " + proxRevisao + "\n";
      mensagem += "Graxa: " + graxa + "\n";
      mensagem += "Local Obras: " + localObras + "\n";
      mensagem += "Operador: " + operador + "\n";
      mensagem += "Óleo HD68: " + oleoHD68 + "\n";
      mensagem += "Filtro HD68: " + filtroHD68 + "\n";
      
      mensagem += "-----------------------------\n";
    }
  });

  if (!temMaquinaSelecionada) {
    alert("Selecione pelo menos uma máquina antes de enviar.");
    return;
  }

  const numero = "5521983653353";
  const texto = encodeURIComponent(mensagem);

  window.open("https://wa.me/" + numero + "?text=" + texto, "_blank");
}
