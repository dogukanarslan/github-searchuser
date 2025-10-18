import Link from 'next/link';

import { Button } from './Button';
import { Badge } from './Badge';
import { useAppDispatch, useAppSelector } from 'store/store';
import { fetchBranches, fetchLabels } from 'store/slices/repositoriesSlice';

export interface RepositoryProps {
  name: string;
  owner: string;
  description: string;
  full_name: string;
  stargazers_count: number;
  watchers_count: number;
}

export const Repository = (props: RepositoryProps) => {
  const { name, owner, description } = props;

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
      <Link href={`/repositories/${owner}/${name}`}>
        <h5 className="text-lg font-bold">{name}</h5>
      </Link>
      <h6 className="text-sm font-bold">{owner}</h6>
      <div>{description}</div>
      <div className="space-x-2">
        <Button onClick={getBranches}>Show Branches</Button>
        <Button onClick={getLabels}>Show Labels</Button>
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
