import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";

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
export const StatusChooser = ({ changeHandler }: Props) => (
  <Dropdown
    menu={{
      onClick: (e) => changeHandler(e.key as IssueStatus),
      items,
    }}
    trigger={["click"]}
    onOpenChange={(idk) => console.log(idk)}
  >
    <div onClick={(e) => e.preventDefault()}>
      <Space>
        Ticket Status
        <DownOutlined />
      </Space>
    </div>
  </Dropdown>
);
