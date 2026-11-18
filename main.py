import csv
import sys
from pathlib import Path


def ler_alunos(caminho):
    # Lê o CSV e confere os dados.
    with open(caminho, "r", encoding="utf-8-sig", newline="") as arquivo:
        amostra = arquivo.read(2048)
        arquivo.seek(0)
        separador = ";" if amostra.count(";") > amostra.count(",") else ","
        leitor = csv.DictReader(arquivo, delimiter=separador)

        if not leitor.fieldnames or not {"nome", "nota1", "nota2"}.issubset(leitor.fieldnames):
            raise ValueError("O CSV precisa ter as colunas: nome, nota1, nota2.")

        alunos = []
        for numero, linha in enumerate(leitor, start=2):
            nome = (linha.get("nome") or "").strip()
            if not nome:
                raise ValueError(f"Linha {numero}: informe o nome do aluno.")

            notas = []
            for coluna in ("nota1", "nota2"):
                try:
                    nota = float((linha.get(coluna) or "").strip().replace(",", "."))
                except ValueError:
                    raise ValueError(f"Linha {numero}: {coluna} precisa ser um número.")
                if not 0 <= nota <= 10:
                    raise ValueError(f"Linha {numero}: {coluna} deve estar entre 0 e 10.")
                notas.append(nota)

            alunos.append({"nome": nome, "notas": notas})

    if not alunos:
        raise ValueError("O arquivo não tem alunos cadastrados.")
    return alunos


def main():
    caminho = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("alunos.csv")
    try:
        alunos = ler_alunos(caminho)
    except (OSError, ValueError) as erro:
        print(f"Erro: {erro}")
        return

    print("ALUNOS CARREGADOS")
    print("Nome                 Nota 1   Nota 2")
    print("-" * 39)
    for aluno in alunos:
        nome = aluno["nome"]
        nota1, nota2 = aluno["notas"]
        print(f"{nome:<20} {nota1:>5.1f}   {nota2:>5.1f}")
    print(f"\nTotal: {len(alunos)} aluno(s)")


if __name__ == "__main__":
    main()
