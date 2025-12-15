function generarQueryImpactoValidation(impacto, msisdn) {
  const visualIds = {
    1: "abf9b0b4b04965228029",
    2: "984a8df1e27371ae0d0b",
    3: "9aaf40a7ea04dd1b44c4",
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
                    { Name: "i", Entity: `Impacto ${impacto}`, Type: 0 },
                    { Name: "t", Entity: "Tabla_SiNo", Type: 0 },
                  ],
                  Select: [
                    {
                      Measure: {
                        Expression: { SourceRef: { Source: "i" } },
                        Property: `Opciones Validacion imp${impacto}`,
                      },
                      Name: `Impacto ${impacto}.Opciones Validacion imp${impacto}`,
                      NativeReferenceName: `Opciones Validacion imp${impacto}`,
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
                              Property: `MSISDN OP${impacto}`,
                            },
                          },
                          Right: { Literal: { Value: `'${msisdn}'` } },
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
              VisualId: visualIds[impacto], // dinámico
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = generarQueryImpactoValidation;
