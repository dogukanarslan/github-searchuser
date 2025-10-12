import { Endpoints } from '@octokit/types';
import { Repository } from './Repository';

interface RepositoriesProps {
  repositories?:
    | Endpoints['GET /search/repositories']['response']['data']['items']
    | Endpoints['GET /repositories']['response']['data'];
}

export const Repositories = (props: RepositoriesProps) => {
  const { repositories } = props;

  return (
    <div className="space-y-2">
      {repositories?.map((repository) => (
        <Repository
          key={repository.id}
          name={repository.name}
          owner={repository.owner?.login || ''}
          description={repository.description || ''}
          full_name={repository.full_name}
          stargazers_count={repository.stargazers_count || 0}
          watchers_count={repository.watchers_count || 0}
        />
      ))}
    </div>
  );
};
