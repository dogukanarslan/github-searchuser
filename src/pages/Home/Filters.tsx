import { FormEvent, useState } from 'react';
import { Button } from 'components/Button';
import { useAppDispatch } from '../../app/store';
import { fetchUsers, resetUsers } from '../../features/users/usersSlice';

export const Filters = () => {
  const [startingId, setStartingId] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetUsers());
    dispatch(fetchUsers({ startingId, resultsPerPage }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="startingId"
          className="block text-xs font-medium text-gray-700"
        >
          Starting ID
        </label>
        <input
          id="startingId"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm text-sm"
          type="number"
          value={startingId}
          onChange={(e) => setStartingId(e.target.value)}
          placeholder="Starting ID"
        />
      </div>

      <label
        htmlFor="resultsPerPage"
        className="block text-xs font-medium text-gray-700"
      >
        Results Per Page
      </label>
      <select
        id="resultsPerPage"
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm text-sm"
        value={resultsPerPage}
        onChange={(e) => setResultsPerPage(e.target.value)}
      >
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>45
      </select>

      <Button className="mt-1" type="submit">
        Fetch
      </Button>
    </form>
  );
};
