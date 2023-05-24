import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { graphql } from "../gql/gql";
import { IssueEdge } from "../gql/graphql";

const allReactIssuesWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allReactIssuesWithVariablesQuery($first: Int!) {
    repository(name: "react", owner: "facebook") {
      issues(first: $first) {
        totalCount
        edges {
          cursor
          node {
            id
            title
            state
            updatedAt
            bodyHTML
            closed
            author {
              avatarUrl(size: 50)
              login
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`);

interface IssuePreviewProps {
  title: string;
}

const IssuePreview = ({ title }: IssuePreviewProps) => {
  return <h3>{title}</h3>;
};

export const IssueViewer = () => {
  const [first, setFirst] = useState(100);

  const { data, loading, error, fetchMore } = useQuery(
    allReactIssuesWithVariablesQueryDocument,
    {
      variables: { first },
    }
  );

  const onPageChange = useCallback((page: number) => {}, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Errors: {error.name} {error.message}
      </div>
    );
  }

  if (!data) {
    return <div>no data</div>;
  }
  if (!data.repository) {
    return <div>no repository</div>;
  }
  if (!data.repository.issues.edges) {
    return <div>no issues</div>;
  }

  // At this point, we know there is data
  const issues = data.repository.issues.edges as IssueEdge[];

  return (
    <div>
      <h1>Issue Viewer</h1>

      <ul>
        {issues.map((issue) =>
          issue?.node ? (
            <IssuePreview key={issue.node.id} {...issue.node} />
          ) : null
        )}
      </ul>
    </div>
  );
};
