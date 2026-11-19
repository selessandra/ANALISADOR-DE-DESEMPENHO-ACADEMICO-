"use strict";
/* FILTRO — filtra alunos (já analisados) por situação */

const porSituacao = situacao => aluno => aluno.situacao === situacao;

// "Todos" devolve a própria coleção; as demais devolvem um filtro pronto.
const filtrarPorSituacao = situacao =>
  situacao === "Todos" ? identidade : filter(porSituacao(situacao));
