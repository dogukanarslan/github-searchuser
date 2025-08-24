import { useAppDispatch, useAppSelector } from 'store/store';
import { Button } from 'components';
import { followUser, unfollowUser } from 'features/singleUser/singleUserSlice';

interface Props {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  isFollowedByAuthenticatedUser?: boolean;
}

export const UserDetailHeader = (props: Props) => {
  const {
    login,
    avatar_url,
    public_repos,
    followers,
    following,
    isFollowedByAuthenticatedUser,
  } = props;

  const { authenticatedUser } = useAppSelector((state) => state.singleUser);

  const dispatch = useAppDispatch();

  const handleFollow = () => {
    if (isFollowedByAuthenticatedUser) {
      dispatch(unfollowUser(login));
    } else {
      dispatch(followUser(login));
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row">
      <img className="w-48 rounded-full" src={avatar_url} alt="" />
      <div>
        <ul className="flex gap-x-5 text-center">
          <li>
            <div>
              <div className="font-bold">{public_repos}</div>
              <h3>Repositories</h3>
            </div>
          </li>
          <li>
            <div>
              <div className="font-bold">{followers}</div>
              <h3>Followers</h3>
            </div>
          </li>
          <li>
            <div>
              <div className="font-bold">{following}</div>
              <h3>Following</h3>
            </div>
          </li>
        </ul>
        {authenticatedUser?.login !== login && (
          <Button onClick={handleFollow} className="w-full">
            {isFollowedByAuthenticatedUser ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
    </div>
  );
};
