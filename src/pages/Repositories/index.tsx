import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'app/store';

import { useEffect } from 'react';
import {
  fetchRepositories,
  resetRepositories,
} from 'features/repositories/repositoriesSlice';
import { Repository } from 'components/Repository';
import { Button, Spinner } from 'components';

export const Repositories = () => {
  const dispatch = useAppDispatch();
  const { data, status, links } = useSelector(
    (state: RootState) => state.repositories
  );

  useEffect(() => {
    dispatch(fetchRepositories());
    return () => {
      dispatch(resetRepositories());
    };
  }, [dispatch]);

  const loadMore = () => {
    const urlParams = new URL(links.next).searchParams;
    const since = urlParams.get('since');

    if (since) {
      dispatch(fetchRepositories(since));
    }
  };

  return (
    <>
      <div className="space-y-2">
        {data.map((repository) => (
          <Repository key={repository.id} repository={repository} />
        ))}
      </div>
      <div className="text-center">
        {status === 'loading' ? (
          <div className="my-5">
            <Spinner />
          </div>
        ) : (
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore()}
            disabled={!links?.next}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
};
