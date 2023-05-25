import { useParams } from "react-router-dom";
import { graphql } from "../gql/gql";
import { useQuery } from "@apollo/client";

const issueQueryDocument = graphql(/* GraphQL */ `
  query issueQuery($number: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        comments(first: 100) {
          totalCount
          edges {
            cursor
            node {
              publishedAt
              reactions {
                totalCount
              }
              bodyHTML
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`);

export const IssueDetailsScreen = () => {
  const { id } = useParams();

  const { data, loading, error, refetch } = useQuery(issueQueryDocument, {
    variables: { number: Number(id) },
  });

  console.log(data);
  return <div>yolo</div>;
};
