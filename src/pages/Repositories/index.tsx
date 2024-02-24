import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'app/store';

import { useEffect } from 'react';
import {
  fetchRepositories,
  resetRepositories,
} from 'features/repositories/repositoriesSlice';
import { Repository } from 'components/Repository';

export const Repositories = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.repositories);

  useEffect(() => {
    dispatch(fetchRepositories());
    return () => {
      dispatch(resetRepositories());
    };
  }, [dispatch]);

  return (
    <div className="space-y-2">
      {data.map((repository) => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </div>
  );
};
