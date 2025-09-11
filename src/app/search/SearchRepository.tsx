import React from 'react';

import { useAppDispatch, useAppSelector } from 'store/store';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Input } from 'components/Input';
import { Repositories } from 'components/Repositories';
import { fetchSearchRepository } from 'store/slices/searchRepositorySlice';

interface Props {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
}

const SearchRepository = (props: Props) => {
  const { searchKeyword, setSearchKeyword } = props;

  const { data } = useAppSelector((state) => state.searchRepository);
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const isRepositoriesLoading = loading['search/fetchSearchRepositories'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    dispatch(fetchSearchRepository({ q: searchKeyword }));
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
      {isRepositoriesLoading ? (
        <Spinner />
      ) : (
        <>
          <Repositories repositories={data?.items} count={data?.total_count} />
        </>
      )}
    </>
  );
};

export default SearchRepository;
