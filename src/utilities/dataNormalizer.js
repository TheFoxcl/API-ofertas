function normalizeKeys(obj) {
  const result = {};

  for (const key of Object.keys(obj)) {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, "_");

    result[normalizedKey] = obj[key];
  }

  return result;
}

module.exports = normalizeKeys;
