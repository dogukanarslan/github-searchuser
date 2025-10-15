import { Endpoints } from '@octokit/types';
import { Badge } from 'components/Badge';
import { Card } from 'components/Card';
import React from 'react';

interface Props {
  languages: Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data'];
}

export const Languages = (props: Props) => {
  const { languages } = props;

  return (
    <div>
      <h1 className="font-bold">Branches</h1>
      <Card
        body={
          <div className="flex flex-wrap items-center gap-2">
            {Object.keys(languages).map((language) => (
              <Badge key={language}>{language}</Badge>
            ))}
          </div>
        }
      />
    </div>
  );
};
