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
      <div className="grid grid-cols-5 gap-4">
        {users?.map((user) => <User key={user.id} user={user} />)}
      </div>
    </>
  );
};
