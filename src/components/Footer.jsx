import { Container, Col, Navbar } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer>
      <Navbar bg="dark" data-bs-theme="dark" className="p-3 footer">
        <Container className="text-white">
          <Col>Copyright &copy;</Col>
          <Col className="text-center">Eric</Col>
          <Col className="text-end">2024</Col>
        </Container>
      </Navbar>
    </footer>
  );
};
