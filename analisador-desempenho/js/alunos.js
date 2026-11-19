"use strict";
/* ALUNOS — registro da lista de alunos. Toda operação devolve uma NOVA lista. */

const criarAluno = (id, nome, notas) => deepFreeze({ id, nome: nome.trim(), notas: [...notas] });

const adicionarAluno = (alunos, aluno) => Object.freeze([...alunos, aluno]);
const adicionarVarios = (alunos, novos) => Object.freeze([...alunos, ...novos]);
const removerAluno = (alunos, id) => Object.freeze(alunos.filter(a => a.id !== id));
