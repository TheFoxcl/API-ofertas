const logger = require("../utilities/logger");
const planNameID = require("../utilities/planNameID");

const parseMatrix = require("../utilities/sortMatrixData");
const formatValueDicts = require("../utilities/sortPlanDetails");
const powerBiClient = require("./powerBiClient");
const cache = require("../cache/tablesCache");

async function getExcelData(plan) {
  logger.info(`📡 Iniciando getExcelData() plan="${plan}"`);

  try {
    const startQueries = Date.now();
    const tables = cache.getTables();
    const planData = planNameID(plan);
    const planDetails =
      tables.reventa[planData?.planPowerBI.replace(/\r?\n/g, " ")];
    const ofertaPlan =
      tables.matriz[
        planData?.planPowerBI.replace(/\r?\n/g, " ").replace(/\|\d{4}/g, "")
      ];

    let data = {
      fullEquipo: { data: tables.ofertaFull },
      matrix: {
        matrixData: [
          {
            descripcion: ofertaPlan.descripcion,
            of1: ofertaPlan.oferta1,
            of2: ofertaPlan.tarifaPlena > 53900 ? ofertaPlan.oferta2 : null,
            dw:
              ofertaPlan.tarifaPlena > 53900
                ? {
                    plan: ofertaPlan.oferta3.dcto,
                    tarifa: ofertaPlan.oferta3.final,
                  }
                : null,
            retencion: {
              plan: planData?.planPowerBI
                .replace(/\r?\n/g, "")
                .replace(/\|\d{4}/g, ""),
              cb: ofertaPlan.tarifaPlena,
            },
          },
        ],
        planDetails: planDetails,
      },
    };
    console.log(ofertaPlan);

    const parallelDuration = Date.now() - startQueries;
    logger.info(`✔️ Consultas paralelas completadas en ${parallelDuration} ms`);

    // logger.debug("Procesando matrixData...");
    // let matrixDataSorted = parseMatrix(responseMatrix.data);

    // logger.debug("Procesando planDetails...");
    // let planDetails = formatValueDicts(responsePlanDetails.data);

    logger.info("🏁 Finalizando getExcelData() correctamente");

    return {
      data,
    };
  } catch (error) {
    logger.error("❌ Error en getExcelData()", {
      error: error.response?.data || error.message,
      stack: error.stack,
    });

    return {
      error: error.response?.data || "Error al consultar Power BI",
    };
  }
}

module.exports = getExcelData;
