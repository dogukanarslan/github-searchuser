'use client';

import { fetchUsers } from 'store/slices/usersSlice';
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
      const urlParams = new URL(link.next).searchParams;
      const since = urlParams.get('since');
      const perPage = searchParams.get('per_page');

      if (since) {
        dispatch(
          fetchUsers({
            startingId: since ? parseInt(since) : undefined,
            ...(perPage && { resultsPerPage: perPage }),
          })
        );
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
