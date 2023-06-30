import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { IRepository } from '../models';

interface RepositoryProps {
  repository: IRepository;
}

export const Repository = (props: RepositoryProps) => {
  const {
    repository: { name, description, owner },
  } = props;

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>Name: {name}</CardTitle>
        <CardText>Description: {description}</CardText>
        <CardText>Owner: {owner.login}</CardText>
      </CardBody>
    </Card>
  );
};
