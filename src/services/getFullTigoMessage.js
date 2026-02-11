const fullTigoMatrizMessage = require("../modules/fullTigoMatrizMessage");
const fullTigoMessage = require("../modules/fullTigoMessage");
const powerBiClient = require("./powerBiClient");
const logger = require("../utilities/logger");

async function getFullTigoData(customerANI) {
  logger.info("📡 Iniciando consulta Full Tigo a Power BI");

  try {
    const payloadfullTigoMessage = fullTigoMessage(customerANI);

    logger.debug(
      "Payload enviado a Power BI full tigo:",
      payloadfullTigoMessage,
    );

    const startTime = Date.now();
    const responseMessage = await powerBiClient.post(
      "",
      payloadfullTigoMessage,
    );

    const payloadfullTigoMatriz = fullTigoMatrizMessage(customerANI);
    logger.debug(
      "Payload enviado a Power BI full tigo:",
      payloadfullTigoMatriz,
    );

    const responseMatrizMessage = await powerBiClient.post(
      "",
      payloadfullTigoMatriz,
    );
    const duration = Date.now() - startTime;

    logger.info(`✔️ Power BI respondió en ${duration} ms`);

    logger.info("✔️ Data formateada correctamente en full tigo");
    console.log(responseMatrizMessage.data);

    const matrizMessage =
      responseMatrizMessage.data.results[0].result.data.dsr.DS[0].PH[0].DM0[0]
        .M0;

    const alertMessage =
      responseMessage.data.results[0].result.data.dsr.DS[0].PH[0].DM0[0]?.G0 ||
      "sin alerta";

    console.log(alertMessage, matrizMessage);

    return {
      matriz: matrizMessage,
      message: alertMessage,
    };
  } catch (error) {
    logger.error("❌ Error consultando Power BI:", {
      error: error.response?.data || error.message,
      stack: error.stack,
    });

    return {
      error: error.response?.data || "Error al consultar Power BI",
    };
  }
}

module.exports = getFullTigoData;
