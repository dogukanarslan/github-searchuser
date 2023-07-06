import { useState, FormEvent } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useAppDispatch } from '../../app/store';
import { fetchSearchCommit } from '../../features/search/searchCommitSlice';

export const CommitFilters = () => {
  const [commitMessage, setCommitMessage] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSearchCommit({ type: 'commits', q: commitMessage }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="12">
          <FormGroup>
            <Input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit message"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button color="primary" type="submit" disabled={!commitMessage}>
        Fetch
      </Button>
    </Form>
  );
};
