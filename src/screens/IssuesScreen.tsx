import { IssueViewer } from "../components/IssuesViewer";

export const IssuesScreen = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>Issues</h1>

      <IssueViewer />
    </div>
  );
};
