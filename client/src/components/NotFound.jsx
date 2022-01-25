import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container>
      <Col>
        <Row className="justify-content-center fs-3 mt-1">Упс, ошибка!</Row>
        <Row className="justify-content-center fs-2 my-2">404 Not Found</Row>
        <Row className="justify-content-center">Страница, которую вы запрашивали, не была найдена</Row>
        <Row className="justify-content-center mt-3">
          <Link to="/" style={{width: 'auto'}}>Перейти на Главную</Link>
        </Row>
      </Col>
    </Container>
  );
};

export default NotFound;