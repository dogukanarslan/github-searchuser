import { FormEvent, useState } from 'react';
import { Button, Input } from 'components';
import { useAppDispatch } from '../../store/store';
import { fetchSearch } from '../../store/slices/searchSlice';
import { Tab } from './Nav';
import { fetchSearchRepository } from 'store/slices/searchRepositorySlice';
import { fetchSearchCommit } from 'store/slices/searchCommitSlice';

interface Props {
  activeTab: Tab;
}

export const Filters = (props: Props) => {
  const { activeTab } = props;

  const [val, setVal] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!val) {
      return;
    }

    if (activeTab === Tab.Users) {
      dispatch(fetchSearch({ q: val }));
    } else if (activeTab === Tab.Repositories) {
      dispatch(fetchSearchRepository({ q: val }));
    } else {
      dispatch(fetchSearchCommit({ q: val }));
    }
    setVal('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search a keyword"
      />
      <Button disabled={!val}>Search</Button>
    </form>
  );
};
