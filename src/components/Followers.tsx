import { IUser } from 'models';
import { User } from './User';

interface FollowersProps {
  followers: IUser[];
}

export const Followers = (props: FollowersProps) => {
  const { followers } = props;

  return (
    <ul className="space-y-2">
      {followers.map((follower) => (
        <User key={follower.id} user={follower} />
      ))}
    </ul>
  );
};
