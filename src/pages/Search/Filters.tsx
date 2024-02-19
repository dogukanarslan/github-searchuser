import { useState, useEffect } from 'react';
import { Input } from 'components';
import { useAppDispatch } from '../../app/store';
import { fetchSearch } from '../../features/search/searchSlice';
import { useDebouncedValue } from 'hooks/useDebouncedValue';

export const Filters = () => {
  const [username, setUsername] = useState('');
  const debouncedSearchValue = useDebouncedValue(username);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(fetchSearch({ type: 'users', q: debouncedSearchValue }));
    }
  }, [debouncedSearchValue, dispatch]);

  return (
    <Input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />
  );
};
