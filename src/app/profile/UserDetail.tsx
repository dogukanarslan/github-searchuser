'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Repositories } from 'app/users/Repositories';

import { Followers } from 'components/Followers';
import { Following } from 'components/Following';
import { Starred } from 'components/Starred';
import { UserDetailTabs } from 'components/UserDetailTabs';
import { Endpoints } from '@octokit/types';
import { useAppDispatch } from 'store/store';
import { setFollowers, setUser } from 'store/slices/singleUserSlice';

interface Props {
  user: Endpoints['GET /user']['response']['data'];
  followers: Endpoints['GET /user/followers']['response']['data'];
}

export const UserDetail = (props: Props) => {
  const { user, followers } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setFollowers(followers));
  }, [user, followers, dispatch]);

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

      {selectedTab === 'followers' && <Followers />}
      {selectedTab === 'following' && <Following />}
      {selectedTab === 'starred' && <Starred />}
      {selectedTab === 'repos' && <Repositories />}
    </>
  );
};
