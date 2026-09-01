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
const maxErros = 6;
let erros = 0;

// um desenho pra cada quantidade de erros, de 0 ate o maximo
const desenhosForca = [
  "  +---+\n      |\n      |\n      |\n     ===",
  "  +---+\n  O   |\n      |\n      |\n     ===",
  "  +---+\n  O   |\n  |   |\n      |\n     ===",
  "  +---+\n  O   |\n /|   |\n      |\n     ===",
  "  +---+\n  O   |\n /|\\  |\n      |\n     ===",
  "  +---+\n  O   |\n /|\\  |\n /    |\n     ===",
  "  +---+\n  O   |\n /|\\  |\n / \\  |\n     ===",
];

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
  console.log("\n" + desenhosForca[erros]);
  console.log("\n" + montarPalavraEscondida());
  console.log("erros: " + erros + "/" + maxErros + " | letras tentadas: " + letrasTentadas.join(", "));
  rl.question("Digite uma letra: ", (resposta) => {
    const letra = resposta.toLowerCase();

    if (letrasTentadas.includes(letra)) {
      console.log("voce ja tentou essa letra");
      perguntarLetra();
      return;
    }
    letrasTentadas.push(letra);

    const acertou = palavraEscolhida.includes(letra);
    if (acertou) {
      palavraEscolhida.split("").forEach((letraDaPalavra, i) => {
        if (letraDaPalavra === letra) letrasCertas[i] = true;
      });
    } else {
      erros++;
    }

    if (palavraCompleta()) {
      console.log("\nvoce acertou: " + palavraEscolhida);
      rl.close();
    } else if (erros >= maxErros) {
      console.log("\nvoce perdeu, a palavra era: " + palavraEscolhida);
      rl.close();
    } else {
      perguntarLetra();
    }
  });
}

perguntarLetra();
