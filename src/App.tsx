import { green } from "@ant-design/colors";
import { GithubOutlined } from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "antd/dist/reset.css";
import "./App.module.css";
import "./index.css";

import { IssueViewer } from "./components/IssuesViewer";
import { IssueDetailsScreen } from "./screens/IssueDetailsScreen";

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
            <a href="/">
              <Typography.Title
                level={2}
                style={{ marginTop: 10, color: "white" }}
              >
                <GithubOutlined />
                <span style={{ marginLeft: 20 }}>React Issue Viewer</span>
              </Typography.Title>
            </a>
          </Layout.Header>
          <Layout.Content
            style={{
              padding: "40px 20px",
              maxWidth: 900,
              width: "100%",
              margin: "auto",
            }}
          >
            <Router>
              <Routes>
                <Route path="/" element={<IssueViewer />} />
                <Route path="/issue/:id" element={<IssueDetailsScreen />} />
              </Routes>
            </Router>
          </Layout.Content>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
