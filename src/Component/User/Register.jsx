import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../MainParts/Navbar";
import Footer from "../MainParts/Footer";

const Register = () => {
  let navigate = useNavigate();

  const lableStyle = { marginRight: "89%" };
  const containerStyle = {
    textAlign: "center",
  };
  const btnStyle = { marginTop: "3%", width: "50%" };
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Client");
  const newUser = {
    name: name,
    password: password,
    email: email,
    role: role,
  };
  const [errors, setErrors] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length > 8)
      await axios
        .post("https://gmcprojectreact.herokuapp.com/api/register", newUser)
        .then((response) => {
          console.log("user added successfully", response);
          navigate("/login", { replace: true });
        })
        .catch((error) => {
          if (error.response) {
            setErrors(error.response.data);
          } else if (error.request) {
            setErrors(error.request);
          } else {
            setErrors("Error", error.message);
          }
        });
    if (password.length < 8) return setErrors("Youe can't submite empty form or password less then 8 char");
  };
  console.log(errors);
  return (
    <div className="register">
      <NavBar />
      <Container className="container" style={containerStyle}>
        <Row className="form">
          <Col className="mt-5 col" xxl={11} xs={11} xl={11} sm={11} lg={11} md={11}>
            {errors !== undefined ? (
              errors.err === undefined ? (
                <Alert
                  style={{
                    width: "20rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  variant={"danger"}
                >
                  {errors}
                </Alert>
              ) : (
                <Alert
                  variant={"danger"}
                  style={{
                    width: "20rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {errors.err}
                </Alert>
              )
            ) : null}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label style={lableStyle}>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={lableStyle}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={lableStyle}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=" Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Label style={lableStyle}>Role</Form.Label>
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Client">Client</option>
                <option value="Vendor">Vendor</option>
              </Form.Select>

              <Button style={btnStyle} variant="success" type="submit" onClick={handleSubmit}>
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div style={{ marginTop: "17.6rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Register;
