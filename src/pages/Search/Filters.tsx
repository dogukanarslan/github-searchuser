import { useState, FormEvent } from 'react';
import { Input } from 'components';
import { Button } from 'components/Button';
import { useAppDispatch } from '../../app/store';
import { fetchSearch } from '../../features/search/searchSlice';

export const Filters = () => {
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSearch({ type: 'users', q: username }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <Button className="mt-1" type="submit" disabled={!username}>
        Fetch
      </Button>
    </form>
  );
};
