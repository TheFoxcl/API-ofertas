const planesBase = require("../config/planes.config");

function resolverPlan(columna3) {
  const esFC = columna3.endsWith(" FC");
  let key = esFC ? columna3.slice(0, -3) : columna3;

  switch (key) {
    case "Pospago Fidelizacion 5.0":
    case "Pospago Fidelizacion 5.0_V2":
      return {
        planPowerBI:
          "Pospago Fidelizacion 5.0 (742|7421)\n" +
          "Pospago Fidelizacion 5.0_V2 (766|7661)",
      };

    case "Pospago Fidelizacion 5.0 Plus+":
    case "Pospago Fidelizacion 5.0 Plus+_V2":
      return {
        planPowerBI:
          "Pospago Fidelizacion 5.0 Plus+ (745|7451) |\n" +
          "Pospago Fidelizacion 5.0 Plus+_V2 (763|7631)",
      };

    case "Pospago Fidelizacion 5.0 Plus+ Seg_V2":
      return {
        planPowerBI:
          "Pospago Fidelizacion 5.0 Plus+ Seg_V2 (764 No Aumento tarifario|7641 - Aplica aumento tarifario)",
      };

    case "Pospago 5.13":
      return {
        planPowerBI:
          "Pospago 5.13 (750 No Aumento tarifario | 7501 - Aplica aumento tarifario)",
      };

    default: {
      const plan = planesBase[key];
      if (!plan) return null;

      return {
        planPowerBI: `${plan.nombre} (${plan.idBase}|${plan.idBase}1)`,
      };
    }
  }
}

module.exports = resolverPlan;
