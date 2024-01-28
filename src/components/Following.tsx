import { useEffect, useState } from 'react';
import { fetchFollowing } from 'features/singleUser/singleUserSlice';
import { User } from './User';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Button } from 'components';
import { SkipForward, SkipBack } from 'react-feather';
import { useRouteMatch } from 'react-router-dom';

export const Following = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { params } = useRouteMatch<{ login: string }>();

  const { user, following, followingLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFollowing({ login: params.login }));
  }, [params]);

  const loadMore = () => {
    console.log('fetching');
    const urlParams = new URL(followingLinks.next).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));

      dispatch(fetchFollowing({ login: user.login, page }));
    }
  };

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
      {following.map((user) => (
        <User key={user.id} user={user} />
      ))}
      <div className="space-x-2 text-center">
        <Button
          color="primary"
          className="my-5"
          onClick={() => loadMore()}
          disabled={!followingLinks?.prev}
        >
          <SkipBack />
        </Button>
        <Button
          color="primary"
          className="my-5"
          onClick={() => loadMore()}
          disabled={!followingLinks?.next}
        >
          <SkipForward />
        </Button>
      </div>
    </div>
  );
};
