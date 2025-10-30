'use client';

import { FormEvent, useState } from 'react';
import { Search } from 'react-feather';
import { redirect, useSearchParams } from 'next/navigation';

import { useAppDispatch } from 'store/store';

import { Button, Input } from 'components';
import { setLink } from 'store/slices/usersSlice';

export const Filters = () => {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState(searchParams.get('q') || '');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      dispatch(setLink(null));
      redirect(`/?q=${username}`);
    } else {
      dispatch(setLink(null));
      redirect('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-2">
      <div className="flex items-center gap-2 sm:flex-row">
        <div className="w-full">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search username"
          />
        </div>
        <Button type="submit">
          <Search />
        </Button>
      </div>
    </form>
  );
};
