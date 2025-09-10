import { Commit } from './Commit';
import { Endpoints } from '@octokit/types';

interface CommitsProps {
  commits: Endpoints['GET /search/commits']['response']['data']['items'] | null;
}

export const Commits = (props: CommitsProps) => {
  const { commits } = props;

  return (
    <>
      {commits !== null && <p className="lead">{commits.length} results</p>}
      <div className="grid grid-cols-5 gap-4">
        {commits?.map((commit) => (
          <Commit key={commit.node_id} commit={commit} />
        ))}
      </div>
    </>
  );
};
