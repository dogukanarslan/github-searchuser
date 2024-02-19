import { useState, useEffect } from 'react';
import { Input } from 'components';
import { useAppDispatch } from '../../app/store';
import { fetchSearchCommit } from '../../features/search/searchCommitSlice';
import { useDebouncedValue } from 'hooks/useDebouncedValue';

export const CommitFilters = () => {
  const [commitMessage, setCommitMessage] = useState('');

  const dispatch = useAppDispatch();

  const debouncedSearchValue = useDebouncedValue(commitMessage);

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(fetchSearchCommit({ type: 'commits', q: commitMessage }));
    }
  }, [debouncedSearchValue, commitMessage, dispatch]);

  return (
    <Input
      type="text"
      value={commitMessage}
      onChange={(e) => setCommitMessage(e.target.value)}
      placeholder="Commit message"
    />
  );
};
