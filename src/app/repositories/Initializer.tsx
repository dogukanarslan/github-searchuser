'use client';

import { useEffect } from 'react';

import { useAppDispatch } from 'store/store';
import {
  setLink,
  setSearchResults,
  setTotalCount,
} from 'store/slices/repositoriesSlice';
import { Endpoints } from '@octokit/types';
import { setRepositories } from 'store/slices/repositoriesSlice';

interface Props {
  totalCount?: number;
  repositories?: Endpoints['GET /repositories']['response']['data'];
  searchResults?: Endpoints['GET /search/repositories']['response']['data']['items'];
  link?: string;
}

export const Initializer = (props: Props) => {
  const {
    repositories,
    searchResults: searchResultsData,
    link,
    totalCount,
  } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (repositories) {
      dispatch(setRepositories({ repositories, link }));
    } else if (searchResultsData) {
      dispatch(setSearchResults(searchResultsData));
    }

    if (link) {
      dispatch(setLink(link));
    }

    if (totalCount) {
      dispatch(setTotalCount(totalCount));
    }
  }, [repositories, link, totalCount, searchResultsData, dispatch]);

  return null;
};
