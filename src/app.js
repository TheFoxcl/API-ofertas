const express = require("express");
const app = express();
//const { Worker } = require("worker_threads");
const cache = require("./cache/tablesCache");

app.use(express.json());

require("./routes")(app);
// const excelWorker = new Worker("./src/workers/excelWorker.js");
// excelWorker.on("message", (msg) => {
//   if (msg.type === "UPDATED") {
//     cache.setTables(msg.normalizedTables);
//   }
// });

module.exports = app;
