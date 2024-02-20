import { Spinner } from 'components';
import { User } from './User';
import { IUser } from '../models';

interface UsersProps {
  users: IUser[] | null | undefined;
  count: number | undefined;
  isLoading?: boolean;
}

export const Users = (props: UsersProps) => {
  const { users, count, isLoading } = props;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <div className="space-y-2">
        {users?.map((user) => <User key={user.id} user={user} />)}
      </div>
    </>
  );
};
