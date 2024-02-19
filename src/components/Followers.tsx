import { useEffect, useState } from 'react';
import { User } from './User';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Button } from 'components';
import { fetchFollowers } from 'features/singleUser/singleUserSlice';
import { SkipForward, SkipBack } from 'react-feather';
import { useRouteMatch } from 'react-router-dom';

export const Followers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { params } = useRouteMatch<{ login: string }>();

  const { user, followers, followersLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFollowers({ login: params.login }));
  }, [params, dispatch]);

  const loadMore = () => {
    const urlParams = new URL(followersLinks.next).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));
      dispatch(fetchFollowers({ login: user.login, page }));
    }
  };

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
      {followers.map((follower) => (
        <User key={follower.id} user={follower} />
      ))}
      <div className="text-center">
        <div className="space-x-2">
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore()}
            disabled={!followersLinks?.next}
          >
            <SkipBack />
          </Button>
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore()}
            disabled={!followersLinks?.next}
          >
            <SkipForward />
          </Button>
        </div>
      </div>
    </div>
  );
};
