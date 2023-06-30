import { useState, FormEvent } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
            <Label for="username">Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              id="startingId"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button color="dark" type="submit" disabled={!username}>
        Fetch
      </Button>
    </Form>
  );
};
