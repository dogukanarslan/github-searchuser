import { Container, Row, Col } from 'reactstrap';
import './App.scss';
import { Header, Sidebar, Main } from './components';

export const App = () => (
  <div className="App">
    <Header />
    <Container fluid>
      <Row>
        <Col className="sidebar bg-light shadow" md="2">
          <Sidebar />
        </Col>
        <Col className="ml-auto" md="10">
          <Main />
        </Col>
      </Row>
    </Container>
  </div>
);
