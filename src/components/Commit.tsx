import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'
import { ICommit } from '../models'

interface CommitProps {
    commit: ICommit
}

export const Commit = (props: CommitProps) => {
    const { commit } = props

    console.log(commit)

    return (
        <Card className="mb-4">
            <CardBody>
                <CardText>{commit.author.name}</CardText>
                <CardText>{commit.commit.message}</CardText>
            </CardBody>
        </Card>
    )
}
