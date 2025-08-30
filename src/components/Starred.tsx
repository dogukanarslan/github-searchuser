import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button } from 'components';
import { fetchStarred } from 'store/slices/singleUserSlice';
import { SkipForward, SkipBack } from 'react-feather';
import { Repository } from './Repository';

interface Props {
  status: string;
}

export const Starred = (props: Props) => {
  const { status } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const { user, starred, starredLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchStarred({ login: user.login }));
    }
  }, [user, dispatch]);

  const loadMore = (type: string) => {
    if (!starredLinks) {
      return;
    }

    const urlParams = new URL(starredLinks[type]).searchParams;
    const page = urlParams.get('page');

    if (user && page) {
      setCurrentPage(parseInt(page));
      dispatch(fetchStarred({ login: user.login, page }));
    }
  };

  if (status === 'error') {
    return 'There was an error';
  }

  return (
    <div className="space-y-2">
      <h1 className="font-bold">Page {currentPage}</h1>
      <div className="space-y-2">
        {starred.map((repository) => (
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
      </div>
      <div className="text-center">
        <div className="space-x-2">
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore('prev')}
            disabled={!starredLinks?.prev}
          >
            <SkipBack />
          </Button>
          <Button
            color="primary"
            className="my-5"
            onClick={() => loadMore('next')}
            disabled={!starredLinks?.next}
          >
            <SkipForward />
          </Button>
        </div>
      </div>
    </div>
  );
};
