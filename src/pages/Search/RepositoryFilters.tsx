import { useState, FormEvent } from 'react';
import { Input } from 'components';
import { Button } from 'components/Button';
import { useAppDispatch } from '../../app/store';
import { fetchSearchRepository } from '../../features/search/searchRepositorySlice';

export const RepositoryFilters = () => {
  const [repositoryName, setRepositoryName] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchSearchRepository({ type: 'repositories', q: repositoryName })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={repositoryName}
        onChange={(e) => setRepositoryName(e.target.value)}
        placeholder="Repository name"
      />

      <Button
        color="primary"
        className="mt-1"
        type="submit"
        disabled={!repositoryName}
      >
        Fetch
      </Button>
    </form>
  );
};
