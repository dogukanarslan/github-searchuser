import { useState, FormEvent } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useAppDispatch } from '../../app/store';
import { fetchSearchRepository } from '../../features/search/searchRepositorySlice';

export const RepositoryFilters = () => {
  const [repositoryName, setRepositoryName] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchSearchRepository({ type: 'repositories', q: repositoryName })
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Input
              type="text"
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
              placeholder="Repository name"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button color="primary" type="submit" disabled={!repositoryName}>
        Fetch
      </Button>
    </Form>
  );
};
