'use client';

import { Endpoints } from '@octokit/types';
import { User } from './User';

interface Props {
  users?: Endpoints['GET /users']['response']['data'];
  count?: number;
}

export const Users = (props: Props) => {
  const { users, count } = props;

  if (!users) {
    return;
  }

  return (
    <>
      {count && <p className="lead">{count} results</p>}
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="w-full px-2">
            <User user={user} />
          </div>
        ))}
      </div>
    </>
  );
};
