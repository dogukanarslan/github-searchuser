import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button, Spinner, Users } from 'components';
import { fetchFollowers } from 'store/slices/singleUserSlice';

export const Followers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user, followers, followersLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (!followersLinks) {
      return;
    }

    if (user) {
      setCurrentPage(currentPage + 1);
      dispatch(
        fetchFollowers({ login: user.login, page: `${currentPage + 1}` })
      );
    }
  };

  return (
    <div className="space-y-2">
      <Users users={followers} />
      <div className="flex justify-center">
        <Button
          color="primary"
          className="my-5"
          onClick={() => loadMore()}
          disabled={
            !followersLinks?.next || loading['singleUser/fetchFollowers']
          }
        >
          {loading['singleUser/fetchFollowers'] ? <Spinner /> : 'Load more'}
        </Button>
      </div>
    </div>
  );
};
