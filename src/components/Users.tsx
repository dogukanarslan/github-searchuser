'use client';

import { Endpoints } from '@octokit/types';
import { User } from './User';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setUsers } from 'store/slices/usersSlice';
import { useEffect } from 'react';

interface Props {
  users: Endpoints['GET /users']['response']['data'];
  link: Endpoints['GET /users']['response']['headers']['link'];
}

export const Users = (props: Props) => {
  const { users, link } = props;

  const { data } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUsers({ users, link }));
  }, [users, link, dispatch]);

  return (
    <>
      <p className="lead">{data.length} results</p>
      <div className="space-y-2">
        {data.map((user) => (
          <div key={user.id} className="w-full px-2">
            <User user={user} />
          </div>
        ))}
      </div>
    </>
  );
};
