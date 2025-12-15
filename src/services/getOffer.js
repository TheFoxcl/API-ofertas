const logger = require("../utilities/logger"); // <-- tu ruta
const generarQueryImpacto = require("../modules/alert");
const crearQueryImpactoOpcion = require("../modules/opcion");
const generarQueryImpactoCases = require("../modules/cases");
const generarQueryImpactoValidation = require("../modules/validation");
const powerBiClient = require("./powerBiClient");

async function getOfferInfo(ani) {
  logger.info(`📡 Iniciando getOfferInfo() para ANI: ${ani}`);

  const customerANI = ani;

  if (!customerANI) {
    logger.warn("⚠️ Se llamó getOfferInfo sin customerANI");
    throw new Error("Debe enviar el customerANI (número del cliente)");
  }

  let impacto = 1;
  let resultText = "";
  let optionsText = "";
  let validationText = "";
  let casesText = "";

  try {
    while (impacto <= 4) {
      logger.info(`🔍 Consultando impacto: ${impacto}`);

      const payload = generarQueryImpacto(impacto, customerANI);
      logger.debug("Payload impacto enviado:", payload);

      const startTimeImpacto = Date.now();
      const response = await powerBiClient.post("", payload);
      const durationImpacto = Date.now() - startTimeImpacto;
      logger.info(`✔️ Impacto ${impacto} respondió en ${durationImpacto} ms`);

      const data = response.data;

      const M0 =
        data?.results?.[0]?.result?.data?.dsr?.DS?.[0]?.PH?.[0]?.DM0?.[0]?.M0 ||
        "";

      if (M0?.trim()) {
        logger.info(`✅ Impacto ${impacto} encontrado, texto detectado`);
        resultText = M0;

        logger.info("⏳ Consultando opción, validation y cases en paralelo...");

        const startParallel = Date.now();

        const [responseOption, responseValidation, responseCases] =
          await Promise.all([
            powerBiClient.post(
              "",
              crearQueryImpactoOpcion(customerANI, impacto)
            ),
            powerBiClient.post(
              "",
              generarQueryImpactoValidation(impacto, customerANI)
            ),
            powerBiClient.post(
              "",
              generarQueryImpactoCases(impacto, customerANI)
            ),
          ]);

        const parallelTime = Date.now() - startParallel;
        logger.info(`✔️ Consultas paralelas completadas en ${parallelTime} ms`);

        optionsText =
          responseOption.data?.results?.[0]?.result?.data?.dsr?.DS?.[0]?.PH?.[0]
            ?.DM0?.[0]?.M0 || "";

        validationText =
          responseValidation.data?.results?.[0]?.result?.data?.dsr?.DS?.[0]
            ?.PH?.[0]?.DM0?.[0]?.M0 || "";

        casesText =
          responseCases.data?.results?.[0]?.result?.data?.dsr?.DS?.[0]?.PH?.[0]
            ?.DM0?.[0]?.M0 || "";

        break; // Impacto encontrado → salir del while
      }

      logger.debug(`❌ Impacto ${impacto} vacío, avanzando al siguiente...`);
      impacto++;
    }

    logger.info(
      `🏁 Finalizando getOfferInfo(). Impacto encontrado: ${
        resultText ? impacto : "Ninguno"
      }`
    );

    return {
      customerANI,
      impacto_encontrado: resultText ? impacto : null,
      Alert: resultText || "No se encontró información",
      option: optionsText,
      validation: validationText,
      cases: casesText,
    };
  } catch (error) {
    logger.error("❌ Error consultando Power BI en getOfferInfo()", {
      error: error.response?.data || error.message,
      stack: error.stack,
    });

    return {
      error: error.response?.data || "Error al consultar Power BI",
    };
  }
}

module.exports = getOfferInfo;
