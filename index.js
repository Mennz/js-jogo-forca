const readline = require("readline");
const fs = require("fs");
const path = require("path");

const caminhoPlacar = path.join(__dirname, "placar.json");

function lerPlacar() {
  if (!fs.existsSync(caminhoPlacar)) return { vitorias: 0, derrotas: 0 };
  return JSON.parse(fs.readFileSync(caminhoPlacar, "utf-8"));
}

function salvarPlacar(placar) {
  fs.writeFileSync(caminhoPlacar, JSON.stringify(placar, null, 2));
}

const categorias = {
  frutas: ["abacaxi", "banana", "morango", "melancia", "laranja", "manga"],
  tecnologia: ["computador", "javascript", "teclado", "internet", "software"],
  natureza: ["montanha", "elefante", "floresta", "cachoeira", "vulcao"],
  musica: ["guitarra", "bateria", "violao", "microfone", "orquestra"],
};

const nomesCategorias = Object.keys(categorias);
const indiceCategoria = Math.floor(Math.random() * nomesCategorias.length);
const categoriaEscolhida = nomesCategorias[indiceCategoria];
const palavras = categorias[categoriaEscolhida];

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

function finalizarJogo(venceu) {
  console.log("\n" + desenhosForca[erros]);
  const placar = lerPlacar();
  if (venceu) {
    console.log("\nvoce ganhou! a palavra era: " + palavraEscolhida);
    placar.vitorias++;
  } else {
    console.log("\nvoce perdeu. a palavra era: " + palavraEscolhida);
    placar.derrotas++;
  }
  salvarPlacar(placar);
  console.log("placar: " + placar.vitorias + " vitorias, " + placar.derrotas + " derrotas");
  rl.close();
}

function darDica() {
  const indicesEscondidos = [];
  letrasCertas.forEach((certa, i) => {
    if (!certa) indicesEscondidos.push(i);
  });

  const indiceRevelado = indicesEscondidos[Math.floor(Math.random() * indicesEscondidos.length)];
  letrasCertas[indiceRevelado] = true;
  erros++;
  console.log("dica: a posicao " + (indiceRevelado + 1) + " e '" + palavraEscolhida[indiceRevelado] + "'");

  if (palavraCompleta()) {
    finalizarJogo(true);
  } else if (erros >= maxErros) {
    finalizarJogo(false);
  } else {
    perguntarLetra();
  }
}

function perguntarLetra() {
  console.log("\n" + desenhosForca[erros]);
  console.log("\n" + montarPalavraEscondida());
  console.log("erros: " + erros + "/" + maxErros + " | letras tentadas: " + letrasTentadas.join(", "));
  console.log("categoria: " + categoriaEscolhida);
  rl.question("Digite uma letra (ou 'dica', custa uma tentativa): ", (resposta) => {
    const letra = resposta.toLowerCase();

    if (letra === "dica") {
      darDica();
      return;
    }

    if (letra.length !== 1 || letra < "a" || letra > "z") {
      console.log("digite so uma letra do alfabeto");
      perguntarLetra();
      return;
    }

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
      finalizarJogo(true);
    } else if (erros >= maxErros) {
      finalizarJogo(false);
    } else {
      perguntarLetra();
    }
  });
}

const placarAtual = lerPlacar();
console.log("placar atual: " + placarAtual.vitorias + " vitorias, " + placarAtual.derrotas + " derrotas");

perguntarLetra();
