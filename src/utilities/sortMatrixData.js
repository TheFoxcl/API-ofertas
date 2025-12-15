function parseMatrix(matrixData) {
  const node = matrixData?.results?.[0]?.result?.data;
  if (!node) return [];

  const ds = node?.dsr?.DS?.[0];
  if (!ds) return [];

  const dm0Arr = ds.PH?.[0]?.DM0 ?? [];
  if (dm0Arr.length === 0) return [];

  const valueDicts = ds.ValueDicts ?? {};

  const primary = dm0Arr[0];
  const secondary = dm0Arr[1] ?? null;

  const columns = primary.S ?? [];
  const baseC = primary.C ?? [];
  const extraC = secondary?.C ?? [];

  const metricsRowCount = node.metrics?.Events?.find(
    (e) => e.Metrics?.RowCount !== undefined
  )?.Metrics?.RowCount;
  const maxDictLen = Math.max(
    0,
    ...Object.values(valueDicts).map((v) => (Array.isArray(v) ? v.length : 0))
  );
  const rowCount = metricsRowCount ?? (maxDictLen > 0 ? maxDictLen : 1);

  const safeText = (dn, idx) =>
    Array.isArray(valueDicts[dn]) ? valueDicts[dn][idx] ?? "" : "";
  const safeNum = (arr, idx) =>
    typeof arr[idx] === "number" ? arr[idx] : null;

  // ----------- NUEVA REGLA DEFINITIVA ------------
  const firstCHasValues = baseC.some((n) => n > 0);
  const secondCHasValues = extraC.some((n) => n > 0);

  // hay descuentos reales?
  const hasRealDiscounts =
    valueDicts["D1"]?.some((v) => v) || valueDicts["D2"]?.some((v) => v);

  // CASO W → primer C en ceros + NO hay descuentos en ValueDict
  const isW = !firstCHasValues && !hasRealDiscounts && secondCHasValues;

  // CASO V2 / D → primer C en ceros + SÍ hay descuentos
  const isV2_D = !firstCHasValues && hasRealDiscounts && secondCHasValues;
  // ------------------------------------------------

  const result = [];

  for (let r = 0; r < rowCount; r++) {
    const row = {
      descripcion: safeText(columns[0]?.DN, r),

      of1: {
        dcto: isW ? "" : safeText(columns[1]?.DN, r),
        tarifa: isW ? null : isV2_D ? safeNum(extraC, 1) : safeNum(baseC, 2),
      },

      of2: {
        dcto: isW ? "" : safeText(columns[3]?.DN, r),
        tarifa: isW ? null : isV2_D ? safeNum(extraC, 3) : safeNum(baseC, 4),
      },

      dw: {
        plan: safeText(columns[5]?.DN, r),
        tarifa: isV2_D ? safeNum(extraC, 5) : safeNum(baseC, 6),
      },

      retencion: {
        plan: safeText(columns[7]?.DN, r),
        cb: safeText(columns[8]?.DN, 0),
      },
    };

    result.push(row);
  }

  return result;
}

module.exports = parseMatrix;
