import { Endpoints } from '@octokit/types';
import { User } from './User';

interface UsersProps {
  users: Endpoints['GET /users']['response']['data'] | null | undefined;
  count: number | undefined;
}

export const Users = (props: UsersProps) => {
  const { users, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <div className="space-y-2">
        {users?.map((user) => (
          <div key={user.id} className="w-full px-2">
            <User user={user} />
          </div>
        ))}
      </div>
    </>
  );
};
