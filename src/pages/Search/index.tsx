import { useState } from 'react';
import { useAppSelector } from '../../app/store';
import { Users } from '../../components/Users';
import { Repositories } from '../../components/Repositories';
import { Commits } from '../../components/Commits';
import { Filters } from './Filters';
import { RepositoryFilters } from './RepositoryFilters';
import { CommitFilters } from './CommitFilters';
import { Spinner } from 'components';

import { Nav, Tab } from './Nav';

export const Search = () => {
  const { data } = useAppSelector((state) => state.search);
  const { data: repositoriesData, status: repositoriesStatus } = useAppSelector(
    (state) => state.searchRepository
  );
  const { data: commitsData, status: commitsStatus } = useAppSelector(
    (state) => state.commitRepository
  );
  const { loading } = useAppSelector((state) => state.loading);

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Users);

  const toggle = (tab: Tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="space-y-2">
      <Nav activeTab={activeTab} changeTab={toggle} />
      {activeTab === 'users' ? (
        <div className="space-y-2">
          <Filters />
          {loading['search/fetchSearch'] ? (
            <Spinner />
          ) : (
            <Users users={data?.items} count={data?.total_count} />
          )}
        </div>
      ) : activeTab === 'repositories' ? (
        <>
          <RepositoryFilters />
          {loading['search/fetchSearchRepository'] ? (
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
          <CommitFilters />
          {loading['search/fetchSearchCommit'] ? (
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
