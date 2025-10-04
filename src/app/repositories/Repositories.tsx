'use client';

import { Endpoints } from '@octokit/types';
import { Repository } from 'components/Repository';
import React, { useEffect } from 'react';
import { setRepositories } from 'store/slices/repositoriesSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

interface Props {
  repositories: Endpoints['GET /repositories']['response']['data'];
  repositoryLink: Endpoints['GET /repositories']['response']['headers']['link'];
}

const Repositories = (props: Props) => {
  const { repositories, repositoryLink } = props;

  const { data } = useAppSelector((state) => state.repositories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(repositoryLink);
    dispatch(setRepositories({ repositories, link: repositoryLink }));
  }, [repositories, repositoryLink, dispatch]);

  return (
    <div className="space-y-2">
      {data.map((repository) => (
        <Repository
          key={repository.id}
          name={repository.name}
          owner={repository.owner.login}
          description={repository.description || ''}
          full_name={repository.full_name}
          stargazers_count={repository.stargazers_count || 0}
          watchers_count={repository.watchers_count || 0}
        />
      ))}
    </div>
  );
};

export default Repositories;
