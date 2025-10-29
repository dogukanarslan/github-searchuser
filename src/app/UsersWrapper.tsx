'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Endpoints } from '@octokit/types';

import { useAppDispatch, useAppSelector } from 'store/store';
import {
  fetchUsers,
  searchUsers,
  setLink,
  setSearchResults,
  setTotalCount,
  setUsers,
} from 'store/slices/usersSlice';

import SearchResults from 'app/SearchResults';

import { Users } from 'components/Users';
import PaginationButtons from 'components/PaginationButtons';

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

  const {
    searchResults,
    data,
    status,
    link: usersLink,
  } = useAppSelector((state) => state.users);
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

  const loadMore = () => {
    if (usersLink) {
      if (username) {
        const urlParams = new URL(usersLink?.next).searchParams;
        const page = urlParams.get('page');

        if (page) {
          dispatch(searchUsers({ username, page: parseInt(page) }));
        }
      } else {
        const urlParams = new URL(usersLink.next).searchParams;
        const since = urlParams.get('since');

        if (since) {
          dispatch(
            fetchUsers({
              ...(since && { startingId: parseInt(since) }),
            })
          );
        }
      }
    }
  };

  return (
    <div>
      {username ? (
        <SearchResults users={searchResults} totalCount={totalCount} />
      ) : (
        <Users users={data} />
      )}
      <PaginationButtons
        loadMore={loadMore}
        isLoading={status === 'loading'}
        hasMore={!usersLink?.next}
      />
    </div>
  );
};

export default UsersWrapper;
