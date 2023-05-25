import { Layout, List, Space, Typography } from "antd";
import { IssueComment, IssueCommentEdge } from "../gql/graphql";
import { useIssueData } from "../hooks/useIssueData";
import { ViewDataState } from "../types";
import { NoDataView } from "./NoDataView";
import { UserPreview } from "./UserPreview";

import "./IssueDetailsView.css";
import { useMemo } from "react";

interface CommentProps extends IssueComment {}

const CommentView = ({
  bodyHTML,
  reactions,
  publishedAt,
  author,
}: CommentProps) => {
  return (
    <Space
      direction="vertical"
      style={{ marginBottom: 10, padding: 10, borderBottom: "2px solid grey" }}
    >
      <Typography.Paragraph>
        <UserPreview {...author} /> |{" "}
        {new Date(publishedAt).toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}{" "}
        | {reactions.totalCount} reactions
      </Typography.Paragraph>
      <Typography.Paragraph>
        <div
          className="issue-body"
          dangerouslySetInnerHTML={{ __html: bodyHTML }}
        />
      </Typography.Paragraph>
      <Typography.Paragraph></Typography.Paragraph>
    </Space>
  );
};
interface Props {
  issueNumber: number;
}

export const IssueDetailsView = ({ issueNumber }: Props) => {
  const { viewDataState, error, issue } = useIssueData(issueNumber);

  const comments = useMemo(() => {
    if (viewDataState !== ViewDataState.Data) return [];

    return issue!.comments!.edges! as IssueCommentEdge[];
  }, [issue, viewDataState]);

  return (
    <Layout>
      {viewDataState === ViewDataState.Data ? (
        <>
          <div style={{ textAlign: "right", width: "100%" }}>
            <p>Status: {issue.state}</p>
            <p>
              {new Date(issue.createdAt).toLocaleDateString()} -{" "}
              <UserPreview {...issue.author} />
            </p>
          </div>
          <Typography.Title level={2} style={{ marginBottom: 30 }}>
            {issue.title}
          </Typography.Title>

          {issue.comments.totalCount < 1 ? (
            "No Comments :-("
          ) : (
            <List
              header={
                <Typography.Title level={3}>
                  Comments ({issue.comments.totalCount})
                </Typography.Title>
              }
              dataSource={comments}
              renderItem={(comment) => <CommentView {...comment!.node!} />}
            />
          )}
        </>
      ) : (
        <NoDataView viewDataState={viewDataState} error={error} />
      )}
    </Layout>
  );
};
