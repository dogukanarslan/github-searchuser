'use client';

import { fetchUsers, searchUsers } from 'store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useSearchParams } from 'next/navigation';

const PaginationButtons = () => {
  const searchParams = useSearchParams();

  const { link, status } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (link) {
      const username = searchParams.get('username');

      if (username) {
        const urlParams = new URL(link.next).searchParams;
        const page = urlParams.get('page');

        if (page) {
          dispatch(searchUsers({ username, page: parseInt(page) }));
        }
      } else {
        const urlParams = new URL(link.next).searchParams;
        const since = urlParams.get('since');

        if (since) {
          dispatch(
            fetchUsers({
              ...(since && { startingId: parseInt(since) }),
            })
          );
        }
      }
    }
  };

  return (
    <div className="text-center">
      {status === 'loading' ? (
        <div className="my-5">
          <Spinner />
        </div>
      ) : (
        <Button
          color="primary"
          className="my-5"
          onClick={loadMore}
          disabled={!link?.next}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default PaginationButtons;
