"use strict";
/* NOTAS — cálculo de média e validação/conversão da entrada digitada */

const calcularMedia = valores => valores.reduce(somar, 0) / valores.length;
const arredondarMedia = media => Math.round((media + Number.EPSILON) * 100) / 100;

// Aceita vírgula ou ponto: "5,5" e "5.5" viram 5.5
const textoParaNota = texto => Number(texto.trim().replace(",", "."));
const notaValida = n => !Number.isNaN(n) && n >= 0 && n <= 10;

// Devolve { erro } ou { notas } — nunca lança nem altera nada.
const validarEntrada = (nome, textos) => {
  const notas = textos.map(t => t.trim()).filter(t => t !== "").map(textoParaNota);
  if (!nome.trim()) return { erro: "Informe o nome do aluno." };
  if (notas.length === 0) return { erro: `Informe pelo menos uma nota (máximo de ${MAX_NOTAS}).` };
  if (notas.length > MAX_NOTAS) return { erro: `No máximo ${MAX_NOTAS} notas por aluno.` };
  if (!notas.every(notaValida)) return { erro: "As notas devem ser números entre 0 e 10." };
  return { notas };
};
