const fs = require("fs");
const path = require("path");

function getExcelFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  const excel = files.find(
    (f) => !f.startsWith("~$") && (f.endsWith(".xlsx") || f.endsWith(".xls")),
  );

  if (!excel) return null;

  return path.join(folderPath, excel);
}

module.exports = getExcelFromFolder;
