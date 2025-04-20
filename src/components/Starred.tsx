import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Button } from 'components';
import { fetchStarred } from 'features/singleUser/singleUserSlice';
import { SkipForward, SkipBack } from 'react-feather';
import { useRouteMatch } from 'react-router-dom';
import { Repository } from './Repository';

interface Props {
  status: string;
}

export const Starred = (props: Props) => {
  const { status } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const { params } = useRouteMatch<{ login: string }>();

  const { user, starred, starredLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStarred({ login: params.login }));
  }, [params, dispatch]);

  const loadMore = (type: string) => {
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
