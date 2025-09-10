import { FormEvent } from 'react';
import { Button, Input } from 'components';
import { useAppDispatch } from '../../store/store';
import { fetchSearchUser } from '../../store/slices/searchUserSlice';
import { Tab } from './Nav';
import { fetchSearchRepository } from 'store/slices/searchRepositorySlice';
import { fetchSearchCommit } from 'store/slices/searchCommitSlice';

interface Props {
  activeTab: Tab;
  searchKeyword: string;
  setSearchKeyword: (val: string) => void;
}

export const Filters = (props: Props) => {
  const { activeTab, searchKeyword, setSearchKeyword } = props;

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchKeyword) {
      return;
    }

    if (activeTab === Tab.Users) {
      dispatch(fetchSearchUser({ q: searchKeyword }));
    } else if (activeTab === Tab.Repositories) {
      dispatch(fetchSearchRepository({ q: searchKeyword }));
    } else {
      dispatch(fetchSearchCommit({ q: searchKeyword }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search a keyword"
      />
      <Button disabled={!searchKeyword}>Search</Button>
    </form>
  );
};
