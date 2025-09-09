'use client';

import { Endpoints } from '@octokit/types';
import { User } from './User';

interface Props {
  users?: Endpoints['GET /users']['response']['data'];
}

export const Users = (props: Props) => {
  const { users } = props;

  if (!users) {
    return;
  }

  return (
    <>
      <p className="lead">{users.length} results</p>
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
