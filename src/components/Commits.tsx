import { Commit } from './Commit';
import { Endpoints } from '@octokit/types';

interface CommitsProps {
  commits: Endpoints['GET /search/commits']['response']['data']['items'] | null;
  count: number | undefined;
  status: string;
}

export const Commits = (props: CommitsProps) => {
  const { commits, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <div className="grid grid-cols-5 gap-4">
        {commits?.map((commit) => (
          <Commit key={commit.node_id} commit={commit} />
        ))}
      </div>
    </>
  );
};
