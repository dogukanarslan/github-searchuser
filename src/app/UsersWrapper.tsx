'use client';

import { Users } from 'components';
import { useAppSelector } from 'store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLink,
  setSearchResults,
  setTotalCount,
  setUsers,
} from 'store/slices/usersSlice';
import { Endpoints } from '@octokit/types';
import { useSearchParams } from 'next/navigation';
import SearchResults from './SearchResults';

interface Props {
  totalCount?: number;
  users?: Endpoints['GET /users']['response']['data'];
  searchResults?: Endpoints['GET /search/users']['response']['data']['items'];
  link: Endpoints['GET /users']['response']['headers']['link'];
  searchResultsLink: Endpoints['GET /search/users']['response']['headers']['link'];
}

const UsersWrapper = (props: Props) => {
  const {
    users,
    searchResults: searchResultsData,
    searchResultsLink,
    link,
    totalCount,
  } = props;

  const searchParams = useSearchParams();
  const username = searchParams.get('q');

  const { searchResults } = useAppSelector((state) => state.users);
  const dispatch = useDispatch();

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

  const { data } = useAppSelector((state) => state.users);

  return (
    <div>
      {username ? (
        <SearchResults users={searchResults} totalCount={totalCount} />
      ) : (
        <Users users={data} />
      )}
    </div>
  );
};

export default UsersWrapper;
