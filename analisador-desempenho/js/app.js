"use strict";
/* APP — guarda o estado e liga os eventos aos módulos.
   O estado é sempre SUBSTITUÍDO por um novo array imutável, nunca editado. */

let alunos = Object.freeze([]);
const novoId = () => Date.now() + Math.random();

const EXEMPLO = [
  ["Ana Souza", [9, 8.5, 9.5]], ["Bruno Lima", [6, 5.5, 7]], ["Carla Dias", [3, 4, 4.5]],
  ["Diego Alves", [7.5, 8, 6.5, 7]], ["Elisa Rocha", [5, 6, 5.5]],
];

function adicionar() {
  const campos = [...document.querySelectorAll(".nota")].map(i => i.value);
  const entrada = validarEntrada($("nome").value, campos);
  $("err").textContent = entrada.erro || "";
  if (entrada.erro) return;

  alunos = adicionarAluno(alunos, criarAluno(novoId(), $("nome").value, entrada.notas));
  $("nome").value = "";
  document.querySelectorAll(".nota").forEach(i => (i.value = ""));
  render(alunos);
}

const aoApertarEnter = e => { if (e.key === "Enter") adicionar(); };

$("add").onclick = adicionar;
$("nome").onkeydown = aoApertarEnter;
document.querySelectorAll(".nota").forEach(i => (i.onkeydown = aoApertarEnter));
$("filtro").onchange = () => render(alunos);

$("corpo").onclick = e => {
  const id = e.target.dataset.id;
  if (id) { alunos = removerAluno(alunos, Number(id)); render(alunos); }
};

$("demo").onclick = () => {
  alunos = adicionarVarios(alunos, EXEMPLO.map(([nome, notas]) => criarAluno(novoId(), nome, notas)));
  render(alunos);
};

$("gerar").onclick = () => mostrarRelatorio(alunos);
$("baixar").onclick = () => baixarRelatorioPDF(alunos);

render(alunos);
