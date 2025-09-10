'use client';

import { useState } from 'react';

import { Nav, Tab } from 'app/search/Nav';
import SearchUser from 'app/search/SearchUser';
import SearchRepository from 'app/search/SearchRepository';
import SearchCommit from 'app/search/SearchCommit';

const Search = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Users);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-2">
      <Nav activeTab={activeTab} changeTab={handleTabChange} />
      {activeTab === Tab.Users ? (
        <SearchUser />
      ) : activeTab === Tab.Repositories ? (
        <SearchRepository />
      ) : (
        <SearchCommit />
      )}
    </div>
  );
};

export default Search;
