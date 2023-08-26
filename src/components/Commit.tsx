import React from 'react';

import { ICommit } from '../models';
import { Card } from './Card';

interface CommitProps {
  commit: ICommit;
}

export const Commit = (props: CommitProps) => {
  const { commit } = props;

  return <Card title={commit.author?.name} body={commit.commit.message} />;
};
