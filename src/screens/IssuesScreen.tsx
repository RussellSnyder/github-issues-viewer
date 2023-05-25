import { Layout, Typography } from "antd";
import { IssueViewer } from "../components/IssuesViewer";

export const IssuesScreen = () => {
  return (
    <Layout>
      <Typography.Title style={{ textAlign: "center", marginBottom: 30 }}>
        Issues
      </Typography.Title>

      <IssueViewer />
    </Layout>
  );
};
