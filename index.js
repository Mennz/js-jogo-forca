const palavras = [
  "abacaxi",
  "computador",
  "javascript",
  "montanha",
  "elefante",
  "biblioteca",
  "guitarra",
  "foguete",
];

const indice = Math.floor(Math.random() * palavras.length);
const palavraEscolhida = palavras[indice];

const letrasCertas = palavraEscolhida.split("").map(() => false);

function montarPalavraEscondida() {
  return palavraEscolhida
    .split("")
    .map((letra, i) => (letrasCertas[i] ? letra : "_"))
    .join(" ");
}

console.log(montarPalavraEscondida());
