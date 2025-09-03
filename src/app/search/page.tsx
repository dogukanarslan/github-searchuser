'use client';

import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { Users } from '../../components/Users';
import { Repositories } from '../../components/Repositories';
import { Commits } from '../../components/Commits';
import { Filters } from './Filters';
import { Spinner } from 'components/Spinner';

import { Nav, Tab } from './Nav';

const Search = () => {
  const { data, link } = useAppSelector((state) => state.search);
  const { data: repositoriesData, status: repositoriesStatus } = useAppSelector(
    (state) => state.searchRepository
  );
  const { data: commitsData, status: commitsStatus } = useAppSelector(
    (state) => state.commitRepository
  );
  const { loading } = useAppSelector((state) => state.loading);

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Users);

  const isLoading =
    loading['search/fetchSearch'] ||
    loading['search/fetchSearchRepository'] ||
    loading['search/fetchSearchCommit'];

  return (
    <div className="space-y-2">
      <Nav activeTab={activeTab} changeTab={(tab) => setActiveTab(tab)} />
      <Filters activeTab={activeTab} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {activeTab === Tab.Users ? (
            <Users users={data?.items || []} link={link} />
          ) : activeTab === Tab.Repositories ? (
            <Repositories
              repositories={repositoriesData?.items}
              count={repositoriesData?.total_count}
              status={repositoriesStatus}
            />
          ) : (
            <Commits
              commits={commitsData?.items}
              count={commitsData?.total_count}
              status={commitsStatus}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Search;
