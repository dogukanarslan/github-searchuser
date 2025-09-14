import { useAppDispatch, useAppSelector } from 'store/store';

import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Input } from 'components/Input';
import { Repositories } from 'components/Repositories';
import { fetchSearchRepository } from 'store/slices/searchRepositorySlice';
import PaginationButtons from 'app/search/PaginationButtons';

interface Props {
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
}

const SearchRepository = (props: Props) => {
  const { searchKeyword, setSearchKeyword } = props;

  const { data, link, currentPage } = useAppSelector(
    (state) => state.searchRepository
  );
  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const isRepositoriesLoading = loading['search/fetchSearchRepository'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    dispatch(fetchSearchRepository({ q: searchKeyword }));
  };

  const getData = (searchKeyword: string, page?: number) => {
    dispatch(
      fetchSearchRepository({
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
      {isRepositoriesLoading ? (
        <Spinner />
      ) : (
        <>
          <Repositories repositories={data?.items} count={data?.total_count} />
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

export default SearchRepository;
