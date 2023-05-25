import { Skeleton } from "antd";

export const Loading = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ marginBottom: 20 }}>Loading</h3>
      <Skeleton />
    </div>
  );
};
