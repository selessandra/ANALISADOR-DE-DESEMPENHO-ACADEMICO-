"use strict";
/* FORMATAÇÃO — transforma números e objetos em texto (funções puras) */

const fmt = n => arredondarMedia(n).toFixed(2).replace(".", ",");
const formatarNotas = notas => notas.map(n => String(n).replace(".", ",")).join(" | ");
const linhaAluno = a => `- ${a.nome}: ${fmt(a.media)} (${a.situacao})`;
