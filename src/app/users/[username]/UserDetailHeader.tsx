'use client';

import { useAppDispatch, useAppSelector } from 'store/store';
import { Button } from 'components';
import {
  followUser,
  setIsFollowedByAuthenticatedUser,
  unfollowUser,
} from 'store/slices/singleUserSlice';
import { useEffect } from 'react';

interface Props {
  isFollowedByAuthenticated?: boolean;
}

export const UserDetailHeader = (props: Props) => {
  const { isFollowedByAuthenticated } = props;
  const { authenticatedUser, user, isFollowedByAuthenticatedUser } =
    useAppSelector((state) => state.singleUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFollowedByAuthenticated !== undefined) {
      dispatch(setIsFollowedByAuthenticatedUser(isFollowedByAuthenticated));
    }
  }, [isFollowedByAuthenticated, dispatch]);

  if (!user) {
    return;
  }

  const { login, avatar_url, public_repos, followers, following } = user;

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
        {authenticatedUser && authenticatedUser.login !== login && (
          <Button onClick={handleFollow} className="w-full">
            {isFollowedByAuthenticatedUser ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
    </div>
  );
};
