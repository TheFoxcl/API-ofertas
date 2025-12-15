function generarQueryImpactoCases(impactoNumero, msisdn) {
  const entity = `Impacto ${impactoNumero}`;
  const medida = `Casos_Uso_imp${impactoNumero}`;
  const msisdnField = `MSISDN OP${impactoNumero}`;

  const visualIds = {
    1: "7efd533660651a228c73",
    2: "bdbf222c9e90db04a995",
    3: "1c6500786773a1ed965d",
  };

  return {
    version: "1.0.0",
    queries: [
      {
        Query: {
          Commands: [
            {
              SemanticQueryDataShapeCommand: {
                Query: {
                  Version: 2,
                  From: [
                    { Name: "i", Entity: entity, Type: 0 },
                    { Name: "t", Entity: "Tabla_SiNo", Type: 0 },
                  ],
                  Select: [
                    {
                      Measure: {
                        Expression: { SourceRef: { Source: "i" } },
                        Property: medida,
                      },
                      Name: `${entity}.${medida}`,
                      NativeReferenceName: medida,
                    },
                  ],
                  Where: [
                    {
                      Condition: {
                        In: {
                          Expressions: [
                            {
                              Column: {
                                Expression: { SourceRef: { Source: "t" } },
                                Property: "respuestas",
                              },
                            },
                          ],
                          Values: [[{ Literal: { Value: "'No'" } }]],
                        },
                      },
                    },
                    {
                      Condition: {
                        Contains: {
                          Left: {
                            Column: {
                              Expression: { SourceRef: { Source: "i" } },
                              Property: msisdnField,
                            },
                          },
                          Right: {
                            Literal: { Value: `'${msisdn}'` },
                          },
                        },
                      },
                    },
                  ],
                },
                Binding: {
                  Primary: { Groupings: [{ Projections: [0] }] },
                  DataReduction: { DataVolume: 3, Primary: { Top: {} } },
                  Version: 1,
                },
                ExecutionMetricsKind: 1,
              },
            },
          ],
        },
        QueryId: "",
        ApplicationContext: {
          DatasetId: "cd5adb66-02e9-40c2-be93-eca0ba8455ec",
          Sources: [
            {
              ReportId: "436e395d-4b55-426f-b6b4-ebe8e20dab1a",
              VisualId: visualIds[impactoNumero],
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = generarQueryImpactoCases;
