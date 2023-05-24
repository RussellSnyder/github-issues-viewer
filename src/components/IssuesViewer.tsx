import { useQuery } from "@apollo/client";
import { Avatar, Input, List, Skeleton } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { graphql } from "../gql/gql";
import { Issue } from "../gql/graphql";
import { useViewDataState } from "../hooks/useViewDataState";
import { ViewDataState } from "../types";
import { IssueStatus, StatusChooser } from "./StatusChooser";

const { Search } = Input;

// https://github.com/orgs/community/discussions/24428#discussioncomment-3244094
const searchQueryDocument = graphql(/* GraphQL */ `
  query searchQuery($query: String!) {
    search(query: $query, type: ISSUE, first: 100) {
      nodes {
        ... on Issue {
          id
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

interface IssuePreviewProps extends Issue {
  activeSearchTerm: string;
}

// The number of characters to add to each side of where the search term was found in the body
const BODY_SNIPPET_PADDING = 30;
const createBodySnippetWithHighlight = (
  activeSearchTerm: string,
  body?: string
): string | undefined => {
  if (!body) return;
  // get the text from around the search term in the body
  const indexOfActiveSearchTermInBody = body.indexOf(activeSearchTerm);
  if (indexOfActiveSearchTermInBody === -1) return;

  const highlight = `<strong>${activeSearchTerm}</strong>`;

  const startPoint = Math.max(
    0,
    indexOfActiveSearchTermInBody - BODY_SNIPPET_PADDING
  );
  const endPoint = Math.min(
    startPoint + activeSearchTerm.length + BODY_SNIPPET_PADDING * 2,
    body.length
  );

  const bodyExceptWithActiveSearchTerm = body.substring(startPoint, endPoint);
  return bodyExceptWithActiveSearchTerm?.replaceAll(
    activeSearchTerm,
    highlight
  );
};

const createTitleWithHighlights = (
  activeSearchTerm: string,
  title?: string
): string | undefined => {
  if (!title || title.indexOf(activeSearchTerm) === -1) return;

  const highlight = `[${activeSearchTerm}]`;

  return title?.replaceAll(activeSearchTerm, highlight);
};

const RenderItem = ({
  title,
  body,
  author,
  activeSearchTerm,
  id,
  closed,
}: IssuePreviewProps) => {
  const titleWithHighlight = createTitleWithHighlights(activeSearchTerm, title);
  const bodySnippetWithHighlight = createBodySnippetWithHighlight(
    activeSearchTerm,
    body
  );

  return (
    <List.Item actions={[<a key="list-loadmore-edit">Details</a>]}>
      <Skeleton avatar title={true} active loading={false}>
        <List.Item.Meta
          avatar={
            <Avatar
              src={
                author?.avatarUrl ??
                `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`
              }
            />
          }
          title={titleWithHighlight ?? title}
          description={
            bodySnippetWithHighlight ? (
              <p
                style={{ marginBottom: 0 }}
                dangerouslySetInnerHTML={{
                  __html: bodySnippetWithHighlight,
                }}
              />
            ) : null
          }
        />
        <small>{closed ? "CLOSED" : "OPEN"}</small>
      </Skeleton>
    </List.Item>
  );
};

const createQueryString = (searchQuery: string, issueStatus: IssueStatus) => {
  const statusFilterString = issueStatus === "all" ? "" : `is:${issueStatus}, `;
  return `repo:facebook/react in:[title or body] ${searchQuery}, type:issue, ${statusFilterString}first: 100`;
};

const INITIAL_QUERY = "require";

export const IssueViewer = () => {
  const [viewDataState, setViewDataState] = useViewDataState();
  const [searchInputValue, setSearchInputValue] = useState(INITIAL_QUERY);
  const [activeSearchTerm, setActiveSearchTerm] = useState(INITIAL_QUERY);
  const [statusFilter, setStatusFilter] = useState<IssueStatus>("all");

  const { data, loading, error, refetch } = useQuery(searchQueryDocument, {
    variables: { query: createQueryString(INITIAL_QUERY, statusFilter) },
  });

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

  const onSearch = useCallback(
    (searchTerm: string) => {
      setViewDataState(ViewDataState.Loading);
      setActiveSearchTerm(searchTerm);
      refetch({ query: createQueryString(searchTerm, statusFilter) });
    },
    [refetch, setViewDataState, statusFilter]
  );

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setSearchInputValue(newValue);
  };

  const handleIssueStatusFilterChange = (newIssueStatus: IssueStatus) => {
    setViewDataState(ViewDataState.Loading);
    setStatusFilter(newIssueStatus);
    refetch({ query: createQueryString(activeSearchTerm, newIssueStatus) });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Issue Viewer</h1>

      <Search
        value={searchInputValue}
        onChange={handleSearchQueryChange}
        placeholder="search for term (ex: hooks)"
        onSearch={onSearch}
        style={{
          width: 300,
          marginBottom: 50,
          display: "block",
          margin: "0 auto 50px",
        }}
      />
      <StatusChooser changeHandler={handleIssueStatusFilterChange} />
      <p>
        {viewDataState === ViewDataState.Initial ? "Enter a Search Term" : null}
        {viewDataState === ViewDataState.Loading ? (
          <div style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 20 }}>Loading</h3>
            <Skeleton />
          </div>
        ) : null}
        {viewDataState === ViewDataState.Error
          ? `Errors: ${error!.name} ${error!.message}`
          : null}
        {viewDataState === ViewDataState.NoResults
          ? `No results for "${searchInputValue}"`
          : null}
      </p>
      {viewDataState === ViewDataState.Data ? (
        <List
          style={{ width: "100%" }}
          itemLayout="horizontal"
          dataSource={(data!.search?.nodes! as Issue[]) ?? []}
          renderItem={(item) => (
            <RenderItem {...item} activeSearchTerm={activeSearchTerm} />
          )}
        />
      ) : null}
    </div>
  );
};
