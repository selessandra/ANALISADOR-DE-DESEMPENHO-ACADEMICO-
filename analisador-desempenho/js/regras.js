"use strict";
/* REGRAS DE NEGÓCIO — limites de nota e classificação, definidos como DADOS imutáveis */

const MAX_NOTAS = 4;

const REGRAS = deepFreeze([
  { situacao: "Aprovado",    minimo: 7 },
  { situacao: "Recuperação", minimo: 5 },
  { situacao: "Reprovado",   minimo: 0 },
]);

const SITUACOES_ZERADAS = deepFreeze(
  Object.fromEntries(REGRAS.map(r => [r.situacao, 0]))
);

// Função que DEVOLVE outra função: fábrica de classificadores.
const criarClassificador = regras => media =>
  regras.find(regra => media >= regra.minimo).situacao;

const classificar = criarClassificador(REGRAS);
