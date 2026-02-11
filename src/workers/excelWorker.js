const { parentPort } = require("worker_threads");
const chokidar = require("chokidar");
const path = require("path");
const extractThreeTables = require("../utilities/getExcelMatrix");
const getExcelFromFolder = require("../utilities/getCarpeta");
const normalizeKeys = require("../utilities/dataNormalizer");

const FOLDER = path.join(__dirname, "matriz.xlsx");

function processExcel() {
  const excelPath = path.join(__dirname, "matriz.xlsx");

  if (!excelPath) {
    console.log("⚠️ No hay Excel en la carpeta");
    return;
  }

  console.log("📄 Procesando Excel:", excelPath);

  const tables = extractThreeTables(excelPath);
  const normalizedTables = normalizeKeys(tables);

  parentPort.postMessage({
    type: "UPDATED",
    normalizedTables,
  });
}

// 🔥 Procesar al iniciar
processExcel();

// 👀 Watcher
const watcher = chokidar.watch(FOLDER, {
  ignored: /~\$.*\.xlsx/,
  persistent: true,
});

watcher.on("change", (filePath) => {
  console.log("🔁 Excel modificado:", filePath);
  setTimeout(processExcel, 500);
});

watcher.on("add", () => {
  setTimeout(processExcel, 500);
});
