import { IUser } from 'models';
import { User } from './User';

interface FollowingProps {
  following: IUser[];
}

export const Following = (props: FollowingProps) => {
  const { following } = props;

  return (
    <ul className="space-y-2">
      {following.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
};
