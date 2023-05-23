import type { CodegenConfig } from "@graphql-codegen/cli";

console.log("test", process.env.REACT_APP_GITHUB_ACCESS_TOKEN);
console.log("test2", process.env.ACCESS_TOKEN);
const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.docs.graphql",
  documents: "src/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
