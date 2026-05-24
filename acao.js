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
    const inputMaquina = primeiraCelula.querySelector("input");

    const maquina = inputMaquina ? inputMaquina.value : primeiraCelula.innerText;

    const selecionado = linha.children[1].querySelector("input").checked;

    if (selecionado) {
      temMaquinaSelecionada = true;

      const horimetro = linha.children[2].querySelector("input").value;
      const oleoDiesel = linha.children[3].querySelector("input").value;
      const filtroDiesel = linha.children[4].querySelector("input").checked ? "Sim" : "Não";
      const oleoMotor = linha.children[5].querySelector("input").value;
      const filtroOleo = linha.children[6].querySelector("input").checked ? "Sim" : "Não";
      const proxRevisao = linha.children[7].querySelector("input").value;
      const graxa = linha.children[8].querySelector("textarea").value;
      const localObras = linha.children[9].querySelector("input, textarea").value;
      const operador = linha.children[10].querySelector("input, textarea").value;

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