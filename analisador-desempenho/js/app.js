"use strict";
/* APP — guarda o estado e liga os eventos aos módulos.
   O estado é sempre SUBSTITUÍDO por um novo array imutável, nunca editado. */

const CHAVE_ALUNOS = "analisador-desempenho-alunos";
const carregarAlunos = () => {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_ALUNOS) || "[]");
    return Object.freeze(Array.isArray(dados) ? dados.map(a => criarAluno(a.id, a.nome, a.notas)) : []);
  } catch { return Object.freeze([]); }
};

let alunos = carregarAlunos();
const novoId = () => Date.now() + Math.random();

const atualizarAlunos = novos => {
  alunos = novos;
  try {
    localStorage.setItem(CHAVE_ALUNOS, JSON.stringify(alunos));
    $("err").textContent = "";
  } catch { $("err").textContent = "Não foi possível salvar neste navegador."; }
  render(alunos);
};

const EXEMPLO = [
  ["Ana Souza", [9, 8.5, 9.5]], ["Bruno Lima", [6, 5.5, 7]], ["Carla Dias", [3, 4, 4.5]],
  ["Diego Alves", [7.5, 8, 6.5, 7]], ["Elisa Rocha", [5, 6, 5.5]],
];

function adicionar() {
  const campos = [...document.querySelectorAll(".nota")].map(i => i.value);
  const entrada = validarEntrada($("nome").value, campos);
  $("err").textContent = entrada.erro || "";
  if (entrada.erro) return;

  atualizarAlunos(adicionarAluno(alunos, criarAluno(novoId(), $("nome").value, entrada.notas)));
  $("nome").value = "";
  document.querySelectorAll(".nota").forEach(i => (i.value = ""));
}

const aoApertarEnter = e => { if (e.key === "Enter") adicionar(); };

$("add").onclick = adicionar;
$("nome").onkeydown = aoApertarEnter;
document.querySelectorAll(".nota").forEach(i => (i.onkeydown = aoApertarEnter));
$("filtro").onchange = () => render(alunos);

$("corpo").onclick = e => {
  const id = e.target.dataset.id;
  if (id) atualizarAlunos(removerAluno(alunos, Number(id)));
};

$("demo").onclick = () => {
  const novos = EXEMPLO
    .filter(([nome, notas]) => !alunos.some(a => a.nome === nome && a.notas.join() === notas.join()))
    .map(([nome, notas]) => criarAluno(novoId(), nome, notas));
  if (novos.length) atualizarAlunos(adicionarVarios(alunos, novos));
};

$("limpar").onclick = () => {
  if (alunos.length && confirm("Apagar todos os alunos?")) {
    $("filtro").value = "Todos";
    atualizarAlunos(Object.freeze([]));
  }
};

$("gerar").onclick = () => mostrarRelatorio(alunos);
$("baixar").onclick = () => baixarRelatorioPDF(alunos);

render(alunos);
