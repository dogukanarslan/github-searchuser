import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../models';

export interface UserProps {
  user: IUser;
}

export const User = (props: UserProps) => {
  const {
    user: { avatar_url, login },
  } = props;

  return (
    <div className="rounded-lg shadow-sm overflow-hidden hover:bg-red-500 ">
      <img src={avatar_url} className="h-64 w-full object-cover" />
      <div className="bg-white p-4">
        <h4>{login}</h4>
        <Link to={`/details/${login}`}>More Info</Link>
      </div>
    </div>
  );
};
