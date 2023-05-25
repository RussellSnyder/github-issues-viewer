import { Avatar } from "antd";
import { Actor } from "../gql/graphql";

interface Props extends Partial<Actor> {
  showLogin?: boolean;
}

export const UserPreview = ({ login, avatarUrl, showLogin = true }: Props) => {
  return (
    <>
      {showLogin ? <span style={{ marginRight: 10 }}>{login}</span> : null}
      <span>
        <Avatar
          src={
            avatarUrl ??
            `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${login}`
          }
        />
      </span>
    </>
  );
};
