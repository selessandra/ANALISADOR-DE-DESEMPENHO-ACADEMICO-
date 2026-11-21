"use strict";
/* ANÁLISE — calcula média e situação de cada aluno sem alterar o original */

// Cada etapa devolve um NOVO objeto congelado.
const comMedia = aluno => Object.freeze({ ...aluno, media: calcularMedia(aluno.notas) });
const comSituacao = aluno => Object.freeze({ ...aluno, situacao: classificar(arredondarMedia(aluno.media)) });

// Composição: notas -> média -> situação
const analisarAluno = pipe(comMedia, comSituacao);
const analisarTurma = pipe(map(analisarAluno), Object.freeze);
