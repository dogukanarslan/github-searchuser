import React, { useEffect, useState } from 'react'
import { getUser } from '../../constants'
import { Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap'
import { RouteComponentProps } from 'react-router-dom'
import { get } from 'request'
import { IUser } from '../../models'
import { ArrowLeft } from 'react-feather'
import { Followers } from 'components/Followers'

export const Details = (props: RouteComponentProps<{ login: string }>) => {
    const [user, setUser] = useState({} as IUser)
    const [selectedTab, setSelectedTab] = useState('information')
    const [followersList, setFollowersList] = useState<IUser[]>([])

    const { match } = props

    useEffect(() => {
        getUser(match.params.login).then((data) => setUser(data))
    }, [match.params.login])

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
    } = user

    const getFollowers = async (tab: string) => {
        setSelectedTab('followers')
        if (followersList.length === 0) {
            const followers = await get(
                `/users/${match.params.login}/followers`
            )
            setFollowersList(followers)
        }
    }

    return (
        <>
            <Button
                className="mb-2"
                onClick={props.history.goBack}
                color="dark"
                outline
            >
                <ArrowLeft />
            </Button>
            <Row>
                <Col md="3">
                    <img className="img-fluid" src={avatar_url} alt="" />
                </Col>
                <Col md="9">
                    <Nav className="mb-2" pills>
                        <NavItem>
                            <NavLink
                                active={selectedTab === 'information'}
                                onClick={() => setSelectedTab('information')}
                            >
                                Information
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={selectedTab === 'followers'}
                                onClick={() => getFollowers('followers')}
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
    )
}
