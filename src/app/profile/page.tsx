'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import { RootState, useAppDispatch } from 'store/store';
import { fetchAuthenticatedUser } from 'store/slices/singleUserSlice';

import { Repositories } from 'app/users/Repositories';

import { Followers } from 'components/Followers';
import { Following } from 'components/Following';
import { Starred } from 'components/Starred';
import { Spinner } from 'components';
import { UserDetailTabs } from 'components/UserDetailTabs';
import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';

const Details = () => {
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
    dispatch(fetchAuthenticatedUser());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <h1 className="text-center text-2xl font-bold">USER NOT FOUND</h1>;
  }

  const {
    avatar_url,
    login,
    name,
    company,
    blog,
    location,
    email,
    public_repos,
    followers,
    following,
    isFollowedByAuthenticatedUser,
  } = user;

  return (
    <>
      <UserDetailHeader
        login={login}
        avatar_url={avatar_url}
        public_repos={public_repos}
        followers={followers}
        following={following}
        isFollowedByAuthenticatedUser={isFollowedByAuthenticatedUser}
      />
      <UserDetailInformation
        login={login}
        name={name}
        company={company}
        location={location}
        email={email}
        blog={blog}
      />
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
