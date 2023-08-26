import React from 'react';
import { IUser } from '../models';
import { Card } from './Card';

export interface UserProps {
  user: IUser;
}

export const User = (props: UserProps) => {
  const {
    user: { avatar_url, login },
  } = props;

  return <Card img={avatar_url} title={login} link={`/details/${login}`} />;
};
