import { Link } from 'react-router-dom';

import { IUser } from '../models';
import { Button } from './Button';

export interface UserProps {
  user: IUser;
}

export const User = (props: UserProps) => {
  const {
    user: { avatar_url, login, type, followers_url, following_url },
  } = props;

  return (
    <div className="block rounded-xl border p-4">
      <div className="flex items-center gap-4">
        <Link to={`/details/${login}`}>
          <img
            src={avatar_url}
            className="h-16 w-16 rounded-full object-cover"
            alt="User image"
          />
        </Link>
        <div>
          <h3 className="text-lg font-bold">{login}</h3>
          <div className="flow-root">
            <ul className="-m-1 flex flex-wrap">
              <li className="p-1 leading-none">
                <Link
                  to={{
                    pathname: `/details/${login}`,
                    search: '?tab=followers',
                  }}
                  className="text-xs font-medium"
                >
                  Followers
                </Link>
              </li>

              <li className="p-1 leading-none">
                <Link to="/following" className="text-xs font-medium">
                  Following
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
