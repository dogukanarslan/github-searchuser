import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import { RootState } from '../../app/store';
import { Users } from '../../components/Users';
import { Repositories } from '../../components/Repositories';
import { Commits } from '../../components/Commits';
import { Filters } from './Filters';
import { RepositoryFilters } from './RepositoryFilters';
import { CommitFilters } from './CommitFilters';

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
      <Nav tabs>
        <NavItem>
          <NavLink
            onClick={() => toggle('users')}
            active={activeTab === 'users'}
          >
            Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => toggle('repositories')}
            active={activeTab === 'repositories'}
          >
            Repositories
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => toggle('commits')}
            active={activeTab === 'commits'}
          >
            Commits
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="users">
          <Filters />
          <Users
            users={data?.items}
            count={data?.total_count}
            status={status}
          />
        </TabPane>
        <TabPane tabId="repositories">
          <RepositoryFilters />
          <Repositories
            repositories={repositoriesData?.items}
            count={repositoriesData?.total_count}
            status={repositoriesStatus}
          />
        </TabPane>
        <TabPane tabId="commits">
          <CommitFilters />
          <Commits
            commits={commitsData?.items}
            count={commitsData?.total_count}
            status={commitsStatus}
          />
        </TabPane>
      </TabContent>
    </>
  );
};
