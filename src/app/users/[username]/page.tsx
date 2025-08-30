'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { Followers } from 'components/Followers';
import { Following } from 'components/Following';
import { Starred } from 'components/Starred';
import { Spinner } from 'components';
import { UserDetailTabs } from 'components/UserDetailTabs';
import { RootState, useAppDispatch } from 'store/store';
import {
  fetchSingleUser,
  getIsFollowedByAuthenticatedUser,
} from 'store/slices/singleUserSlice';
import { useSelector } from 'react-redux';

import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';
import { Repositories } from 'app/users/Repositories';

const Details = () => {
  const { username } = useParams();

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

  const dispatch = useAppDispatch();

  const { user, status } = useSelector((state: RootState) => state.singleUser);

  useEffect(() => {
    if (username) {
      dispatch(fetchSingleUser({ login: username.toString() }));
    }
  }, [username, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getIsFollowedByAuthenticatedUser(user.login));
    }
  }, [user, dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <UserDetailHeader />
      <UserDetailInformation />
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

export default Details;
