import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favCounters, setFavCounters] = useState(0);

  const getUser = localStorage.getItem("userInfo");
  const user = JSON.parse(getUser);

  const favoriteData = useSelector((state) => state.favorites);
  const { favoriteItems } = favoriteData;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    setFavCounters(favoriteItems.length);
  }, [favoriteItems]);

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">Travel.io</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse
          className="justify-content-end"
          style={{ color: "white" }}
        >
          {user ? (
            <NavDropdown
              title={user ? user.name : "Hello"}
              id="collapsible-nav-dropdown"
              drop="start"
            >
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              <NavDropdown.Item href="/explore">Explore</NavDropdown.Item>
              <NavDropdown.Item href="/favorites">
                Favorites
                <Badge className="ms-2" bg="warning">
                  {favCounters}
                </Badge>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown
              title={user ? user.name : "Hello"}
              id="collapsible-nav-dropdown"
              drop="start"
            >
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
