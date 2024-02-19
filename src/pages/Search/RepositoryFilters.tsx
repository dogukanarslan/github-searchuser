import { useState, useEffect } from 'react';
import { Input } from 'components';
import { useAppDispatch } from '../../app/store';
import { fetchSearchRepository } from '../../features/search/searchRepositorySlice';
import { useDebouncedValue } from 'hooks/useDebouncedValue';

export const RepositoryFilters = () => {
  const [repositoryName, setRepositoryName] = useState('');

  const dispatch = useAppDispatch();

  const debouncedSearchValue = useDebouncedValue(repositoryName);

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(
        fetchSearchRepository({ type: 'repositories', q: debouncedSearchValue })
      );
    }
  }, [debouncedSearchValue, dispatch]);

  return (
    <Input
      type="text"
      value={repositoryName}
      onChange={(e) => setRepositoryName(e.target.value)}
      placeholder="Repository name"
    />
  );
};
