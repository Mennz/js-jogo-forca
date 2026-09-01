const readline = require("readline");

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
const letrasTentadas = [];

function montarPalavraEscondida() {
  return palavraEscolhida
    .split("")
    .map((letra, i) => (letrasCertas[i] ? letra : "_"))
    .join(" ");
}

function palavraCompleta() {
  return letrasCertas.every((certa) => certa);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function perguntarLetra() {
  console.log("\n" + montarPalavraEscondida());
  rl.question("Digite uma letra: ", (resposta) => {
    const letra = resposta.toLowerCase();

    if (letrasTentadas.includes(letra)) {
      console.log("voce ja tentou essa letra");
      perguntarLetra();
      return;
    }
    letrasTentadas.push(letra);

    palavraEscolhida.split("").forEach((letraDaPalavra, i) => {
      if (letraDaPalavra === letra) letrasCertas[i] = true;
    });

    if (palavraCompleta()) {
      console.log("\nvoce acertou: " + palavraEscolhida);
      rl.close();
    } else {
      perguntarLetra();
    }
  });
}

perguntarLetra();
