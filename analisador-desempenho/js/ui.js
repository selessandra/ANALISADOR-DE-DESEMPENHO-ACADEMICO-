"use strict";
/* INTERFACE (desenho) — apenas converte dados em HTML e atualiza a tela.
   Recebe o estado por parâmetro; não guarda nem altera dados. */

const $ = id => document.getElementById(id);
const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const linhaTabela = a => `<tr><td>${esc(a.nome)}</td><td>${formatarNotas(a.notas)}</td><td><b>${fmt(a.media)}</b></td>
  <td><span class="tag ${a.situacao}">${a.situacao}</span></td>
  <td><button class="x" data-id="${a.id}" title="Remover">✕</button></td></tr>`;

const cardStat = (titulo, valor) => `<div class="stat"><small>${titulo}</small><b>${valor}</b></div>`;

function render(alunos) {
  const analisados = analisarTurma(alunos);                          // original intacto
  const visiveis = filtrarPorSituacao($("filtro").value)(analisados);
  const r = resumir(analisados);

  $("corpo").innerHTML = visiveis.length
    ? visiveis.map(linhaTabela).join("")
    : `<tr><td colspan="5" style="color:var(--muted)">Nenhum aluno para mostrar.</td></tr>`;

  $("stats").innerHTML = r
    ? cardStat("Média geral", fmt(r.mediaGeral)) +
      cardStat("Maior média", `${esc(r.maior.nome)} · ${fmt(r.maior.media)}`) +
      cardStat("Menor média", `${esc(r.menor.nome)} · ${fmt(r.menor.media)}`) +
      cardStat("Total de alunos", r.total)
    : `<span style="color:var(--muted)">Adicione alunos para ver as estatísticas.</span>`;

  $("relatorio").hidden = true;
}

function mostrarRelatorio(alunos) {
  $("relatorio").textContent = gerarRelatorio(alunos);
  $("relatorio").hidden = false;
}
