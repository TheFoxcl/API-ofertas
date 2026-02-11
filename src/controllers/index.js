const logger = require("../utilities/logger");

const getFullEquipoData = require("../services/getFullEquipoInfo");
const getOfferInfo = require("../services/getOffer");
const getOfferMatrixData = require("../services/getOfferMatrixData");
const planNameID = require("../utilities/planNameID");
const getFullTigoData = require("../services/getFullTigoMessage");
const getFullTigoDatMatrizData = require("../services/getFullTigoMatriz");
const cache = require("../cache/tablesCache");

class IndexController {
  async getUserInfo(req, res) {
    logger.info("📥 Nueva solicitud a /userinfo", {
      body: req.body,
      ip: req.ip,
    });

    const { customerANI, plan, esFullTigo } = req.body;
    const start = Date.now();

    if (esFullTigo === "Full Tigo") {
      const fullTigoMessage = await getFullTigoData(customerANI);
      let fullTigoDatMatrizData = null;
      if (fullTigoMessage.matriz === "Full Tigo Matriz") {
        fullTigoDatMatrizData = await getFullTigoDatMatrizData();
      } else {
        fullTigoDatMatrizData = null;
      }
      return res.json({
        data: { fullTigoMessage, fullTigoDatMatrizData },
      });
    } else {
      try {
        logger.info("🔍 Ejecutando getOfferInfo()...");
        const offer = await getOfferInfo(customerANI);
        logger.debug("Respuesta getOfferInfo()", { offer });

        if (offer?.Alert === "No se encontró información") {
          logger.warn("⚠️ Offer Alert indica que no se encontró información");

          return res.status(400).json({
            error: "Bad request",
            offer,
            fullEquipo: null,
            matrix: null,
            info: "No se encontró información para el cliente. Verifica los datos enviados.",
          });
        }

        if (offer?.error && offer?.status) {
          logger.warn("❗ getOfferInfo respondió con error controlado", offer);

          return res.status(offer.status).json({
            offer,
            fullEquipo: null,
            matrix: null,
            info: `No se pudo obtener la oferta. Código ${offer.status}`,
          });
        }

        let fullEquipo = null;
        let matrix = null;
        let fullEquipoError = null;
        let matrixError = null;

        if (offer?.option && typeof offer.option === "string") {
          logger.info(`option recibido: "${offer.option}"`);

          if (offer.option.includes("Matriz") && plan) {
            logger.info(
              "⚙️ Cargando datos adicionales porque contiene 'Matriz'",
            );

            try {
              const t1 = Date.now();
              fullEquipo = await getFullEquipoData();
              logger.info(`✔️ getFullEquipoData() OK en ${Date.now() - t1} ms`);
            } catch (err) {
              fullEquipoError = err.response?.status || 500;
              logger.error("❌ Falló getFullEquipoData()", {
                status: fullEquipoError,
                message: err.message,
              });
            }

            try {
              const t2 = Date.now();
              const PlanName = planNameID(plan);
              console.log(PlanName.planPowerBI);
              matrix = await getOfferMatrixData(PlanName?.planPowerBI);
              logger.info(
                `✔️ getOfferMatrixData() OK en ${Date.now() - t2} ms`,
              );
            } catch (err) {
              matrixError = err.response?.status || 500;
              logger.error("❌ Falló getOfferMatrixData()", {
                status: matrixError,
                message: err.message,
              });
            }
          } else {
            logger.info("⏭️ No contiene 'Matriz'. Saltando módulos extra.");
          }
        } else {
          logger.warn(
            "⚠️ option recibido no es string. No se cargan módulos extra.",
          );
        }

        const total = Date.now() - start;
        logger.info(`🎯 /userinfo completado en ${total} ms`);

        return res.json({
          offer,
          fullEquipo,
          matrix,
          errors: {
            fullEquipo: fullEquipoError,
            matrix: matrixError,
          },
          info:
            fullEquipoError || matrixError
              ? "⚠️ Consulta completada con errores parciales"
              : "✔️ Consulta completada correctamente",
          timingMs: { total },
        });
      } catch (err) {
        const status = err.response?.status || 500;
        logger.error("🔥 ERROR crítico en /userinfo", {
          status,
          error: err.message,
        });

        let info;
        switch (status) {
          case 400:
            info = "El servidor rechazó los parámetros enviados.";
            break;
          case 404:
            info = "No se encontró información para este cliente.";
            break;
          case 502:
            info =
              "Power BI o servicio externo no está disponible (Bad Gateway).";
            break;
          case 504:
            info = "Power BI tardó demasiado en responder (Timeout).";
            break;
          default:
            info = "Error interno procesando la solicitud.";
        }

        return res.status(status).json({
          error: "Internal error",
          detail: err.message,
          status,
          info,
        });
      }
    }
  }
  async getMatrix(req, res) {
    try {
      const tables = cache.getTables();
      return res.json({ matrix: tables?.matriz || null });
    } catch (err) {
      logger.error("🔥 ERROR al obtener tablas de cache", {
        error: err.message,
      });
      return res.status(500).json({
        error: "Internal error",
        detail: err.message,
        status: 500,
        info: "Error al obtener datos de cache.",
      });
    }
  }
  async getMatrixPowerBI(req, res) {}
}

module.exports = IndexController;
