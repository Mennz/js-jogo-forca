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

## Como rodar

Precisa só do Node instalado.

```
node index.js
```

Digite uma letra por vez e aperte enter. Você tem 6 chances de errar antes da
forca completar.
