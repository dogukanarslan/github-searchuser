'use client';

import { fetchUsers } from 'store/slices/usersSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useSearchParams } from 'next/navigation';

const PaginationButtons = () => {
  const searchParams = useSearchParams();

  const { links, status } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    const urlParams = new URL(links.next).searchParams;
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
          disabled={!links?.next}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default PaginationButtons;
