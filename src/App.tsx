import { Container, Row, Col } from 'reactstrap';
import { Sidebar, Main } from './components';
import './App.scss';

export const App = () => (
  <div className="App">
    <Container fluid>
      <Row>
        <Col className="fixed h-full bg-gray-100 shadow-md" md="2">
          <Sidebar />
        </Col>
        <Col className="ms-auto" md="10">
          <Main />
        </Col>
      </Row>
    </Container>
  </div>
);
