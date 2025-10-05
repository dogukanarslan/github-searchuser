'use client';

import { useAppDispatch, useAppSelector } from 'store/store';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { fetchRepositories } from 'store/slices/repositoriesSlice';

const PaginationButtons = () => {
  const { link, status } = useAppSelector((state) => state.repositories);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (link) {
      const urlParams = new URL(link.next).searchParams;
      const since = urlParams.get('since');

      if (since) {
        dispatch(fetchRepositories(since));
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
