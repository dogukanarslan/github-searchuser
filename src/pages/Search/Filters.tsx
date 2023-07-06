import { useState, FormEvent } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useAppDispatch } from '../../app/store';
import { fetchSearch } from '../../features/search/searchSlice';

export const Filters = () => {
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSearch({ type: 'users', q: username }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button color="primary" type="submit" disabled={!username}>
        Fetch
      </Button>
    </Form>
  );
};
