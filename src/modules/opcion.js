function crearQueryImpactoOpcion(msisdn, impactoNumero) {
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
                    {
                      Name: "i",
                      Entity: `Impacto ${impactoNumero}`,
                      Type: 0,
                    },
                    {
                      Name: "t",
                      Entity: "Tabla_SiNo",
                      Type: 0,
                    },
                  ],
                  Select: [
                    {
                      Measure: {
                        Expression: {
                          SourceRef: { Source: "i" },
                        },
                        Property: `Opcion_1_Imp${impactoNumero}`,
                      },
                      Name: `Impacto ${impactoNumero}.Opcion_1_Imp${impactoNumero}`,
                      NativeReferenceName: `Opcion_1_Imp${impactoNumero}`,
                    },
                    {
                      Measure: {
                        Expression: {
                          SourceRef: { Source: "i" },
                        },
                        Property: `Opcion_1_Titulo_imp${impactoNumero}`,
                      },
                      Name: `Impacto ${impactoNumero}.Opcion_1_Titulo_imp${impactoNumero}`,
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
                          Values: [
                            [
                              {
                                Literal: { Value: "'No'" },
                              },
                            ],
                          ],
                        },
                      },
                    },
                    {
                      Condition: {
                        Contains: {
                          Left: {
                            Column: {
                              Expression: { SourceRef: { Source: "i" } },
                              Property: `MSISDN OP${impactoNumero}`,
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
                  Primary: {
                    Groupings: [
                      {
                        Projections: [0],
                      },
                    ],
                  },
                  Projections: [1],
                  DataReduction: {
                    DataVolume: 3,
                    Primary: { Top: {} },
                  },
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
              VisualId:
                impactoNumero === 1
                  ? "5ea5e47f99e92bd5d3b5"
                  : "06e3a23163367a930810",
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = crearQueryImpactoOpcion;
