"use strict";
/* RELATÓRIO — resumo da turma e desempenho de cada aluno */

const formatarRelatorio = alunos => {
  const resumo = resumir(alunos);
  if (!resumo) return "Nenhum aluno cadastrado.";

  const situacoes = resumo.contagem;
  const lista = ordenarPorMediaDesc(alunos)
    .map(aluno =>
      `- ${aluno.nome}: notas ${formatarNotas(aluno.notas)} | média ${fmt(aluno.media)} | ${aluno.situacao}`
    )
    .join("\n");

  return [
    "RELATÓRIO DE DESEMPENHO",
    `Total de alunos: ${resumo.total}`,
    `Média geral da turma: ${fmt(resumo.mediaGeral)}`,
    `Maior média: ${resumo.maior.nome} (${fmt(resumo.maior.media)})`,
    `Menor média: ${resumo.menor.nome} (${fmt(resumo.menor.media)})`,
    `Aprovados: ${situacoes.Aprovado}`,
    `Em recuperação: ${situacoes.Recuperação}`,
    `Reprovados: ${situacoes.Reprovado}`,
    "",
    "ALUNOS",
    lista,
  ].join("\n");
};

const gerarRelatorio = pipe(analisarTurma, formatarRelatorio);
