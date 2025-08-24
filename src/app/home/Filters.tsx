import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { fetchUsers, resetUsers } from '../../features/users/usersSlice';

import { Button, FormLabel, Input, Select } from 'components';

interface Props {
  resultsPerPage: string;
  changeResultsPerPage: (count: string) => void;
}

export const Filters = (props: Props) => {
  const { resultsPerPage, changeResultsPerPage } = props;

  const [startingId, setStartingId] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetUsers());
    dispatch(fetchUsers({ startingId, resultsPerPage }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="grow">
          <FormLabel htmlFor="startingId">Starting ID</FormLabel>
          <Input
            id="startingId"
            type="number"
            value={startingId}
            onChange={(e) => setStartingId(e.target.value)}
            placeholder="Starting ID"
          />
        </div>

        <div className="grow">
          <FormLabel
            htmlFor="resultsPerPage"
            className="block text-xs font-medium text-gray-700"
          >
            Results Per Page
          </FormLabel>
          <Select
            id="resultsPerPage"
            value={resultsPerPage}
            onChange={(e) => changeResultsPerPage(e.target.value)}
          >
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>45
          </Select>
        </div>
      </div>
      <Button color="primary" className="my-4 w-full sm:w-auto" type="submit">
        Fetch
      </Button>
    </form>
  );
};
