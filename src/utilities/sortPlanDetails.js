function formatValueDicts(valueDicts) {
  const dicts = valueDicts.results[0].result.data.dsr.DS[0].ValueDicts;
  return {
    plan: dicts.D0?.[0] || "",
    beneficios: dicts.D1?.[0] || "",
    gb: dicts.D2?.[0] || "",
    compartir: dicts.D3?.[0] || "",
  };
}

module.exports = formatValueDicts;
