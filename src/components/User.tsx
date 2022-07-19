import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'

export interface UserProps {
    id: number
    avatar_url: string
    login: string
    name: string
    company: string
    blog: string
    location: string
    email: string
    bio: string
    public_repos: number
    followers: number
    following: number
}

export const User = ({ avatar_url, login }: UserProps) => {
    return (
        <Card className="mb-4">
            <CardImg top src={avatar_url} alt="" />
            <CardBody>
                <CardTitle tag="p">{login}</CardTitle>
                <Link
                    to={`/details/${login}`}
                    className="btn btn-outline-dark btn-sm"
                >
                    More Info
                </Link>
            </CardBody>
        </Card>
    )
}
