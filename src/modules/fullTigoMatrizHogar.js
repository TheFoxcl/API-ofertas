function getFullTigoHogar() {
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
                      Name: "p1",
                      Entity: "PASO2 FT",
                      Type: 0,
                    },
                  ],
                  Select: [
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "Portafolio",
                      },
                      Name: "PASO2 FT.Portafolio",
                      NativeReferenceName: "Portafolio",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "Oferta",
                      },
                      Name: "PASO2 FT.Oferta",
                      NativeReferenceName: "Oferta",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "TP E 1 - 3",
                      },
                      Name: "Sum(PASO2 FT.TP E 1 - 3)",
                      NativeReferenceName: "TP E 1 - 3",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "TP E 4 - 6",
                      },
                      Name: "Sum(PASO2 FT.TP E 4 - 6)",
                      NativeReferenceName: "TP E 4 - 6",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "Dcto E 1 -3",
                      },
                      Name: "PASO2 FT.Dcto E 1 -3",
                      NativeReferenceName: "Dcto E 1 -3",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "TF E 1 - 3",
                      },
                      Name: "Sum(PASO2 FT.TF E 1 - 3)",
                      NativeReferenceName: "TF E 1 - 3",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "Dcto E 4-6",
                      },
                      Name: "PASO2 FT.Dcto E 4-6",
                      NativeReferenceName: "Dcto E 4-6",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "TF E 4 - 6",
                      },
                      Name: "Sum(PASO2 FT.TF E 4 - 6)",
                      NativeReferenceName: "TF E 4 - 6",
                    },
                    {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "p1",
                          },
                        },
                        Property: "Tecnología",
                      },
                      Name: "PASO2 FT.Tecnología",
                      NativeReferenceName: "Tecnología",
                    },
                  ],
                  OrderBy: [
                    {
                      Direction: 1,
                      Expression: {
                        Column: {
                          Expression: {
                            SourceRef: {
                              Source: "p1",
                            },
                          },
                          Property: "TP E 4 - 6",
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
        CacheKey:
          '{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"p1","Entity":"PASO2 FT","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"Portafolio"},"Name":"PASO2 FT.Portafolio","NativeReferenceName":"Portafolio"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"Oferta"},"Name":"PASO2 FT.Oferta","NativeReferenceName":"Oferta"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"TP E 1 - 3"},"Name":"Sum(PASO2 FT.TP E 1 - 3)","NativeReferenceName":"TP E 1 - 3"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"TP E 4 - 6"},"Name":"Sum(PASO2 FT.TP E 4 - 6)","NativeReferenceName":"TP E 4 - 6"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"Dcto E 1 -3"},"Name":"PASO2 FT.Dcto E 1 -3","NativeReferenceName":"Dcto E 1 -3"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"TF E 1 - 3"},"Name":"Sum(PASO2 FT.TF E 1 - 3)","NativeReferenceName":"TF E 1 - 3"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"Dcto E 4-6"},"Name":"PASO2 FT.Dcto E 4-6","NativeReferenceName":"Dcto E 4-6"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"TF E 4 - 6"},"Name":"Sum(PASO2 FT.TF E 4 - 6)","NativeReferenceName":"TF E 4 - 6"},{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"Tecnología"},"Name":"PASO2 FT.Tecnología","NativeReferenceName":"Tecnología"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"p1"}},"Property":"TP E 4 - 6"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0,1,2,3,4,5,6,7,8],"Subtotal":1}]},"DataReduction":{"DataVolume":3,"Primary":{"Window":{"Count":500}}},"Version":1},"ExecutionMetricsKind":1}}]}',
        QueryId: "",
        ApplicationContext: {
          DatasetId: "cd5adb66-02e9-40c2-be93-eca0ba8455ec",
          Sources: [
            {
              ReportId: "436e395d-4b55-426f-b6b4-ebe8e20dab1a",
              VisualId: "8ea57bb975185ab43bda",
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = getFullTigoHogar;
