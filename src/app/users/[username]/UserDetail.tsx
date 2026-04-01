'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Repositories } from 'app/users/[username]/Repositories';

import { Followers } from 'app/users/[username]/Followers';
import { Following } from 'app/users/[username]/Following';
import { Starred } from 'components/Starred';
import { UserDetailTabs } from 'components/UserDetailTabs';
import { Endpoints } from '@octokit/types';
import { useAppDispatch } from 'store/store';
import {
  setFollowers,
  setFollowersLink,
  setFollowing,
  setFollowingLinks,
  setStarred,
  setStarredLinks,
  setUser,
} from 'store/slices/singleUserSlice';

interface Props {
  user: Endpoints['GET /user']['response']['data'];
  followers: Endpoints['GET /user/followers']['response']['data'];
  followersLink: Endpoints['GET /user/followers']['response']['headers']['link'];
  following: Endpoints['GET /user/following']['response']['data'];
  followingLink: Endpoints['GET /user/following']['response']['headers']['link'];
  starred: Extract<
    Endpoints['GET /users/{username}/starred']['response']['data'],
    { id: number }[]
  >;
  starredLink: Endpoints['GET /users/{username}/starred']['response']['headers']['link'];
}

export const UserDetail = (props: Props) => {
  const {
    user,
    followers,
    followersLink,
    following,
    followingLink,
    starred,
    starredLink,
  } = props;
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('tab') || 'followers';

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setFollowers(followers));
    dispatch(setFollowersLink(followersLink));
    dispatch(setFollowing(following));
    dispatch(setFollowingLinks(followingLink));
    dispatch(setStarred(starred));
    dispatch(setStarredLinks(starredLink));
  }, [
    user,
    followers,
    followersLink,
    following,
    followingLink,
    starred,
    starredLink,
    dispatch,
  ]);

  return (
    <>
      <UserDetailTabs />

      {selectedTab === 'followers' && <Followers />}
      {selectedTab === 'following' && <Following />}
      {selectedTab === 'starred' && <Starred />}
      {selectedTab === 'repos' && <Repositories />}
    </>
  );
};
