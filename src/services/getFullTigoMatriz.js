const getFullTigoReventa = require("../modules/fullTigoReventa");
const getFullTigoHogar = require("../modules/fullTigoMatrizHogar");
const getFullTigoMovil = require("../modules/fulltigoMovil");
const powerBiClient = require("./powerBiClient");
const logger = require("../utilities/logger");

async function getFullTigoDatMatrizData() {
  logger.info("📡 Iniciando consulta Full Tigo Matriz a Power BI");

  try {
    const payloadfullTigoReventa = getFullTigoReventa();

    logger.debug(
      "Payload enviado a Power BI full tigo:",
      payloadfullTigoReventa,
    );

    const startTime = Date.now();
    const responseReventa = await powerBiClient.post(
      "",
      payloadfullTigoReventa,
    );

    const payloadfullTigoMovil = getFullTigoMovil();

    logger.debug("Payload enviado a Power BI full tigo:", payloadfullTigoMovil);

    const responseMovil = await powerBiClient.post("", payloadfullTigoMovil);

    const payloadfullTigoHogar = getFullTigoHogar();
    logger.debug("Payload enviado a Power BI full tigo:", payloadfullTigoHogar);

    const responseHogar = await powerBiClient.post("", payloadfullTigoHogar);
    const duration = Date.now() - startTime;

    logger.info(`✔️ Power BI respondió en ${duration} ms`);

    logger.info("✔️ Data formateada correctamente en full tigo Matriz");

    const hogarPrices =
      responseHogar.data.results[0].result.data.dsr.DS[0].PH[0].DM0.map(
        (r) => r.C,
      );

    const hogarData =
      responseHogar.data.results[0].result.data.dsr.DS[0].ValueDicts;

    const hogarMessage = {
      portafolioOne: {
        prices: hogarPrices[0],
        name: hogarData.D0[0],
        details: hogarData.D1[0],
        descuentos: {
          descuento1: hogarData.D2[0],
          descuento2: hogarData.D3[0],
        },
        tecnologia: hogarData.D4[0],
      },
      portafolioTwo: {
        prices: hogarPrices[1],
        name: hogarData.D0[1],
        details: hogarData.D1[1],
        descuentos: {
          descuento1: hogarData.D2[1],
          descuento2: hogarData.D3[0],
        },
        tecnologia: hogarData.D4[0],
      },
    };

    const movilMessage = {
      prices:
        responseMovil.data.results[0].result.data.dsr.DS[0].PH[0].DM0[0].C,
      name: responseMovil.data.results[0].result.data.dsr.DS[0].ValueDicts
        .D0[0],
      details:
        responseMovil.data.results[0].result.data.dsr.DS[0].ValueDicts.D1[0],
      descuento:
        responseMovil.data.results[0].result.data.dsr.DS[0].ValueDicts.D2[0],
    };

    const reventaMessage = {
      portafolioOne: {
        price:
          responseReventa.data.results[0].result.data.dsr.DS[0].PH[0].DM0[0]
            .C[2],
        name: responseReventa.data.results[0].result.data.dsr.DS[0].ValueDicts
          .D0[0],
        details:
          responseReventa.data.results[0].result.data.dsr.DS[0].ValueDicts
            .D1[0],
      },
      portafolioTwo: {
        price:
          responseReventa.data.results[0].result.data.dsr.DS[0].PH[0].DM0[1]
            .C[2],
        name: responseReventa.data.results[0].result.data.dsr.DS[0].ValueDicts
          .D0[1],
        details:
          responseReventa.data.results[0].result.data.dsr.DS[0].ValueDicts
            .D1[1],
      },
    };

    console.log(movilMessage);

    return {
      Movil: movilMessage,
      reventa: reventaMessage,
      hogar: hogarMessage,
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

module.exports = getFullTigoDatMatrizData;
