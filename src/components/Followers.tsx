import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Button, Users } from 'components';
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

  const loadMore = (type: string) => {
    const urlParams = new URL(followersLinks[type]).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));
      dispatch(fetchFollowers({ login: user.login, page }));
    }
  };

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
      <Users
        users={followers}
        count={followers.length}
      />
      <div className="text-center">
        <div className="space-x-2">
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore('prev')}
            disabled={!followersLinks?.prev}
          >
            <SkipBack />
          </Button>
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore('next')}
            disabled={!followersLinks?.next}
          >
            <SkipForward />
          </Button>
        </div>
      </div>
    </div>
  );
};
