import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Button, Spinner } from 'components';
import { fetchStarred } from 'store/slices/singleUserSlice';
import { Repository } from './Repository';

export const Starred = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user, starred, starredLinks } = useAppSelector(
    (state) => state.singleUser
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const loadMore = () => {
    if (!starredLinks) {
      return;
    }

    if (user) {
      setCurrentPage(currentPage + 1);
      dispatch(fetchStarred({ login: user.login, page: `${currentPage + 1}` }));
    }
  };

  return (
    <div className="space-y-2">
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
      <div className="flex justify-center">
        <Button
          color="primary"
          className="mx-auto my-5"
          onClick={() => loadMore()}
          disabled={!starredLinks?.next || loading['singleUser/fetchStarred']}
        >
          {loading['singleUser/fetchStarred'] ? <Spinner /> : 'Load more'}
        </Button>
      </div>
    </div>
  );
};
