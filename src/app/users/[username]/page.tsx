'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { Spinner } from 'components';
import { RootState, useAppDispatch } from 'store/store';
import {
  fetchSingleUser,
  getIsFollowedByAuthenticatedUser,
} from 'store/slices/singleUserSlice';
import { useSelector } from 'react-redux';

import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';
import { UserDetail } from 'app/profile/UserDetail';

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

  if (!user) {
    return;
  }

  return (
    <>
      <UserDetailHeader />
      <UserDetailInformation user={user} />
      <UserDetail user={user} />
    </>
  );
};

export default Details;
