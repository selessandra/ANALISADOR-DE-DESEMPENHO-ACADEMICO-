# ANALISADOR-DE-DESEMPENHO-ACADEMICO-

## Executar

```bash
python main.py
```

Lê `alunos.csv` por padrão. Para escolher outro arquivo:

```bash
python main.py caminho/do/arquivo.csv
```

O CSV precisa das colunas `nome`, `nota1` e `nota2`. Notas de 0 a 10. O exemplo é fictício.

## Regras do projeto

- Média abaixo de 4,0: reprovado.
- Média de 4,0 a 6,9: em recuperação.
- Média igual ou acima de 7,0: aprovado.

Essas faixas são provisórias e devem ser ajustadas se a instituição usar outros critérios.
