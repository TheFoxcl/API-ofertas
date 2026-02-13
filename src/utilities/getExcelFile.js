const path = require("path");
const extractThreeTables = require("../utilities/getExcelMatrix");
const normalizeKeys = require("../utilities/dataNormalizer");
const cache = require("../cache/tablesCache");

function processExcel() {
  const excelPath = path.join(__dirname, "..", "workers", "matriz.xlsx");

  if (!excelPath) {
    console.log("⚠️ No hay Excel en la carpeta");
    return;
  }

  console.log("📄 Procesando Excel:", excelPath);

  const tables = extractThreeTables(excelPath);
  const normalizedTables = normalizeKeys(tables);
  cache.setTables(normalizedTables);

  return normalizedTables;
}

module.exports = processExcel;
