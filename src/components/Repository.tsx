import Link from 'next/link';

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

  return (
    <div className="block space-y-2 rounded-xl border p-4">
      <Link href={`/repositories/${owner}/${name}`}>
        <h5 className="text-lg font-bold">{name}</h5>
      </Link>
      <h6 className="text-sm font-bold">{owner}</h6>
      <div>{description}</div>
    </div>
  );
};
