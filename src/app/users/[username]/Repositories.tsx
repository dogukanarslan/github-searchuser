import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button, Spinner } from 'components';
import { fetchRepositories } from 'store/slices/singleUserSlice';
import { Repository } from 'components/Repository';

export const Repositories = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user, repositories, repositoriesLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchRepositories({ username: user.login, page: 1 }));
    }
  }, [user, dispatch]);

  const loadMore = () => {
    if (!repositoriesLinks) {
      return;
    }

    if (user) {
      setCurrentPage(currentPage + 1);
      dispatch(
        fetchRepositories({ username: user.login, page: currentPage + 1 })
      );
    }
  };

  return (
    <div className="space-y-2">
      {repositories.map((repository) => (
        <Repository
          key={repository.id}
          name={repository.name}
          owner={repository.owner.login}
          description={repository.description || ''}
          full_name={repository.full_name}
          stargazers_count={repository.stargazers_count || 0}
          watchers_count={repository.watchers_count || 0}
        />
      ))}
      <div className="flex justify-center">
        <Button
          color="primary"
          className="mx-auto my-5"
          onClick={() => loadMore()}
          disabled={
            !repositoriesLinks?.next || loading['singleUser/fetchRepositories']
          }
        >
          {loading['singleUser/fetchRepositories'] ? <Spinner /> : 'Load more'}
        </Button>
      </div>
    </div>
  );
};
