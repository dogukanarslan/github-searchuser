import { Row, Col } from 'reactstrap';
import { User } from './User';
import { IUser } from '../models';

interface UsersProps {
  users: IUser[] | null | undefined;
  count: number | undefined;
  status: string;
}

export const Users = (props: UsersProps) => {
  const { users, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <Row xs="2" sm="4" md="6">
        {users?.map((user) => (
          <Col key={user.id}>
            <User user={user} />
          </Col>
        ))}
      </Row>
    </>
  );
};
