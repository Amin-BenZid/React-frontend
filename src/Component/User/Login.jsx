import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./loginStyle.css";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../MainParts/Navbar";
import Footer from "../MainParts/Footer";

function Login() {
  let navigate = useNavigate();
  // some styling
  const lableStyle = { marginRight: "89%" };
  const containerStyle = {
    textAlign: "center",
  };
  const btnStyle = { marginTop: "3%", width: "50%" };

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  // login Data
  const loginData = {
    email: email,
    password: password,
  };
  const [errors, setErrors] = useState();

  // if condition to stay loged in

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authorization = "authorization";
    await axios
      .post("http://localhost:5000/api/login", loginData)
      .then((response) => {
        localStorage.setItem(authorization, response.data.token);
        dispatch(loginSuccess(response.data.user));
        navigate("/", { replace: true });
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
  };

  return (
    <div>
      <NavBar />
      <div className="login">
        <Container className="container" style={containerStyle}>
          <Row className="form">
            <Col
              className="mt-5 col"
              xxl={11}
              xs={11}
              xl={11}
              sm={11}
              lg={11}
              md={11}
            >
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={lableStyle}>Email </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={lableStyle}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  style={btnStyle}
                  className="mt-5"
                  variant="success"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
