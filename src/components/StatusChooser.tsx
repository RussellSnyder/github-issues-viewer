import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useCallback, useState } from "react";

const items: MenuProps["items"] = [
  {
    key: "open",
    label: "open",
  },
  {
    key: "closed",
    label: "closed",
  },
  {
    key: "all",
    label: "all",
  },
];

export type IssueStatus = "open" | "closed" | "all";

interface Props {
  changeHandler: (newStatus: IssueStatus) => void;
}
export const StatusChooser = ({ changeHandler }: Props) => {
  const [status, setStatus] = useState<IssueStatus>();

  const handleClick = useCallback(
    (newStatus: IssueStatus) => {
      setStatus(newStatus);
      changeHandler(newStatus);
    },
    [changeHandler]
  );

  return (
    <Dropdown
      menu={{
        onClick: (e) => handleClick(e.key as IssueStatus),
        items,
      }}
      trigger={["click"]}
    >
      <div
        onClick={(e) => e.preventDefault()}
        style={{
          marginBottom: 30,
        }}
      >
        <Space>
          {status !== undefined
            ? `${status} tickets`
            : "Filter by Ticket State"}
          <DownOutlined />
        </Space>
      </div>
    </Dropdown>
  );
};
