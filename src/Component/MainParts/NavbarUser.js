import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../User/loginSlice";

const NavbarComponent = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpStyle = {
    backgroundColor: "#198754",
    color: "white",
    borderRadius: "5px",
    width: "4.5rem",
    textAlign: "center",
  };
  const { data } = useSelector((state) => state.login);
  const username = data.name;
  const token = localStorage.getItem("authorization");
  var decoded = jwt_decode(token);
  const [showBut, setShowBut] = useState({ display: "none" });
  useEffect(() => {
    if (decoded.userRole === "vendor" || decoded.userIsAdmin === true) {
      setShowBut({
        display: "flex",
        textDecoration: "none",
        color: "grey",
        marginLeft: "1rem",
      });
    }
  }, []);
  const handleLogOut = (e) => {
    dispatch(logOut());
    navigate("/", { replace: true });
    localStorage.removeItem("authorization");
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
              <Link
                style={{
                  textDecoration: "none",
                  color: "grey",
                  marginLeft: "1rem",
                }}
                to={"/"}
              >
                Home
              </Link>
              {decoded.userIsAdmin === true ? (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "grey",
                    marginLeft: "1rem",
                  }}
                  to={"/admin"}
                >
                  Admin
                </Link>
              ) : null}
              {/* if he is a vendor  */}
              <Link style={showBut} to={"/product/add"}>
                Add Product
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
              <div
                className="nav-link font-weight-light"
                style={{
                  color: "#80919E",
                  cursor: "pointer",
                }}
              >
                {username}
              </div>
              <Nav.Link style={signUpStyle} onClick={handleLogOut}>
                LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
