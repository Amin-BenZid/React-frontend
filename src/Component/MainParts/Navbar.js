import React from "react";
import {
  Form,
  Button,
  Container,
  Navbar,
  Nav,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const signUpStyle = {
    backgroundColor: "#198754",
    height: "2.2rem",
    color: "white",
    borderRadius: "5px",
    width: "5.5rem",
    textAlign: "center",
    textDecoration: "none",
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>The Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link style={{ textDecoration: "none", color: "grey" }} to="/">
                Home
              </Link>
            </Nav>
            <Form className="d-flex" style={{ width: "27rem" }}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ width: "20rem" }}
              />
              <Button
                style={{ marginRight: "20rem", width: "20rem" }}
                variant="outline-success"
              >
                Search
              </Button>
            </Form>
            <Nav>
              <Link
                style={{
                  textDecoration: "none",
                  color: "grey",
                  marginTop: "5px",
                  marginRight: "1rem",
                }}
                to="/login"
              >
                Login
              </Link>
              <Link style={signUpStyle} to="/register">
                <p style={{ marginTop: "4px" }}>SignUp</p>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
