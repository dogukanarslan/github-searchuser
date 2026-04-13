'use client';

import { useEffect } from 'react';
import { Star } from 'react-feather';

import { Badge } from 'components/Badge';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  setIsStarred,
  setRepositoryDetail,
  setRepositoryLanguages,
  starRepo,
  unstarRepo,
} from 'store/slices/repositoryDetailSlice';
import { Endpoints } from '@octokit/types';

interface Props {
  canManageStar: boolean;
  isStarred: boolean;
  repository: Endpoints['GET /repos/{owner}/{repo}']['response']['data'];
  languages: Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data'];
}

const StarButton = (props: Props) => {
  const { repository, languages, isStarred: isStarredData, canManageStar } =
    props;

  const { data, isStarred } = useAppSelector((state) => state.repositoryDetail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRepositoryDetail(repository));
    dispatch(setRepositoryLanguages(languages));
    dispatch(setIsStarred(isStarredData));
  }, [repository, languages, isStarredData, dispatch]);

  const toggleStar = () => {
    if (!data || !canManageStar) {
      return;
    }

    if (isStarred) {
      dispatch(unstarRepo({ owner: data.owner.login, repo: data.name }));
    } else {
      dispatch(starRepo({ owner: data.owner.login, repo: data.name }));
    }
  };

  if (!data) {
    return;
  }

  return (
    <div
      className={`flex items-center gap-2 ${
        canManageStar ? 'hover:cursor-pointer' : ''
      }`}
      onClick={toggleStar}
    >
      <Star
        className={isStarred ? 'text-yellow-500' : 'text-gray-500'}
        fill="currentColor"
      />
      {isStarred ? 'Starred' : 'Star'}
      <Badge>{data.stargazers_count}</Badge>
    </div>
  );
};

export default StarButton;
