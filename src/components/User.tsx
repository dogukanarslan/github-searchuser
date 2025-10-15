import Link from 'next/link';

import { Card } from './Card';

export interface UserProps {
  login: string;
  avatar_url: string;
}

export const User = (props: UserProps) => {
  const { avatar_url, login } = props;

  return (
    <Card
      body={
        <div className="flex items-center gap-4">
          <img
            src={avatar_url}
            className="h-16 w-16 rounded-full object-cover"
            alt="User image"
          />

          <div>
            <Link href={`/users/${login}`}>
              <h3 className="text-lg font-bold">{login}</h3>
            </Link>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap">
                <li className="p-1 leading-none">
                  <Link
                    href={{
                      pathname: `/details/${login}`,
                      search: '?tab=followers',
                    }}
                    className="text-xs font-medium"
                  >
                    Followers
                  </Link>
                </li>

                <li className="p-1 leading-none">
                  <Link
                    href={{
                      pathname: `/details/${login}`,
                      search: '?tab=following',
                    }}
                    className="text-xs font-medium"
                  >
                    Following
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    />
  );
};
