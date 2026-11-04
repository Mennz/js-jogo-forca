# Jogo da Forca

Jogo da forca clássico rodando no terminal, feito em Node puro (sem nenhuma
dependência externa).

O programa sorteia uma palavra de uma lista fixa, mostra as letras escondidas
com `_` e vai pedindo letras até você acertar a palavra inteira ou errar demais
e a forca "completar".

## O que eu pratiquei

- `readline` do Node pra ler entrada do terminal
- funções de array (`map`, `every`, `forEach`, `includes`)
- controle de estado de um jogo com variáveis simples (erros, letras tentadas)
- validação básica de entrada do usuário
- `fs` pra ler e escrever um arquivo JSON (placar entre partidas)
- organizar as palavras por categoria num objeto
- lidar com acentos numa string sem quebrar a comparação letra a letra

## Como rodar

Precisa só do Node instalado.

```
node index.js
```

Digite uma letra por vez e aperte enter. Você tem 6 chances de errar antes da
forca completar. A palavra sorteada vem de uma categoria (frutas, tecnologia,
natureza ou música), mostrada no topo da tela.

Se ficar travado, digite `dica` em vez de uma letra: o jogo revela uma letra
da palavra, mas isso conta como um erro. O placar de vitórias e derrotas fica
salvo em `placar.json` e aparece a cada partida nova.
