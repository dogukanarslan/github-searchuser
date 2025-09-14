import React from 'react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { fetchSearchCommit } from 'store/slices/searchCommitSlice';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Input } from 'components/Input';
import { Commits } from 'components/Commits';
import PaginationButtons from 'app/search/PaginationButtons';

interface Props {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
}

const SearchCommit = (props: Props) => {
  const { searchKeyword, setSearchKeyword } = props;

  const { data, link } = useAppSelector((state) => state.commitRepository);
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const isCommitsLoading = loading['search/fetchSearchCommit'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    dispatch(fetchSearchCommit({ q: searchKeyword }));
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
      {isCommitsLoading ? (
        <Spinner />
      ) : (
        <>
          <Commits commits={data?.items || null} count={data?.total_count} />
          {data?.items && (
            <PaginationButtons
              searchKeyword={searchKeyword}
              link={link}
              getData={(searchKeyword, page) => {
                dispatch(fetchSearchCommit({ q: searchKeyword, page }));
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default SearchCommit;
