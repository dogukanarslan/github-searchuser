import { Repository } from './Repository';
import { IRepository } from '../models';

interface RepositoriesProps {
  repositories: IRepository[] | null;
  count: number | undefined;
  status: string;
}

export const Repositories = (props: RepositoriesProps) => {
  const { repositories, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <div className="grid grid-cols-5 gap-4">
        {repositories?.map((repository) => (
          <Repository key={repository.id} repository={repository} />
        ))}
      </div>
    </>
  );
};
