import { Row, Col } from 'reactstrap';
import { Commit } from './Commit';
import { ICommit } from '../models';

interface CommitsProps {
  commits: ICommit[] | null;
  count: number | undefined;
  status: string;
}

export const Commits = (props: CommitsProps) => {
  const { commits, count } = props;

  return (
    <>
      {count !== undefined && <p className="lead">{count} results</p>}
      <Row xs="2" sm="4" md="6">
        {commits?.map((commit) => (
          <Col key={commit.node_id}>
            <Commit commit={commit} />
          </Col>
        ))}
      </Row>
    </>
  );
};
