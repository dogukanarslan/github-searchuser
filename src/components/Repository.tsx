import React from 'react';
import { IRepository } from '../models';
import { Card } from './Card';

interface RepositoryProps {
  repository: IRepository;
}

export const Repository = (props: RepositoryProps) => {
  const {
    repository: { name, description },
  } = props;

  return <Card title={`Name: ${name}`} body={`Description: ${description}`} />;
};
