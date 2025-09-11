import { format } from 'date-fns';
import { Endpoints } from '@octokit/types';
import { Card } from './Card';

interface CommitProps {
  commit: Endpoints['GET /search/commits']['response']['data']['items'][0];
}

export const Commit = (props: CommitProps) => {
  const { commit } = props;

  return (
    <Card
      title={commit.author?.name || ''}
      body={
        <div>
          <div>
            <b>Author:</b> {commit.author?.login}
          </div>
          <div>
            <b>Message:</b> {commit.commit.message}
          </div>
          <div>
            <b>Date:</b> {format(commit.commit.author.date, 'MM/dd/yyyy')}
          </div>
        </div>
      }
    />
  );
};
