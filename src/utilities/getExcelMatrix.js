const XLSX = require("xlsx");

function readSheet(filePath, sheetName) {
  const wb = XLSX.readFile(filePath);
  const sheet = wb.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { header: 1 });
}

function parseOfertaFull(rows) {
  const result = {};

  rows.slice(1).forEach((row) => {
    const key = row[0];
    if (!key) return;

    result[key] = {
      oferta: row[1],
      precio: row[3],
    };
  });

  return result;
}
function parseReventa(rows) {
  const headers = rows[0];
  const result = {};

  rows.slice(2).forEach((row) => {
    const key = row[0];
    if (!key) return;

    result[key] = headers.reduce((obj, h, i) => {
      if (i === 0) return obj;
      obj[h] = row[i];
      return obj;
    }, {});
  });

  return result;
}
function parseMatriz(rows) {
  const result = {};

  rows.slice(3).forEach((row) => {
    const key = row[0];
    if (!key) return;

    result[key] = {
      descripcion: row[1],
      tarifaPlena: row[2],
      oferta1: {
        dcto: row[3],
        final: row[4],
      },
      oferta2: {
        dcto: row[5],
        final: row[6],
      },
      oferta3: {
        dcto: row[7],
        final: row[8],
      },
    };
  });

  return result;
}

function parseExcelMatrix(filePath) {
  return {
    ofertaFull: parseOfertaFull(readSheet(filePath, "oferta full")),
    reventa: parseReventa(readSheet(filePath, "reventa")),
    matriz: parseMatriz(readSheet(filePath, "matriz")),
  };
}

module.exports = parseExcelMatrix;
