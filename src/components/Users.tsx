import { User } from './User';
import { IUser } from '../models';

interface UsersProps {
  users: IUser[] | null | undefined;
  count: number | undefined;
  status: string;
}

export const Users = (props: UsersProps) => {
  const { users, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <div className="space-y-2">
        {users?.map((user) => <User key={user.id} user={user} />)}
      </div>
    </>
  );
};
