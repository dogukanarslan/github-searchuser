import React, { useEffect, useState } from 'react'
import { getUser } from '../../constants'
import { Row, Col, Button } from 'reactstrap'
import { RouteComponentProps } from 'react-router-dom'
import { IUser } from '../../models'
import { ArrowLeft } from 'react-feather'

export const Details = (props: RouteComponentProps<{ login: string }>) => {
    const [user, setUser] = useState({} as IUser)

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
    return (
        <>
            <Button
                className="mb-2"
                onClick={() => props.history.goBack()}
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
                </Col>
            </Row>
        </>
    )
}
