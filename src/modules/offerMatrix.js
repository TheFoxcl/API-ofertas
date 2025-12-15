function getMatrixData(plan, value) {
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
                      Name: "m",
                      Entity: "MATRIZ",
                      Type: 0,
                    },
                    {
                      Name: "b",
                      Entity: "BENEFICIOS",
                      Type: 0,
                    },
                  ],
                  Select: [
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "Descripción",
                      },
                      Name: "MATRIZ.Descripción",
                      NativeReferenceName: "Descripción",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "OF1 Dcto x  6 meses",
                      },
                      Name: "MATRIZ.OF1 Dcto x  6 meses",
                      NativeReferenceName: "1 Dcto x  6 meses",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "OF1 Tarifa Final",
                      },
                      Name: "Sum(MATRIZ.OF1 Tarifa Final)",
                      NativeReferenceName: "OF1 Tarifa Final",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "OF2 Dcto x  6 meses",
                      },
                      Name: "MATRIZ.OF2 Dcto x  6 meses",
                      NativeReferenceName: "2 Dcto x  6 meses",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "OF2 Tarifa Final",
                      },
                      Name: "Sum(MATRIZ.OF2 Tarifa Final)",
                      NativeReferenceName: "2 Tarifa Final",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "DW Plan",
                      },
                      Name: "MATRIZ.DW Plan",
                      NativeReferenceName: "DW Plan",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "DW Tarifa Final",
                      },
                      Name: "Sum(MATRIZ.DW Tarifa Final)",
                      NativeReferenceName: "DW Tarifa Final",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "Plan a ofrecer Retención",
                      },
                      Name: "MATRIZ.Plan a ofrecer Retención",
                      NativeReferenceName: "Plan a ofrecer Retención",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "m",
                          },
                        },
                        Property: "CB Anterior - CB Nuevo",
                      },
                      Name: "MATRIZ.CB Anterior - CB Nuevo",
                      NativeReferenceName: "CB Anterior - CB Nuevo",
                    },
                  ],
                  Where: [
                    {
                      Condition: {
                        In: {
                          Expressions: [
                            {
                              Column: {
                                Expression: {
                                  SourceRef: {
                                    Source: "b",
                                  },
                                },
                                Property: " CB (validar tarifas actualizadas",
                              },
                            },
                          ],
                          Values: [
                            [
                              {
                                Literal: {
                                  Value: `${value}M`,
                                },
                              },
                            ],
                          ],
                        },
                      },
                    },
                    {
                      Condition: {
                        In: {
                          Expressions: [
                            {
                              Column: {
                                Expression: {
                                  SourceRef: {
                                    Source: "b",
                                  },
                                },
                                Property: "Plan",
                              },
                            },
                          ],
                          Values: [
                            [
                              {
                                Literal: {
                                  Value: `'${plan}'`,
                                },
                              },
                            ],
                          ],
                        },
                      },
                    },
                  ],
                },
                Binding: {
                  Primary: {
                    Groupings: [
                      {
                        Projections: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        Subtotal: 1,
                      },
                    ],
                  },
                  DataReduction: {
                    DataVolume: 3,
                    Primary: {
                      Window: {
                        Count: 500,
                      },
                    },
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
              VisualId: "6ccba9b401d4f8f62be8",
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = getMatrixData;
