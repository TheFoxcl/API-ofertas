function getFullEquipo() {
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
                  From: [{ Name: "f", Entity: "FT", Type: 0 }],
                  Select: [
                    {
                      Column: {
                        Expression: { SourceRef: { Source: "f" } },
                        Property: "E 1 - 6",
                      },
                      Name: "Sum(FT.E 1 - 6)",
                      NativeReferenceName: "E 1 - 6",
                    },
                    {
                      Column: {
                        Expression: { SourceRef: { Source: "f" } },
                        Property: "Oferta",
                      },
                      Name: "FT.Oferta",
                      NativeReferenceName: "Oferta",
                    },
                    {
                      Column: {
                        Expression: { SourceRef: { Source: "f" } },
                        Property: "Portafolio",
                      },
                      Name: "FT.Portafolio",
                      NativeReferenceName: "Portafolio",
                    },
                  ],
                },
                Binding: {
                  Primary: {
                    Groupings: [{ Projections: [0, 1, 2], Subtotal: 1 }],
                  },
                  DataReduction: {
                    DataVolume: 3,
                    Primary: { Window: { Count: 500 } },
                  },
                  Version: 1,
                },
                ExecutionMetricsKind: 1,
              },
            },
          ],
        },
        CacheKey: "...",
        QueryId: "",
        ApplicationContext: {
          DatasetId: "cd5adb66-02e9-40c2-be93-eca0ba8455ec",
          Sources: [
            {
              ReportId: "436e395d-4b55-426f-b6b4-ebe8e20dab1a",
              VisualId: "18e2b36d681f81a0de85",
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = getFullEquipo;
