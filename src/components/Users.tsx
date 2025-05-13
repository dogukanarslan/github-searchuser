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
      <div className="flex flex-wrap">
        {users?.map((user) => (
          <div key={user.id} className="mt-4 w-full px-2 sm:w-1/2 md:w-1/3">
            <User user={user} />
          </div>
        ))}
      </div>
    </>
  );
};
