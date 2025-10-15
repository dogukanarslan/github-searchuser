import { Endpoints } from '@octokit/types';
import { Badge } from 'components/Badge';
import { Card } from 'components/Card';
import React from 'react';

interface Props {
  branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];
}

export const Branches = (props: Props) => {
  const { branches } = props;

  return (
    <div>
      <h1 className="font-bold">Branches</h1>
      <Card
        body={
          <div className="flex flex-wrap items-center gap-2">
            {branches.map((branch) => (
              <Badge key={branch.name}>{branch.name}</Badge>
            ))}
          </div>
        }
      />
    </div>
  );
};
