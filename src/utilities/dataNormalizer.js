function normalizeKeys(obj) {
  const cleanStr = (str) => {
    return str
      .replace(/\r\n/g, " ") // Remover \r\n
      .replace(/\n/g, " ") // Remover \n
      .replace(/\r/g, " ") // Remover \r
      .replace(/\s+/g, " ") // Múltiples espacios a uno solo
      .trim(); // Quitar espacios al inicio/final
  };

  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      // Si es array, limpiar cada elemento
      return obj.map((item) => normalizeKeys(item));
    } else {
      // Si es objeto, limpiar tanto keys como values
      const cleaned = {};
      for (const key in obj) {
        // Limpiar el key
        const cleanedKey = typeof key === "string" ? cleanStr(key) : key;
        // Limpiar el value recursivamente
        cleaned[cleanedKey] = normalizeKeys(obj[key]);
      }
      return cleaned;
    }
  } else if (typeof obj === "string") {
    // Limpiar el string
    return cleanStr(obj);
  }
  return obj;
}

module.exports = normalizeKeys;
