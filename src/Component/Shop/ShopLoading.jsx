import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./shopStyle.css";

const ShopLoading = () => {
  return (
    <div>
      <Container className="container">
        <Row className="row">
          <Col className="pt-5 align-self-center ">
            <div className="product "></div>
          </Col>
          <Col className="pt-5 align-self-center ">
            <div className="product "></div>
          </Col>
          <Col className="pt-5 align-self-center ">
            <div className="product "></div>
          </Col>
          <Col className="pt-5 align-self-center ">
            <div className="product "></div>
          </Col>
          <Col className="pt-5 align-self-center ">
            <div className="product "></div>
          </Col>
          <Col className="pt-5 align-self-center ">
            <div className="product "></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopLoading;
