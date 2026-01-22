function getPlanData(plan, value) {
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
                            Source: "b",
                          },
                        },
                        Property: "Plan",
                      },
                      Name: "BENEFICIOS.Plan",
                      NativeReferenceName: "PLAN",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "b",
                          },
                        },
                        Property: "BENEFICIOS",
                      },
                      Name: "BENEFICIOS.BENEFICIOS",
                      NativeReferenceName: "BENEFICIOS",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "b",
                          },
                        },
                        Property: "GB",
                      },
                      Name: "BENEFICIOS.GB",
                      NativeReferenceName: "GB",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "b",
                          },
                        },
                        Property: "COMPARTIR",
                      },
                      Name: "BENEFICIOS.COMPARTIR",
                      NativeReferenceName: "COMPARTIR",
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
                        Projections: [0, 1, 2, 3],
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
              VisualId: "18ff827631727e2697d1",
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = getPlanData;
