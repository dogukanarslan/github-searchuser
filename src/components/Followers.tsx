import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Button, Spinner, Users } from 'components';
import { fetchFollowers } from 'features/singleUser/singleUserSlice';
import { SkipForward, SkipBack } from 'react-feather';

interface Props {
  status: string;
}

export const Followers = (props: Props) => {
  const { status } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const { user, followers, followersLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFollowers({ login: user.login }));
    }
  }, [user, dispatch]);

  const loadMore = (type: string) => {
    if (!followersLinks) {
      return;
    }

    const urlParams = new URL(followersLinks[type]).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));
      dispatch(fetchFollowers({ login: user.login, page }));
    }
  };

  if (loading['singleUser/fetchFollowers']) {
    return <Spinner />;
  }

  if (status === 'error') {
    return 'There was an error';
  }

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
      <Users users={followers} count={followers.length} />
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
