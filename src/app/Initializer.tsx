'use client';

import { useEffect } from 'react';

import { useAppDispatch } from 'store/store';
import {
  setLink,
  setSearchResults,
  setTotalCount,
  setUsers,
} from 'store/slices/usersSlice';
import { Endpoints } from '@octokit/types';

interface Props {
  totalCount?: number;
  users?: Endpoints['GET /users']['response']['data'];
  searchResults?: Endpoints['GET /search/users']['response']['data']['items'];
  link: Endpoints['GET /users']['response']['headers']['link'];
  searchResultsLink: Endpoints['GET /search/users']['response']['headers']['link'];
}

export const Initializer = (props: Props) => {
  const {
    users,
    searchResults: searchResultsData,
    searchResultsLink,
    link,
    totalCount,
  } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users) {
      dispatch(setUsers({ users, link }));
      if (link) {
        dispatch(setLink(link));
      }
    } else if (searchResultsData) {
      dispatch(
        setSearchResults({
          data: searchResultsData,
        })
      );
      if (searchResultsLink) {
        dispatch(setLink(searchResultsLink));
      }
    }
    if (totalCount) {
      dispatch(setTotalCount(totalCount));
    }
  }, [users, link, totalCount, searchResultsData, searchResultsLink, dispatch]);

  return null;
};
