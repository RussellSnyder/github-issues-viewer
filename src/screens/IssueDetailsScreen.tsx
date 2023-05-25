import { Link, useParams } from "react-router-dom";
import { IssueDetailsView } from "../components/IssuesDetailsView";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const IssueDetailsScreen = () => {
  const { id } = useParams();

  return (
    <div>
      <Link to="/">
        <ArrowLeftOutlined /> Back to Issues
      </Link>
      <IssueDetailsView issueNumber={Number(id)} />
    </div>
  );
};
