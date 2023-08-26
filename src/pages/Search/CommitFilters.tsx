import { useState, FormEvent } from 'react';
import { Input } from 'components';
import { Button } from 'components/Button';
import { useAppDispatch } from '../../app/store';
import { fetchSearchCommit } from '../../features/search/searchCommitSlice';

export const CommitFilters = () => {
  const [commitMessage, setCommitMessage] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSearchCommit({ type: 'commits', q: commitMessage }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={commitMessage}
        onChange={(e) => setCommitMessage(e.target.value)}
        placeholder="Commit message"
      />

      <Button className="mt-1" type="submit" disabled={!commitMessage}>
        Fetch
      </Button>
    </form>
  );
};
