import { Link } from 'react-router-dom';

import { IUser } from '../models';
import { Button } from './Button';

export interface UserProps {
  user: IUser;
}

export const User = (props: UserProps) => {
  const {
    user: { avatar_url, login, type },
  } = props;

  return (
    <Link
      className="group relative block h-96 bg-black"
      to={`/details/${login}`}
    >
      <img
        alt="User"
        src={avatar_url}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-white">
          {type}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">{login}</p>
      </div>
    </Link>
  );
};
