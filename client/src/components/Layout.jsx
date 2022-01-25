import { Container, Row, Navbar } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container fluid className="chat-block">

      <Row>
        <Navbar expand="lg" variant="light" bg="light" className="shadow-sm p-1 mb-3 bg-body rounded">
          <Container>
            <Link to="/">
              <Navbar.Brand>React Chat</Navbar.Brand>
            </Link>
          </Container>
        </Navbar>
      </Row>

      <Outlet />

    </Container>
  );
};

export default Layout;