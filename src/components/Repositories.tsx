import { Endpoints } from '@octokit/types';
import { Repository } from './Repository';

interface RepositoriesProps {
  repositories: Endpoints['GET /repositories']['response']['data'] | null;
  count: number | undefined;
}

export const Repositories = (props: RepositoriesProps) => {
  const { repositories, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <div className="grid lg:grid-cols-3 gap-4">
        {repositories?.map((repository) => (
          <Repository
            key={repository.id}
            name={repository.name}
            owner={repository.owner.login}
            description={repository.description || ''}
            full_name={repository.full_name}
            stargazers_count={repository.stargazers_count || 0}
            watchers_count={repository.watchers_count || 0}
          />
        ))}
      </div>
    </>
  );
};
