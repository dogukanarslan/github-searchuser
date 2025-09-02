import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button, Spinner } from 'components';
import { fetchRepositores } from 'store/slices/singleUserSlice';
import { Repository } from 'components/Repository';
import { SkipBack, SkipForward } from 'react-feather';

export const Repositories = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user, repositories, repositoriesLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchRepositores({ username: user.login, page: 1 }));
    }
  }, [user, dispatch]);

  const loadMore = (type: string) => {
    if (!repositoriesLinks) {
      return;
    }

    const urlParams = new URL(repositoriesLinks[type]).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));
      dispatch(
        fetchRepositores({ username: user.login, page: parseInt(page) })
      );
    }
  };

  if (loading['singleUser/fetchRepositories']) {
    return <Spinner />;
  }

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
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
      <div className="text-center">
        <div className="space-x-2">
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore('prev')}
            disabled={!repositoriesLinks?.prev}
          >
            <SkipBack />
          </Button>
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore('next')}
            disabled={!repositoriesLinks?.next}
          >
            <SkipForward />
          </Button>
        </div>
      </div>
    </div>
  );
};
