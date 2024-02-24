import { IRepository } from '../models';
import { Button } from './Button';
import { Badge } from './Badge';
import { useAppDispatch, useAppSelector } from 'app/store';
import { fetchBranches } from 'features/repositories/repositoriesSlice';

interface RepositoryProps {
  repository: IRepository;
}

export const Repository = (props: RepositoryProps) => {
  const {
    repository: { name, owner, description, full_name },
  } = props;

  const { branches } = useAppSelector((state) => state.repositories);
  const dispatch = useAppDispatch();

  const getBranches = () => {
    dispatch(fetchBranches({ login: owner.login, repo: name }));
  };

  return (
    <div className="block space-y-2 rounded-xl border p-4">
      <h1 className="text-lg font-bold">{full_name}</h1>
      <h2>{description}</h2>
      <Button color="primary" size="sm" onClick={getBranches}>
        Show Branches
      </Button>
      {branches[name]?.length > 0 && (
        <div>
          <h4 className="font-bold">Branches</h4>
          <div className="flex flex-wrap gap-2">
            {branches[name].map((branch) => (
              <Badge key={branch.name}>{branch.name}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
