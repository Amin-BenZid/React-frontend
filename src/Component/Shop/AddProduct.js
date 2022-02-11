import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../MainParts/NavbarUser";
import Footer from "../MainParts/Footer";

const AddProduct = () => {
  let navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantitie, setQuantitie] = useState(0);
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState();

  const newProductData = {
    productName,
    description,
    quantitie,
    price,
  };
  const token = localStorage.getItem("authorization");
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/products/add", newProductData)
      .then((response) => {
        console.log("Product added successfully", response);
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
  console.log(errors);
  return (
    <div>
      <NavbarUser />
      <Container>
        <Row>
          <Col
            className="mt-5 col"
            xxl={11}
            xs={11}
            xl={11}
            sm={11}
            lg={11}
            md={11}
          >
            <Form>
              <Form.Group className="mb-3" controlId="formBasicProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicQuantitie">
                <Form.Label>Quantitie</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=" Enter Quantitie"
                  onChange={(e) => setQuantitie(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=" Enter Price DT"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" type="submit" onClick={handleSubmit}>
                ADD PRODUCT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div style={{ marginTop: "2.7rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AddProduct;
