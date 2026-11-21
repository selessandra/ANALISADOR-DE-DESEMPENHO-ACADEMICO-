# Analisador de Desempenho Acadêmico

Projeto de Paradigmas de Programação (foco em programação funcional).

## Como executar
Abra a pasta no VS Code e abra index.html no navegador
(ou use a extensão Live Server). Não precisa instalar nada.

## Arquivos
- index.html: estrutura da página
- style.css: estilo (claro/escuro automático)
- js/: um arquivo por funcionalidade (carregados nesta ordem pelo index.html):

| Arquivo | Funcionalidade |
|---|---|
| utils.js | utilitários funcionais: pipe, compose, map, filter, reduce, deepFreeze |
| regras.js | limites de nota (7 e 5), máximo de 4 notas e classificar |
| notas.js | calcularMedia, conversão de vírgula/ponto e validação |
| alunos.js | registrar e remover alunos (sempre devolvendo nova lista) |
| analise.js | média e situação de cada aluno (analisarTurma) |
| filtro.js | filtrar alunos por situação |
| estatisticas.js | maior/menor média, média geral, contagens e ranking |
| formatacao.js | formatação de números e textos |
| relatorio.js | geração do relatório de desempenho |
| ui.js | desenho da tela (tabela e cards) |
| pdf.js | criação e download do relatório em PDF |
| app.js | estado, eventos e salvamento local dos alunos |

## Regras
- Aprovado: média >= 7 | Recuperação: de 5 a menos de 7 | Reprovado: < 5
- De 1 a 4 notas por aluno (aceita vírgula ou ponto: 5,5 ou 5.5)

## Onde cada conceito aparece em os arquivos de js/
| Critério | Exemplos no código |
|---|---|
| Funções puras | calcularMedia, classificar, comMedia, comSituacao, mediaGeral, contarPorSituacao, validarEntrada, formatarRelatorio |
| Imutabilidade | deepFreeze, Object.freeze, spread ({...aluno}, [...alunos]); no modo estrito, alterar objeto congelado gera erro |
| Composição | pipe, compose, analisarAluno = pipe(comMedia, comSituacao), gerarRelatorio = pipe(analisarTurma, formatarRelatorio) |
| Funções de primeira classe | funções passadas como argumento e retornadas: criarClassificador, selecionarPor, filtrarPorSituacao, map/filter/reduce parcialmente aplicadas |
| Processamento de coleções | map, filter, reduce, find, every, sort em cópia (ordenarPorMediaDesc) |

Os dados originais (alunos) nunca são alterados: a média e a situação são
calculadas em uma nova coleção (analisarTurma(alunos)) a cada renderização.

## COLABORADORES

Alan Sérgio Rodrigues de Carvalho (01697157)

Alessandra Júlia S. Mendonça (01710330)

Alfred Manoel Vicente Silva da Rocha (01695802)

Jhonas Xavier dos Santos Silva (01694333)

Pedro Artur R. F. Nogueira (01705061)

Guilherme De Oliveira Lopes Silva (01699872)

Marcos Emanuel Celestino Tavares (01718690)
