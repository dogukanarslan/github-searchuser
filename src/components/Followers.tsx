import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';
import { IUser } from 'models';

interface FollowersProps {
  followers: IUser[];
}

export const Followers = (props: FollowersProps) => {
  const { followers } = props;
  console.log('followers', followers);
  return (
    <ListGroup style={{ maxWidth: 400 }} className="mx-auto">
      {followers.map((follower) => (
        <Link
          key={follower.id}
          to={`/details/${follower.login}`}
          className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
        >
          <img
            className="rounded-circle"
            src={follower.avatar_url}
            width="40"
            alt="User"
          />
          <h6>{follower.login}</h6>
        </Link>
      ))}
    </ListGroup>
  );
};
