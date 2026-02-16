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
    console.log("🔍 Plan data resuelta:", planData);
    const planDetails =
      tables.reventa[planData?.planPowerBI.replace(/\r?\n/g, " ")];

    const key = planData?.planPowerBI
      .replace(/\r?\n/g, " ")
      .replace(/\|\d{4}/g, "");

    const keys = Object.keys(tables.matriz);
    const index = keys.indexOf(key);

    const upOne = tables.matriz[keys[index + 1]];
    const upTwo = tables.matriz[keys[index + 2]];

    const ofertaPlan =
      tables.matriz[
        planData?.planPowerBI.replace(/\r?\n/g, " ").replace(/\|\d{4}/g, "")
      ];

    let data = {
      fullEquipo: { data: tables.ofertaFull },
      matrix: {
        matrixData: [
          {
            descripcion: ofertaPlan?.descripcion ?? null,
            of1: ofertaPlan?.oferta1 ?? null,
            of2:
              ofertaPlan?.tarifaPlena > 53900
                ? (ofertaPlan?.oferta2 ?? null)
                : null,
            dw:
              ofertaPlan?.tarifaPlena > 53900
                ? {
                    plan: ofertaPlan?.oferta3?.dcto ?? null,
                    tarifa: ofertaPlan?.oferta3?.final ?? null,
                  }
                : null,
            retencion: {
              plan:
                planData?.planPowerBI
                  ?.replace(/\r?\n/g, "")
                  ?.replace(/\|\d{4}/g, "") ?? null,
              cb: ofertaPlan?.tarifaPlena ?? null,
            },
          },
          {
            descripcion: upOne?.descripcion ?? null,
            of1: upOne?.oferta1 ?? null,
            of2: upOne?.tarifaPlena > 53900 ? (upOne?.oferta2 ?? null) : null,
            dw:
              upOne?.tarifaPlena > 53900
                ? {
                    plan: upOne?.oferta3?.dcto ?? null,
                    tarifa: upOne?.oferta3?.final ?? null,
                  }
                : null,
            retencion: {
              plan: keys[index + 1] ?? null,
              cb: upOne?.tarifaPlena ?? null,
            },
          },
          {
            descripcion: upTwo?.descripcion ?? null,
            of1: upTwo?.oferta1 ?? null,
            of2: upTwo?.tarifaPlena > 53900 ? (upTwo?.oferta2 ?? null) : null,
            dw:
              upTwo?.tarifaPlena > 53900
                ? {
                    plan: upTwo?.oferta3?.dcto ?? null,
                    tarifa: upTwo?.oferta3?.final ?? null,
                  }
                : null,
            retencion: {
              plan: keys[index + 2] ?? null,
              cb: upTwo?.tarifaPlena ?? null,
            },
          },
        ],
        planDetails: planDetails,
      },
    };

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
