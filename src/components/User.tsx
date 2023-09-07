import { Link } from 'react-router-dom';

import { IUser } from '../models';

export interface UserProps {
  user: IUser;
}

export const User = (props: UserProps) => {
  const {
    user: { avatar_url, login, type },
  } = props;

  return (
    <Link className="group block overflow-hidden" to={`/details/${login}`}>
      <div className="relative h-[300px] ">
        <img
          src={avatar_url}
          alt=""
          className="absolute inset-0 h-full w-full rounded object-cover"
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {login}
        </h3>

        <p className="mt-1.5 text-sm tracking-wide text-gray-900">{type}</p>
      </div>
    </Link>
  );
};
