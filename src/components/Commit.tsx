import { Endpoints } from '@octokit/types';
import { Card } from './Card';

interface CommitProps {
  commit: Endpoints['GET /search/commits']['response']['data']['items'][0];
}

export const Commit = (props: CommitProps) => {
  const { commit } = props;

  return (
    <Card title={commit.author?.name || ''} body={commit.commit.message} />
  );
};
