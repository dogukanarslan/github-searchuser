import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { fetchUsers, resetUsers } from '../../features/users/usersSlice';

import { Button, FormLabel, Input, Select } from 'components';

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
        <FormLabel htmlFor="startingId">Starting ID</FormLabel>
        <Input
          id="startingId"
          type="number"
          value={startingId}
          onChange={(e) => setStartingId(e.target.value)}
          placeholder="Starting ID"
        />
      </div>

      <div>
        <FormLabel
          htmlFor="resultsPerPage"
          className="block text-xs font-medium text-gray-700"
        >
          Results Per Page
        </FormLabel>
        <Select
          id="resultsPerPage"
          value={resultsPerPage}
          onChange={(e) => setResultsPerPage(e.target.value)}
        >
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>45
        </Select>
      </div>

      <Button className="mt-1" type="submit">
        Fetch
      </Button>
    </form>
  );
};
