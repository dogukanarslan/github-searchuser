'use client';

import { Endpoints } from '@octokit/types';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { setAuthenticatedUser } from 'store/slices/singleUserSlice';
import { makeStore, AppStore } from 'store/store';

export default function StoreProvider({
  authenticatedUser,
  children,
}: {
  authenticatedUser: Endpoints['GET /user']['response']['data'];
  children: React.ReactNode;
}) {
  console.log(authenticatedUser)
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setAuthenticatedUser(authenticatedUser));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
