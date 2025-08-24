import { Star, Eye } from 'react-feather';
import { Button } from './Button';
import { Badge } from './Badge';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  fetchBranches,
  fetchLabels,
} from 'store/slices/repositoriesSlice';

interface RepositoryProps {
  name: string;
  owner: string;
  description: string;
  full_name: string;
  stargazers_count: number;
  watchers_count: number;
}

export const Repository = (props: RepositoryProps) => {
  const { name, owner, description, stargazers_count, watchers_count } = props;

  const { branches, labels } = useAppSelector((state) => state.repositories);
  const dispatch = useAppDispatch();

  const getBranches = () => {
    dispatch(fetchBranches({ login: owner, repo: name }));
  };

  const getLabels = () => {
    dispatch(fetchLabels({ login: owner, repo: name }));
  };

  return (
    <div className="block space-y-2 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-bold">{name}</h5>
          <h6 className="text-sm font-bold">{owner}</h6>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-2">
            <Star /> {stargazers_count}
          </div>
          <div className="flex items-center gap-2">
            <Eye /> {watchers_count}
          </div>
        </div>
      </div>
      <div>{description}</div>
      <div>Stars {stargazers_count}</div>
      <div>Watchers {watchers_count}</div>
      <div className="space-x-2">
        <Button color="primary" size="sm" onClick={getBranches}>
          Show Branches
        </Button>
        <Button color="secondary" size="sm" onClick={getLabels}>
          Show Labels
        </Button>
      </div>

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

      {labels[name] && labels[name].length === 0 && 'No labels found'}

      {labels[name]?.length > 0 && (
        <div>
          <h4 className="font-bold">Labels</h4>
          <div className="flex flex-wrap gap-2">
            {labels[name].map((label) => (
              <Badge
                key={label.name}
                style={{ backgroundColor: `#${label.color}` }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
