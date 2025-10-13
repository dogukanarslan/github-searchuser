'use client';

import { FormEvent, useState } from 'react';

import { Button, Input } from 'components';
import { redirect, useSearchParams } from 'next/navigation';
import { Search } from 'react-feather';

export const Filters = () => {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      redirect(`/?q=${username}`);
    } else {
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
        <Button type="submit" className="bg-transparent text-black">
          <Search />
        </Button>
      </div>
    </form>
  );
};
