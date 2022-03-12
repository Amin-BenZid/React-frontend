import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ShopLoading from "./ShopLoading";
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import "./shopStyle.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const styleLink = {
    textDecoration: "none",
    color: "black",
    width: "20rem",
    marginLeft: "auto",
    marginRight: "auto",
  };
  const [product, setProduct] = useState();

  useEffect(async () => {
    await axios
      .get("https://gomycodetest.herokuapp.com/api/products")
      .then((response) => {
        setProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Container className="container">
        <Row className="row">
          {product === undefined ? (
            <ShopLoading />
          ) : (
            <>
              {product
                .map((item) => {
                  return (
                    <Link style={styleLink} to={`/find/${item._id}`}>
                      <Col className="pt-5 align-self-center ">
                        <ProductCard product={item} />
                      </Col>
                    </Link>
                  );
                })
                .reverse()}
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
