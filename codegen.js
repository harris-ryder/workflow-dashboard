export default {
  schema: [
    {
      [`http://localhost:8080/v1/graphql`]: {
        headers: {
          "x-hasura-admin-secret": "myadminsecretkey",
        },
      },
    },
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        scalars: {
          _numeric: "number[]",
          _text: "string[]",
          _uuid: "string[]",
          numeric: "number",
          timestamp: "string",
          timestamptz: "string",
          uuid: "string",
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
