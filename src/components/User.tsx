import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import { IUser } from '../models';

export interface UserProps {
  user: IUser;
}

export const User = (props: UserProps) => {
  const {
    user: { avatar_url, login },
  } = props;

  return (
    <Card className="mb-4">
      <CardImg top src={avatar_url} alt="" />
      <CardBody>
        <CardTitle>{login}</CardTitle>
        <Link to={`/details/${login}`} className="btn btn-outline-dark btn-sm">
          More Info
        </Link>
      </CardBody>
    </Card>
  );
};
