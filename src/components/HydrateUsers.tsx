'use client';

import { Endpoints } from '@octokit/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from 'store/slices/usersSlice';

interface Props {
  users: Endpoints['GET /users']['response']['data'];
  link: Endpoints['GET /users']['response']['headers']['link'];
}

export function HydrateUsers(props: Props) {
  const { users, link } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers({ users, link }));
  }, [users, link, dispatch]);

  return null;
}
