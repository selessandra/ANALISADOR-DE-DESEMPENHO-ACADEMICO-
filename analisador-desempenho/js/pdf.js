"use strict";

const baixarRelatorioPDF = alunos => {
  const linhas = gerarRelatorio(alunos).split("\n").flatMap(texto => {
    const partes = [];
    while (texto.length > 95) {
      const corte = texto.lastIndexOf(" ", 95);
      partes.push(texto.slice(0, corte < 1 ? 95 : corte));
      texto = texto.slice(corte < 1 ? 95 : corte).trim();
    }
    partes.push(texto);
    return partes;
  });
  const paginas = [];
  for (let i = 0; i < linhas.length; i += 50) paginas.push(linhas.slice(i, i + 50));
  const fonte = 3 + paginas.length * 2;
  const objetos = ["<< /Type /Catalog /Pages 2 0 R >>", `<< /Type /Pages /Kids [${paginas.map((_, i) => `${3 + i * 2} 0 R`).join(" ")}] /Count ${paginas.length} >>`];

  paginas.forEach((pagina, i) => {
    const id = 3 + i * 2;
    const texto = ["BT /F1 10 Tf 50 790 Td 14 TL", ...pagina.map(linha => {
      const bytes = Array.from(linha, c => (c.charCodeAt(0) <= 255 ? c.charCodeAt(0) : 63).toString(16).padStart(2, "0")).join("");
      return `<${bytes}> Tj T*`;
    }), "ET"].join("\n");
    objetos.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fonte} 0 R >> >> /Contents ${id + 1} 0 R >>`);
    objetos.push(`<< /Length ${texto.length + 1} >>\nstream\n${texto}\nendstream`);
  });

  objetos.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objetos.forEach((obj, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objetos.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map(n => `${String(n).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
  link.download = "relatorio-desempenho.pdf";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};
