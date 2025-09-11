import { Commit } from './Commit';
import { Endpoints } from '@octokit/types';

interface CommitsProps {
  commits: Endpoints['GET /search/commits']['response']['data']['items'] | null;
  count?: number;
}

export const Commits = (props: CommitsProps) => {
  const { commits, count } = props;

  return (
    <>
      {commits !== null && <p className="lead">{count} results</p>}
      <div className="space-y-2">
        {commits?.map((commit) => (
          <Commit key={commit.node_id} commit={commit} />
        ))}
      </div>
    </>
  );
};
