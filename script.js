// Obtém o elemento do CPF no DOM
const cpfEl = document.getElementById("cpf");

// Obtém os botões do gerador de CPF
const gerarCpfBtn = document.getElementById("gerar-cpf");
const copiarCpfBtn = document.getElementById("copiar-cpf");

// Função para gerar CPF aleatório
function gerarCPF() {
  // Gera um número aleatório entre 1 e 999.999.999
  let n = Math.floor(Math.random() * 999999999) + 1;

  // Converte o número para uma string de 9 dígitos, preenchendo com zeros à esquerda, se necessário
  let nStr = n.toString().padStart(9, "0");

  // Calcula os dígitos verificadores do CPF
  let dv1 = calcularDV(nStr, 10);
  let dv2 = calcularDV(nStr + dv1, 11);

  // Formata o CPF com pontos e hífen e exibe no elemento cpfEl
  cpfEl.innerText = formatarCPF(nStr + dv1 + dv2);
}

// Função para calcular dígito verificador
function calcularDV(numero, peso) {
  let total = 0;
  for (let i = 0; i < numero.length; i++) {
    // Multiplica cada dígito do número pelo peso decrescente e soma ao total
    total += parseInt(numero.charAt(i)) * peso--;
  }
  let resto = total % 11;
  // Retorna 0 se o resto for menor que 2, caso contrário, retorna 11 - resto
  return resto < 2 ? 0 : 11 - resto;
}

// Função para formatar CPF no formato XXX.XXX.XXX-XX
function formatarCPF(cpf) {
  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return cpf.replace(cpfRegex, "$1.$2.$3-$4");
}

// Função para copiar CPF para a área de transferência
function copiarCPF() {
  const cpf = cpfEl.innerText;
  navigator.clipboard.writeText(cpf).then(
    () => {
      // Exibe um alerta informando que o CPF foi copiado com sucesso
      alert(`CPF ${cpf} copiado para a área de transferência!`);
    },
    (err) => {
      // Exibe uma mensagem de erro no console caso ocorra algum problema ao copiar o CPF
      console.error("Erro ao copiar CPF: ", err);
    }
  );
}

// Adiciona os event listeners aos botões
gerarCpfBtn.addEventListener("click", gerarCPF);
copiarCpfBtn.addEventListener("click", copiarCPF);
