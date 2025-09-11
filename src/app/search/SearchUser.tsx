import React from 'react';

import PaginationButtons from 'app/search/PaginationButtons';

import { useAppDispatch, useAppSelector } from 'store/store';
import { fetchSearchUser } from 'store/slices/searchUserSlice';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Input } from 'components/Input';
import { Users } from 'components/Users';

interface Props {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
}

const SearchUser = (props: Props) => {
  const { searchKeyword, setSearchKeyword } = props;

  const { data } = useAppSelector((state) => state.search);
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const isUsersLoading = loading['search/FetchUsers'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    dispatch(fetchSearchUser({ q: searchKeyword }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search a keyword"
        />
        <Button disabled={!searchKeyword}>Search</Button>
      </form>
      {isUsersLoading ? (
        <Spinner />
      ) : (
        <>
          <Users users={data?.items} count={data?.total_count} />
          {data?.items && <PaginationButtons searchKeyword={searchKeyword} />}
        </>
      )}
    </>
  );
};

export default SearchUser;
