import { useEffect, useState } from 'react';
import { fetchFollowing } from 'store/slices/singleUserSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button, Users } from 'components';
import { SkipForward, SkipBack } from 'react-feather';

interface Props {
  status: string;
}

export const Following = (props: Props) => {
  const { status } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const { user, following, followingLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFollowing({ login: user.login }));
    }
  }, [user, dispatch]);

  const loadMore = () => {
    const urlParams = new URL(followingLinks.next).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));

      dispatch(fetchFollowing({ login: user.login, page }));
    }
  };

  if (status === 'error') {
    return 'There was an error';
  }
  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
      <Users users={following} count={following.length} />
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
