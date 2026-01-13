const getFullTigo = require("../modules/fullEquipo");
const powerBiClient = require("./powerBiClient");
const logger = require("../utilities/logger");

async function getFullEquipoData() {
  logger.info("📡 Iniciando consulta getFullEquipoData() a Power BI");

  try {
    const payload = getFullTigo();
    logger.debug("Payload enviado a Power BI:", payload);

    const startTime = Date.now();
    const response = await powerBiClient.post("", payload);
    const duration = Date.now() - startTime;

    logger.info(`✔️ Power BI respondió en ${duration} ms`);

    const ds0 = response.data.results[0].result.data.dsr.DS[0];
    const rows = ds0.PH[0].DM0;

    const ofertas = ds0.ValueDicts.D0;
    const portafolios = ds0.ValueDicts.D1;

    logger.debug(`Filas recibidas: ${rows.length}`);
    logger.debug("Ofertas recibidas:", ofertas);
    logger.debug("Portafolios recibidos:", portafolios);

    let formatted = {};

    rows.forEach((row) => {
      // Extraer valor de G0 (precio)
      const valor = row.S ? row.C[0] : row.C[0];

      // Extraer índices de D0 y D1
      const ofertaIndex = row.C[1];
      const portafolioIndex = row.C[2];

      const oferta = ofertas[ofertaIndex];
      const portafolio = portafolios[portafolioIndex];

      formatted[portafolio] = { oferta, valor };
    });

    logger.info("✔️ Data formateada correctamente en getFullEquipoData");
    console.log(formatted);

    return { data: formatted };
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

module.exports = getFullEquipoData;
