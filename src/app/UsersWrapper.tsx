'use client';

import { Users } from 'components';
import { useAppSelector } from 'store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTotalCount, setUsers } from 'store/slices/usersSlice';
import { Endpoints } from '@octokit/types';
import { useSearchParams } from 'next/navigation';
import SearchResults from './SearchResults';

interface Props {
  totalCount?: number;
  users: Endpoints['GET /users']['response']['data'];
  link: Endpoints['GET /users']['response']['headers']['link'];
}

const UsersWrapper = (props: Props) => {
  const { users, link, totalCount } = props;

  const searchParams = useSearchParams();
  const username = searchParams.get('q');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers({ users, link }));
    if (totalCount) {
      dispatch(setTotalCount(totalCount));
    }
  }, [users, link, totalCount, dispatch]);

  const { data } = useAppSelector((state) => state.users);

  return (
    <div>
      {username ? (
        <SearchResults users={data} totalCount={totalCount} />
      ) : (
        <Users users={data} />
      )}
    </div>
  );
};

export default UsersWrapper;
