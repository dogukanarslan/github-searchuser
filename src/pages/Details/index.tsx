import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps, useLocation } from 'react-router-dom';
import { Followers } from 'components/Followers';
import { RootState, useAppDispatch } from 'app/store';
import {
  fetchFollowers,
  fetchSingleUser,
} from 'features/singleUser/singleUserSlice';
import { useSelector } from 'react-redux';

export const Details = (props: RouteComponentProps<{ login: string }>) => {
  const { match } = props;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [selectedTab, setSelectedTab] = useState(
    searchParams.get('tab') || 'information'
  );

  const dispatch = useAppDispatch();

  const {
    user,
    followers: followersList,
    status,
  } = useSelector((state: RootState) => state.singleUser);

  useEffect(() => {
    dispatch(fetchSingleUser({ login: match.params.login }));
    dispatch(fetchFollowers(match.params.login));
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
        <img width={200} src={avatar_url} alt="" />

        <nav className="flex gap-6" aria-label="Tabs">
          <Link
            to="#"
            className={`${
              selectedTab === 'information' ? 'bg-gray-100 ' : ''
            }shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
            onClick={() => setSelectedTab('information')}
          >
            Information
          </Link>

          <Link
            to="#"
            className={`${
              selectedTab === 'followers' ? 'bg-gray-100 ' : ''
            }shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700`}
            onClick={() => setSelectedTab('followers')}
          >
            Followers
          </Link>
        </nav>
      </div>

      <div>
        {selectedTab === 'information' && (
          <>
            <p>
              <strong>Username</strong>
              <br />
              {login}
            </p>
            <p>
              <strong>Name</strong>
              <br /> {name}
            </p>
            {company && (
              <p>
                <strong>Company</strong>
                <br /> {company}
              </p>
            )}
            {blog && (
              <p>
                <strong>Blog</strong>
                <br /> {blog}
              </p>
            )}
            {location && (
              <p>
                <strong>Location</strong>
                <br /> {location}
              </p>
            )}
            {email && (
              <p>
                <strong>Email</strong>
                <br /> {email}
              </p>
            )}
            {bio && (
              <p>
                <strong>Bio</strong>
                <br /> {bio}
              </p>
            )}
            <p>
              <strong>Public Repositories</strong>
              <br />
              {public_repos}
            </p>
            <p>
              <strong>Followers</strong>
              <br /> {followers}
            </p>
            <p>
              <strong>Following</strong>
              <br /> {following}
            </p>
          </>
        )}
        {selectedTab === 'followers' && <Followers followers={followersList} />}
      </div>
    </>
  );
};
