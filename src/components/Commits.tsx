import { Commit } from './Commit';
import { ICommit } from '../models';

interface CommitsProps {
  commits: ICommit[] | null;
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
