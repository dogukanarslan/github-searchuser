import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Users } from '../../components/Users';
import { Repositories } from '../../components/Repositories';
import { Commits } from '../../components/Commits';
import { Filters } from './Filters';
import { RepositoryFilters } from './RepositoryFilters';
import { CommitFilters } from './CommitFilters';
import { Link } from 'react-router-dom';

export const Search = () => {
  const { data, status } = useSelector((state: RootState) => state.search);
  const { data: repositoriesData, status: repositoriesStatus } = useSelector(
    (state: RootState) => state.searchRepository
  );
  const { data: commitsData, status: commitsStatus } = useSelector(
    (state: RootState) => state.commitRepository
  );

  const [activeTab, setActiveTab] = useState('users');

  const toggle = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <nav className="flex gap-6" aria-label="Tabs">
        <Link
          to="#"
          className={`${
            activeTab === 'users' ? 'bg-gray-100 ' : ''
          }shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
          onClick={() => toggle('users')}
        >
          Users
        </Link>

        <Link
          to="#"
          className={`${
            activeTab === 'repositories' ? 'bg-gray-100 ' : ''
          }shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700`}
          onClick={() => toggle('repositories')}
        >
          Repositories
        </Link>
        <Link
          to="#"
          className={`${
            activeTab === 'commits' ? 'bg-gray-100 ' : ''
          }shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700`}
          onClick={() => toggle('commits')}
        >
          Commits
        </Link>
      </nav>

      <br />

      {activeTab === 'users' ? (
        <>
          <Filters />
          <Users
            users={data?.items}
            count={data?.total_count}
            status={status}
          />
        </>
      ) : activeTab === 'repositories' ? (
        <>
          <RepositoryFilters />
          <Repositories
            repositories={repositoriesData?.items}
            count={repositoriesData?.total_count}
            status={repositoriesStatus}
          />
        </>
      ) : (
        <>
          <CommitFilters />
          <Commits
            commits={commitsData?.items}
            count={commitsData?.total_count}
            status={commitsStatus}
          />
        </>
      )}
    </>
  );
};
