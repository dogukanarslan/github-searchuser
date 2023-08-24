import React, { useEffect, useState } from 'react';
import { Row, Col, Nav, NavItem, NavLink, Spinner } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { Followers } from 'components/Followers';
import { Button } from 'components/Button';
import { RootState, useAppDispatch } from 'app/store';
import {
  fetchFollowers,
  fetchSingleUser,
} from 'features/singleUser/singleUserSlice';
import { useSelector } from 'react-redux';

export const Details = (props: RouteComponentProps<{ login: string }>) => {
  const { match } = props;

  const [selectedTab, setSelectedTab] = useState('information');

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
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Button className="mb-2" onClick={props.history.goBack}>
        <ArrowLeft />
      </Button>
      <Row>
        <Col className="text-center mb-5" md="12">
          <img
            className="img-fluid rounded-circle shadow-sm"
            width={200}
            src={avatar_url}
            alt=""
          />
        </Col>
        <Col className="text-center" md="12">
          <Nav className="justify-content-center mb-2" pills>
            <NavItem>
              <NavLink
                href="#"
                active={selectedTab === 'information'}
                onClick={() => setSelectedTab('information')}
              >
                Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                active={selectedTab === 'followers'}
                onClick={() => setSelectedTab('followers')}
              >
                Followers
              </NavLink>
            </NavItem>
          </Nav>
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
          {selectedTab === 'followers' && (
            <Followers followers={followersList} />
          )}
        </Col>
      </Row>
    </>
  );
};
