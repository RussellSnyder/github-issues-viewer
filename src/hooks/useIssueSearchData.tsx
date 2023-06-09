import { useQuery } from "@apollo/client";
import { useState, useEffect, useCallback } from "react";
import { IssueStatus } from "../components/StatusChooser";
import { ViewDataState } from "../types";
import { useViewDataState } from "./useViewDataState";
import { graphql } from "../gql/gql";
import { Issue } from "../gql/graphql";

// https://github.com/orgs/community/discussions/24428#discussioncomment-3244094
const searchQueryDocument = graphql(/* GraphQL */ `
  query searchQuery($query: String!) {
    search(query: $query, type: ISSUE, first: 100) {
      nodes {
        ... on Issue {
          id
          number
          title
          state
          updatedAt
          body
          closed
          author {
            avatarUrl(size: 50)
            login
          }
        }
      }
    }
  }
`);

const createQueryString = (searchQuery: string, issueStatus?: IssueStatus) => {
  const statusFilterString =
    !issueStatus || issueStatus === "all" ? "" : `is:${issueStatus}, `;
  return `repo:facebook/react in:[title or body] ${searchQuery}, type:issue, ${statusFilterString}first: 100`;
};

const INITIAL_QUERY = "require";

export const useIssueSearchData = () => {
  const [viewDataState, setViewDataState] = useViewDataState();
  const [activeSearchTerm, setActiveSearchTerm] = useState(INITIAL_QUERY);
  const [statusFilter, setStatusFilter] = useState<IssueStatus>();

  const { data, loading, error, refetch } = useQuery(searchQueryDocument, {
    variables: { query: createQueryString(INITIAL_QUERY, statusFilter) },
  });

  const setIssueStatusFilter = useCallback(
    async (newIssueStatus: IssueStatus) => {
      if (
        (!statusFilter && newIssueStatus === "all") ||
        statusFilter === newIssueStatus
      )
        return;
      setViewDataState(ViewDataState.Loading);
      setStatusFilter(newIssueStatus);
      await refetch({
        query: createQueryString(activeSearchTerm, newIssueStatus),
      });
      if (data?.search.nodes?.length) {
        setViewDataState(ViewDataState.Data);
      } else {
        setViewDataState(ViewDataState.Loading);
      }
    },
    [
      activeSearchTerm,
      data?.search.nodes?.length,
      refetch,
      setViewDataState,
      statusFilter,
    ]
  );

  const searchForIssueByKeyword = useCallback(
    (searchTerm: string) => {
      setViewDataState(ViewDataState.Loading);
      setActiveSearchTerm(searchTerm);
      refetch({ query: createQueryString(searchTerm, statusFilter) });
    },
    [refetch, setViewDataState, statusFilter]
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
      if (!data.search.nodes?.length) {
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
    refetch,
    issues: (data?.search?.nodes as Issue[]) ?? [],
    setIssueStatusFilter,
    searchForIssueByKeyword,
    activeSearchTerm,
    statusFilter,
  };
};
