'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store/store';
import { fetchAuthenticatedUser } from 'store/slices/singleUserSlice';

import { Spinner } from 'components';

import { UserDetailInformation } from 'components/UserDetailInformation';
import { UserDetailHeader } from 'components/UserDetailHeader';
import { UserDetail } from 'app/profile/UserDetail';

const Details = () => {
  const dispatch = useAppDispatch();

  const { status } = useSelector((state: RootState) => state.singleUser);

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

  return (
    <>
      <UserDetailHeader />
      <UserDetailInformation />
      <UserDetail />
    </>
  );
};

export default Details;
