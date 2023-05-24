import { Layout, Space, Typography } from "antd";
import "antd/dist/reset.css";
import "./App.module.css";
import "./index.css";

import {} from "antd/es/layout/layout";
import { IssueViewer } from "./components/IssuesViewer";
import { green } from "@ant-design/colors";
import {
  GithubOutlined,
  BarsOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from "@ant-design/icons";

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100%",
        maxWidth: 1400,
        margin: "auto",
      }}
    >
      <Space direction="vertical" size={[0, 100]} style={{ width: "100%" }}>
        <Layout>
          <Layout.Header
            style={{
              backgroundColor: green[6],
              textAlign: "center",
            }}
          >
            <Typography.Title
              level={2}
              style={{ marginTop: 10, color: "white" }}
            >
              <GithubOutlined />
              <span style={{ marginLeft: 20 }}>React Issue Viewer</span>
            </Typography.Title>
          </Layout.Header>
          <Layout.Content
            style={{
              paddingTop: 40,
              maxWidth: 900,
              width: "100",
              margin: "auto",
            }}
          >
            <IssueViewer />
          </Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
