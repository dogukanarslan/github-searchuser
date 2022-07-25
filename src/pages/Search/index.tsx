import { useState } from 'react'
import { Filters } from './Filters'
import { Users } from '../../components/Users'
import { useSelector } from 'react-redux'
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap'
import { RootState } from '../../app/store'

export const Search = () => {
    const { data, status } = useSelector((state: RootState) => state.search)

    const [activeTab, setActiveTab] = useState('users')

    const toggle = (tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

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
                <TabPane tabId="repositories">Tab2</TabPane>
                <TabPane tabId="commits">Tab3</TabPane>
            </TabContent>
        </>
    )
}
