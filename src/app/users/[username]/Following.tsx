import { useState } from 'react';
import { fetchFollowing } from 'store/slices/singleUserSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button, Spinner, Users } from 'components';

export const Following = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user, following, followingLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (!followingLinks) {
      return;
    }

    if (user) {
      setCurrentPage(currentPage + 1);
      dispatch(
        fetchFollowing({ login: user.login, page: `${currentPage + 1}` })
      );
    }
  };

  return (
    <div className="space-y-2">
      <Users users={following} />
      <div className="flex justify-center">
        <Button
          color="primary"
          className="mx-auto my-5"
          onClick={() => loadMore()}
          disabled={
            !followingLinks?.next || loading['singleUser/fetchFollowing']
          }
        >
          {loading['singleUser/fetchFollowing'] ? <Spinner /> : 'Load more'}
        </Button>
      </div>
    </div>
  );
};
