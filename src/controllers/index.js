const logger = require("../utilities/logger");

const getFullEquipoData = require("../services/getFullEquipoInfo");
const getOfferInfo = require("../services/getOffer");
const getOfferMatrixData = require("../services/getOfferMatrixData");

class IndexController {
  async getUserInfo(req, res) {
    logger.info("📥 Nueva solicitud a /userinfo", {
      body: req.body,
      ip: req.ip,
    });

    const { customerANI, plan, value } = req.body;

    const start = Date.now();

    try {
      logger.info("🔍 Ejecutando getOfferInfo()...");
      const offer = await getOfferInfo(customerANI);
      logger.debug("Respuesta getOfferInfo()", { offer });

      let fullEquipo = null;
      let matrix = null;

      if (offer?.option && typeof offer.option === "string") {
        logger.info(`option recibido: "${offer.option}"`);

        if (offer.option.includes("Matriz")) {
          logger.info(
            "🔧 option contiene 'Matriz'. Ejecutando módulos adicionales:"
          );

          const t1 = Date.now();
          fullEquipo = await getFullEquipoData();
          const tFull = Date.now() - t1;

          logger.info(`✔️ getFullEquipoData() completado en ${tFull} ms`);

          const t2 = Date.now();
          matrix = await getOfferMatrixData(plan, value);
          const tMatrix = Date.now() - t2;

          logger.info(`✔️ getOfferMatrixData() completado en ${tMatrix} ms`);
        } else {
          logger.info(
            "🚫 No contiene 'Matriz'. No se cargan datos adicionales."
          );
        }
      } else {
        logger.warn("⚠️ option recibido no es válido", {
          option: offer?.option,
        });
      }

      const total = Date.now() - start;
      logger.info(`🎉 /userinfo completado en ${total} ms`);

      return res.json({
        offer,
        fullEquipo,
        matrix,
      });
    } catch (err) {
      logger.error("🔥 ERROR en /userinfo", {
        error: err.message,
        stack: err.stack,
      });

      return res.status(500).json({
        error: "Internal error",
        detail: err.message,
      });
    }
  }
}

module.exports = IndexController;
