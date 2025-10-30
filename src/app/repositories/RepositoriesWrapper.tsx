'use client';

import { useEffect } from 'react';
import { Endpoints } from '@octokit/types';
import { useSearchParams } from 'next/navigation';

import { useAppDispatch, useAppSelector } from 'store/store';
import {
  fetchRepositories,
  searchRepositories,
  setLink,
  setSearchResults,
  setTotalCount,
  setRepositories,
} from 'store/slices/repositoriesSlice';

import SearchResults from 'app/repositories/SearchResults';

import { Repositories } from 'components/Repositories';
import PaginationButtons from 'components/PaginationButtons';

interface Props {
  totalCount?: number;
  repositories?: Endpoints['GET /repositories']['response']['data'];
  searchResults?: Endpoints['GET /search/repositories']['response']['data']['items'];
  link?: string;
}

const RepositoriesWrapper = (props: Props) => {
  const {
    repositories,
    searchResults: searchResultsData,
    link,
    totalCount,
  } = props;

  const searchParams = useSearchParams();
  const repositoryName = searchParams.get('q');

  const {
    searchResults,
    data,
    status,
    link: repositoriesLink,
  } = useAppSelector((state) => state.repositories);
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

  const loadMore = () => {
    if (repositoriesLink) {
      const repositoryName = searchParams.get('q');
      if (repositoryName) {
        const urlParams = new URL(repositoriesLink.next).searchParams;
        const page = urlParams.get('page');
        if (page) {
          dispatch(
            searchRepositories({ repositoryName, page: parseInt(page) })
          );
        }
      } else {
        const urlParams = new URL(repositoriesLink.next).searchParams;
        const since = urlParams.get('since');

        if (since) {
          dispatch(fetchRepositories(since));
        }
      }
    }
  };

  return (
    <div>
      {repositoryName ? (
        <SearchResults repositories={searchResults} totalCount={totalCount} />
      ) : (
        <Repositories repositories={data} />
      )}
      <PaginationButtons loadMore={loadMore} isLoading={status === 'loading'} />
    </div>
  );
};

export default RepositoriesWrapper;
