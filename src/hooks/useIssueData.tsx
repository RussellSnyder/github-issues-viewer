import { useQuery } from "@apollo/client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { IssueStatus } from "../components/StatusChooser";
import { ViewDataState } from "../types";
import { useViewDataState } from "./useViewDataState";
import { graphql } from "../gql/gql";
import { Issue } from "../gql/graphql";

const issueQueryDocument = graphql(/* GraphQL */ `
  query issueQuery($number: Int!, $after: String) {
    repository(owner: "facebook", name: "react") {
      issue(number: $number) {
        id
        title
        bodyHTML
        createdAt
        author {
          avatarUrl(size: 50)
          login
        }
        state
        comments(first: 100, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            cursor
            node {
              publishedAt
              reactions(first: 100) {
                totalCount
                nodes {
                  content
                }
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

export const useIssueData = (issueNumber: number) => {
  const [viewDataState, setViewDataState] = useViewDataState();

  const { data, loading, error, fetchMore, updateQuery } = useQuery(
    issueQueryDocument,
    {
      variables: { number: issueNumber },
      pollInterval: 10000,
    }
  );

  useEffect(() => {
    if (error) {
      setViewDataState(ViewDataState.Error);
      return;
    }
    if (loading || !data) {
      setViewDataState(ViewDataState.Loading);
      return;
    }
    if (data) {
      if (!data.repository?.issue) {
        setViewDataState(ViewDataState.NoResults);
        return;
      }
      setViewDataState(ViewDataState.Data);
      return;
    }
  }, [data, error, loading, setViewDataState]);

  return {
    viewDataState,
    error,
    issue: data?.repository?.issue as Issue,
    fetchMore,
    updateQuery,
  };
};
