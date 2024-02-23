import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'app/store';

import { useEffect } from 'react';
import {
  fetchRepositories,
  resetRepositories,
} from 'features/repositories/repositoriesSlice';

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
        <div
          key={repository.id}
          className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
          <div className="bg-white p-4 sm:p-6">
            <h3 className="mt-0.5 text-lg text-gray-900">{repository.name}</h3>
            <p className="mt-2 text-sm text-gray-500">
              {repository.owner.login}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
