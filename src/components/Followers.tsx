import { Link } from 'react-router-dom';
import { IUser } from 'models';

interface FollowersProps {
  followers: IUser[];
}

export const Followers = (props: FollowersProps) => {
  const { followers } = props;
  console.log('followers', followers);
  return (
    <ul>
      {followers.map((follower) => (
        <Link key={follower.id} to={`/details/${follower.login}`} className="">
          <img src={follower.avatar_url} width="80" alt="User" />
          <h6>{follower.login}</h6>
        </Link>
      ))}
    </ul>
  );
};
