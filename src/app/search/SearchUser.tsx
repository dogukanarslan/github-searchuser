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

  const { data, link, currentPage } = useAppSelector((state) => state.search);
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const isUsersLoading = loading['search/fetchSearchUser'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    dispatch(fetchSearchUser({ q: searchKeyword }));
  };

  const getData = (searchKeyword: string, page?: number) => {
    dispatch(
      fetchSearchUser({
        q: searchKeyword,
        ...(page && { page }),
      })
    );
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
            {currentPage && (
              <PaginationButtons
                searchKeyword={searchKeyword}
                link={link}
                currentPage={currentPage}
                getData={getData}
              />
            )}
          </>
        )}
    </>
  );
};

export default SearchUser;
