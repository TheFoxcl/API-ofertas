function generarQueryImpacto(impactoNumero, msisdn) {
  const entity = `Impacto ${impactoNumero}`;
  const mensaje = `Mensaje opc${impactoNumero}`;
  const msisdnField = `MSISDN OP${impactoNumero}`;

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
                        Property: mensaje,
                      },
                      Name: `${entity}.${mensaje}`,
                      NativeReferenceName: mensaje,
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
              VisualId: "VISUAL-AQUI",
            },
          ],
        },
      },
    ],
    cancelQueries: [],
    modelId: 1840631,
  };
}

module.exports = generarQueryImpacto;
