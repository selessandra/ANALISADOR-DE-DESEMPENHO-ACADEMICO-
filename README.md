# 🎓 Analisador de Desempenho Acadêmico

Aplicação web simples para registrar alunos e notas, calcular médias, classificar a situação de cada aluno e gerar um relatório de desempenho da turma.

Projeto desenvolvido para a disciplina de **Paradigmas de Programação**, com foco em **programação funcional**: funções puras, imutabilidade, composição de funções, funções de primeira classe e processamento de coleções.

Feito apenas com **HTML, CSS e JavaScript puro**, sem frameworks, sem bibliotecas e sem necessidade de instalar nada.

---

## ✨ Funcionalidades

- Registrar uma lista de alunos e suas notas (de 1 a 4 notas por aluno)
- Calcular a média de cada estudante
- Classificar os alunos como **aprovados**, em **recuperação** ou **reprovados**
- Identificar a **maior** e a **menor** média
- Calcular a **média geral** da turma
- Filtrar alunos por situação
- Gerar um **relatório de desempenho** com ranking

## 📏 Regras de classificação

| Situação | Média |
|---|---|
| ✅ Aprovado | maior ou igual a 7 |
| ⚠️ Recuperação | de 5 até menos de 7 |
| ❌ Reprovado | menor que 5 |

As notas devem estar entre **0 e 10** e aceitam vírgula ou ponto como separador decimal (`5,5` ou `5.5`).

---

## 🚀 Como executar

Não é necessário instalar nada.

**Opção 1: abrir direto**
1. Clone ou baixe este repositório.
2. Dê dois cliques em `index.html`.

**Opção 2: Live Server (VS Code)**
1. Instale a extensão **Live Server**.
2. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

**Opção 3: servidor local com Python**
```bash
python -m http.server 8080
```
Depois acesse `http://localhost:8080`.

```bash
git clone https://github.com/SEU-USUARIO/analisador-desempenho.git
cd analisador-desempenho
```

---

## 🖥️ Como usar

1. Digite o nome do aluno e preencha de 1 a 4 notas.
2. Clique em **Adicionar** (ou pressione Enter).
3. Use **Carregar exemplo** para preencher a turma com dados de teste.
4. Use o filtro para ver apenas Aprovados, Em recuperação ou Reprovados.
5. Clique em **Gerar relatório** para ver o resumo da turma.

Exemplo de relatório gerado:

```
RELATÓRIO DE DESEMPENHO
=======================
Total de alunos: 5
Média geral da turma: 6,35
Maior média: Ana Souza (9,00)
Menor média: Carla Dias (3,83)
Aprovados: 2 | Recuperação: 2 | Reprovados: 1

Ranking (maior para menor média):
- Ana Souza: 9,00 (Aprovado)
- Diego Alves: 7,25 (Aprovado)
- Bruno Lima: 6,17 (Recuperação)
- Elisa Rocha: 5,50 (Recuperação)
- Carla Dias: 3,83 (Reprovado)
```

---

## 📁 Estrutura do projeto

```
analisador-desempenho/
├── index.html
├── style.css
├── README.md
└── js/
    ├── utils.js          # pipe, compose, map, filter, reduce, deepFreeze
    ├── regras.js         # limites de nota e classificação
    ├── notas.js          # média e validação da entrada
    ├── alunos.js         # registrar e remover alunos
    ├── analise.js        # média e situação de cada aluno
    ├── filtro.js         # filtro por situação
    ├── estatisticas.js   # maior/menor média, média geral, ranking
    ├── formatacao.js     # formatação de números e textos
    ├── relatorio.js      # geração do relatório
    ├── ui.js             # desenho da tela
    └── app.js            # estado e eventos
```

Cada arquivo em `js/` cuida de uma única funcionalidade. Eles são carregados com `<script>` comuns, na ordem de dependência definida no `index.html` (assim o projeto funciona abrindo o arquivo direto, sem servidor).

---

## 🧠 Conceitos de programação funcional

| Conceito | Onde aparece |
|---|---|
| **Funções puras** | `calcularMedia`, `classificar`, `comMedia`, `comSituacao`, `mediaGeral`, `contarPorSituacao`, `validarEntrada`, `formatarRelatorio` |
| **Imutabilidade** | `deepFreeze`, `Object.freeze`, spread (`{...aluno}`, `[...alunos]`); `adicionarAluno` e `removerAluno` devolvem uma nova lista; `"use strict"` faz qualquer mutação lançar erro |
| **Composição de funções** | `pipe`, `compose`, `analisarAluno = pipe(comMedia, comSituacao)`, `gerarRelatorio = pipe(analisarTurma, formatarRelatorio)` |
| **Funções de primeira classe** | funções passadas como argumento e retornadas: `criarClassificador`, `selecionarPor`, `filtrarPorSituacao`, `map`/`filter`/`reduce` curriadas |
| **Processamento de coleções** | `map`, `filter`, `reduce`, `find`, `every` e `sort` aplicado em cópia (`ordenarPorMediaDesc`) |

### Exemplo: composição

```js
// notas -> média -> situação
const analisarAluno = pipe(comMedia, comSituacao);

// alunos brutos -> alunos analisados -> texto do relatório
const gerarRelatorio = pipe(analisarTurma, formatarRelatorio);
```

### Exemplo: função que devolve função

```js
const criarClassificador = regras => media =>
  regras.find(regra => media >= regra.minimo).situacao;

const classificar = criarClassificador(REGRAS);
classificar(7.5); // "Aprovado"
```

### Dados originais nunca são alterados

A lista guarda apenas os dados brutos (nome e notas), congelados com `Object.freeze`. A média e a situação são calculadas em uma **nova coleção** a cada renderização:

```js
const analisados = analisarTurma(alunos); // `alunos` continua intacto
```

O estado da aplicação (`app.js`) é sempre **substituído** por um novo array imutável, nunca editado no lugar.

---

## 🛠️ Tecnologias

- HTML5
- CSS3 (com suporte automático a tema claro e escuro)
- JavaScript (ES6+)

## 👤 Autor

Desenvolvido por **SEU NOME**.

## 📄 Licença

Projeto de uso acadêmico. Sinta-se à vontade para estudar e adaptar.
