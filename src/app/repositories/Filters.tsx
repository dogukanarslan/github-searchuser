'use client';

import { FormEvent, useState } from 'react';

import { Button, Input } from 'components';
import { redirect, useSearchParams } from 'next/navigation';
import { Search } from 'react-feather';

export const Filters = () => {
  const searchParams = useSearchParams();
  const [repositoryName, setRepositoryName] = useState(
    searchParams.get('q') || ''
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (repositoryName) {
      redirect(`/repositories?q=${repositoryName}`);
    } else {
      redirect('/repositories');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-2">
      <div className="flex items-center gap-2 sm:flex-row">
        <div className="w-full">
          <Input
            value={repositoryName}
            onChange={(e) => setRepositoryName(e.target.value)}
            placeholder="Search repository"
          />
        </div>
        <Button type="submit">
          <Search />
        </Button>
      </div>
    </form>
  );
};
