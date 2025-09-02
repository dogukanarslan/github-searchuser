import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Repositories } from 'app/users/Repositories';

import { Followers } from 'components/Followers';
import { Following } from 'components/Following';
import { Starred } from 'components/Starred';
import { UserDetailTabs } from 'components/UserDetailTabs';

export const UserDetail = () => {
  const searchParams = useSearchParams();

  const [selectedTab, setSelectedTab] = useState(
    searchParams.get('tab') || 'followers'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== selectedTab) {
      setSelectedTab(tab);
    }
  }, [searchParams, selectedTab]);

  return (
    <>
      <UserDetailTabs
        selectedTab={selectedTab}
        setSelectedTab={(tab) => setSelectedTab(tab)}
      />

      {selectedTab === 'followers' && <Followers status={status} />}
      {selectedTab === 'following' && <Following status={status} />}
      {selectedTab === 'starred' && <Starred status={status} />}
      {selectedTab === 'repos' && <Repositories status={status} />}
    </>
  );
};
