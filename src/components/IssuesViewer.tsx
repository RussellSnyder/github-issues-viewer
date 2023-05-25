import { Avatar, Input, List, Skeleton } from "antd";
import { graphql } from "../gql/gql";
import { Issue } from "../gql/graphql";
import { useIssueSearchData } from "../hooks/useIssueSearchData";
import { ViewDataState } from "../types";
import { KeywordSearch } from "./KeywordSearch";
import { Loading } from "./Loading";
import { StatusChooser } from "./StatusChooser";
import { NoDataView } from "./NoDataView";

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
  number,
}: IssuePreviewProps) => {
  const titleWithHighlight = createTitleWithHighlights(activeSearchTerm, title);
  const bodySnippetWithHighlight = createBodySnippetWithHighlight(
    activeSearchTerm,
    body
  );

  return (
    <List.Item actions={[<a href={`/issue/${number}`}>Details</a>]}>
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

export const IssueViewer = () => {
  const {
    viewDataState,
    error,
    issues,
    setIssueStatusFilter,
    searchForIssueByKeyword,
    activeSearchTerm,
  } = useIssueSearchData();

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Issue Viewer</h1>

      <KeywordSearch onSearch={searchForIssueByKeyword} />
      <StatusChooser changeHandler={setIssueStatusFilter} />
      {viewDataState === ViewDataState.Data ? (
        <List
          style={{ width: "100%" }}
          itemLayout="horizontal"
          dataSource={issues}
          renderItem={(item) => (
            <RenderItem {...item} activeSearchTerm={activeSearchTerm} />
          )}
        />
      ) : (
        <NoDataView
          viewDataState={viewDataState}
          error={error}
          activeSearchTerm={activeSearchTerm}
        />
      )}
    </div>
  );
};
