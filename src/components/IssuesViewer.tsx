import { useQuery } from "@apollo/client";
import { graphql } from "../gql/gql";

const allReactIssuesWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allReactIssuesWithVariablesQuery($first: Int!) {
    repository(name: "react", owner: "facebook") {
      issues(first: $first) {
        nodes {
          title
        }
      }
    }
  }
`);

export const IssueViewer = () => {
  const { data } = useQuery(allReactIssuesWithVariablesQueryDocument, {
    variables: { first: 10 },
  });

  console.log(data);
  return <div>Issue Viewer</div>;
};
