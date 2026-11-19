"use strict";
/* ESTATÍSTICAS — maior/menor média, média geral, contagens e ranking */

// Fábrica de seletores: recebe um comparador e devolve o aluno "melhor".
const selecionarPor = comparador => alunos =>
  alunos.reduce((melhor, atual) => (comparador(atual.media, melhor.media) ? atual : melhor));

const maiorMedia = selecionarPor((a, b) => a > b);
const menorMedia = selecionarPor((a, b) => a < b);

const mediaGeral = pipe(map(prop("media")), calcularMedia);

const contarPorSituacao = alunos =>
  alunos.reduce((acc, a) => ({ ...acc, [a.situacao]: acc[a.situacao] + 1 }), SITUACOES_ZERADAS);

// sort em CÓPIA, para não modificar a coleção original
const ordenarPorMediaDesc = alunos => [...alunos].sort((a, b) => b.media - a.media);

const resumir = alunos =>
  alunos.length === 0
    ? null
    : {
        total: alunos.length,
        mediaGeral: mediaGeral(alunos),
        maior: maiorMedia(alunos),
        menor: menorMedia(alunos),
        contagem: contarPorSituacao(alunos),
      };
