'use client';

import { Users } from 'components';
import { useAppSelector } from 'store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from 'store/slices/usersSlice';
import { Endpoints } from '@octokit/types';

interface Props {
  users: Endpoints['GET /users']['response']['data'];
  link: Endpoints['GET /users']['response']['headers']['link'];
}

const UsersWrapper = (props: Props) => {
  const { users, link } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers({ users, link }));
  }, [users, link, dispatch]);

  const { data } = useAppSelector((state) => state.users);

  return (
    <div>
      <Users users={data} />
    </div>
  );
};

export default UsersWrapper;
