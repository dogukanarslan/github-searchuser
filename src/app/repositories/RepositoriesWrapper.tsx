'use client';

import { useAppSelector } from 'store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setLink,
  setSearchResults,
  setTotalCount,
} from 'store/slices/repositoriesSlice';
import { Endpoints } from '@octokit/types';
import { useSearchParams } from 'next/navigation';
import SearchResults from './SearchResults';
import { Repositories } from 'components/Repositories';
import { setRepositories } from 'store/slices/repositoriesSlice';

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

  const { searchResults, data } = useAppSelector((state) => state.repositories);
  const dispatch = useDispatch();

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

  return (
    <div>
      {repositoryName ? (
        <SearchResults repositories={searchResults} totalCount={totalCount} />
      ) : (
        <Repositories repositories={data} />
      )}
    </div>
  );
};

export default RepositoriesWrapper;
