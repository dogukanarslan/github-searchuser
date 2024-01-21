import { useEffect, useMemo, useState } from 'react';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { Followers } from 'components/Followers';
import { Following } from 'components/Following';
import { RootState, useAppDispatch } from 'app/store';
import {
  fetchFollowers,
  fetchFollowing,
  fetchSingleUser,
} from 'features/singleUser/singleUserSlice';
import { useSelector } from 'react-redux';

import { Briefcase, MapPin, Mail, Link as LinkIcon } from 'react-feather';

export const Details = (props: RouteComponentProps<{ login: string }>) => {
  const { match } = props;
  const { search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const [selectedTab, setSelectedTab] = useState(
    searchParams.get('tab') || 'followers'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== selectedTab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const dispatch = useAppDispatch();

  const {
    user,
    followers: followersList,
    following: followingList,
    status,
  } = useSelector((state: RootState) => state.singleUser);

  useEffect(() => {
    dispatch(fetchSingleUser({ login: match.params.login }));
    dispatch(fetchFollowers(match.params.login));
    dispatch(fetchFollowing(match.params.login));
  }, [match.params.login, dispatch]);

  const {
    avatar_url,
    login,
    name,
    company,
    blog,
    location,
    email,
    bio,
    public_repos,
    followers,
    following,
  } = user;

  if (status === 'loading') {
    return 'Loading...';
  }

  return (
    <>
      <div>
        <div className="flex items-center">
          <img className="w-48 rounded-full" src={avatar_url} alt="" />
          <div className="ml-10">
            <ul className="flex gap-x-5 text-center">
              <li>
                <div>
                  <div className="font-bold">{public_repos}</div>
                  <h3>Repositories</h3>
                </div>
              </li>
              <li>
                <div>
                  <div className="font-bold">{followers}</div>
                  <h3>Followers</h3>
                </div>
              </li>
              <li>
                <div>
                  <div className="font-bold">{following}</div>
                  <h3>Following</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-lg font-bold">{name}</h1>
          <h3>{login}</h3>
          <div className="mt-2">
            {company && (
              <div className="flex items-center gap-x-2">
                <Briefcase size="16" /> {company}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-x-2">
                <MapPin size="16" /> {location}
              </div>
            )}
            {email && (
              <div className="flex items-center gap-x-2">
                <Mail size="16" /> {email}
              </div>
            )}
            {blog && (
              <div className="flex items-center gap-x-2">
                <LinkIcon size="16" /> {blog}
              </div>
            )}
          </div>
        </div>

        <nav className="mb-2 flex gap-6 transition-all" aria-label="Tabs">
          <Link
            to="#"
            className={`${
              selectedTab === 'followers' ? 'border-b-2 ' : ''
            }text-sm border-secondary font-medium hover:border-b-2`}
            onClick={() => setSelectedTab('followers')}
          >
            Followers
          </Link>
          <Link
            to="#"
            className={`${
              selectedTab === 'following' ? 'border-b-2 ' : ''
            }text-sm border-secondary font-medium hover:border-b-2`}
            onClick={() => setSelectedTab('following')}
          >
            Following
          </Link>
        </nav>
      </div>

      {selectedTab === 'followers' && <Followers followers={followersList} />}
      {selectedTab === 'following' && <Following following={followingList} />}
    </>
  );
};
