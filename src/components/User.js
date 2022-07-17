import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'

export const User = (props) => {
    return (
        <Card className="mb-4">
            <CardImg top src={props.avatar_url} alt="" />
            <CardBody>
                <CardTitle tag="p">{props.login}</CardTitle>
                <Link
                    to={`/details/${props.login}`}
                    className="btn btn-outline-dark btn-sm"
                >
                    More Info
                </Link>
            </CardBody>
        </Card>
    )
}
