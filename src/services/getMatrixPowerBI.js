const logger = require("../utilities/logger");
const getMatrixData = require("../modules/offerMatrix");
const getPlanData = require("../modules/planDetails");

const parseMatrix = require("../utilities/sortMatrixData");
const formatValueDicts = require("../utilities/sortPlanDetails");
const powerBiClient = require("./powerBiClient");

async function getMatrixPowerBI(plan) {
  logger.info(`📡 Iniciando getMatrixPowerBI() plan="${plan}"`);

  try {
    const startQueries = Date.now();

    logger.info("⏳ Consultando matriz y planDetails en paralelo...");

    const [responseMatrix, responsePlanDetails] = await Promise.all([
      powerBiClient.post("", getMatrixData(plan)),
      powerBiClient.post("", getPlanData(plan)),
    ]);

    const parallelDuration = Date.now() - startQueries;
    logger.info(`✔️ Consultas paralelas completadas en ${parallelDuration} ms`);

    logger.debug("Procesando matrixData...");
    let matrixDataSorted = parseMatrix(responseMatrix.data);

    logger.debug("Procesando planDetails...");
    let planDetails = formatValueDicts(responsePlanDetails.data);

    // --- LOGICA DE REGLAS ---

    if (matrixDataSorted[1]?.retencion.plan.includes("W")) {
      logger.info("⚙️ Aplicando regla: retención plan contiene 'W'");

      matrixDataSorted[1].of1.dcto = "";
      matrixDataSorted[1].of1.tarifa = "";
      matrixDataSorted[1].of2.dcto = matrixDataSorted[0].of2.dcto;
      matrixDataSorted[1].dw.plan = matrixDataSorted[0].dw.plan;
    }

    if (matrixDataSorted[0]?.retencion.plan.includes("_V2")) {
      logger.info("⚙️ Aplicando regla: plan contiene '_V2'");

      matrixDataSorted[0].of1.tarifa = "";
      matrixDataSorted[0].of2.tarifa = "";
      matrixDataSorted[0].dw.plan = "";
      matrixDataSorted[0].dw.tarifa = "0";
      matrixDataSorted[1].descripcion = matrixDataSorted[0].descripcion;
    }

    logger.info("🏁 Finalizando getOfferMatrixData() correctamente");

    return {
      matrixData: matrixDataSorted,
      planDetails,
    };
  } catch (error) {
    logger.error("❌ Error en getOfferMatrixData()", {
      error: error.response?.data || error.message,
      stack: error.stack,
    });

    return {
      error: error.response?.data || "Error al consultar Power BI",
    };
  }
}

module.exports = getMatrixPowerBI;
