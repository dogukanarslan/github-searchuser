'use client';

import { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { Users } from '../../components/Users';
import { Repositories } from '../../components/Repositories';
import { Commits } from '../../components/Commits';
import { Filters } from './Filters';
import { Spinner } from 'components/Spinner';

import { Nav, Tab } from 'app/search/Nav';
import PaginationButtons from 'app/search/PaginationButtons';

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data } = useAppSelector((state) => state.search);
  const { data: repositoriesData, status: repositoriesStatus } = useAppSelector(
    (state) => state.searchRepository
  );
  const { data: commitsData, status: commitsStatus } = useAppSelector(
    (state) => state.commitRepository
  );
  const { loading } = useAppSelector((state) => state.loading);

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Users);

  const isUsersLoading = loading['search/fetchSearch'];
  const isRepositoriesLoading = loading['search/fetchSearchRepository'];
  const isCommitsLoading = loading['search/fetchSearchCommit'];

  const handleTabChange = (tab: Tab) => {
    setSearchKeyword('');
    setActiveTab(tab);
  };

  return (
    <div className="space-y-2">
      <Nav activeTab={activeTab} changeTab={handleTabChange} />
      <Filters
        activeTab={activeTab}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {activeTab === Tab.Users ? (
        <>
          {isUsersLoading ? (
            <Spinner />
          ) : (
            <>
              <Users users={data?.items || []} />
              {data?.items && (
                <PaginationButtons searchKeyword={searchKeyword} />
              )}
            </>
          )}
        </>
      ) : activeTab === Tab.Repositories ? (
        <>
          {isRepositoriesLoading ? (
            <Spinner />
          ) : (
            <Repositories
              repositories={repositoriesData?.items}
              count={repositoriesData?.total_count}
              status={repositoriesStatus}
            />
          )}
        </>
      ) : (
        <>
          {isCommitsLoading ? (
            <Spinner />
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
