import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarUser from "../MainParts/NavbarUser";
import Footer from "../MainParts/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  let navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantitie, setQuantitie] = useState(0);
  const [price, setPrice] = useState(0);
  const editedProductData = {
    productName: productName,
    description: description,
    price: price,
    quantitie: quantitie,
  };
  const location = useLocation();
  const id = location.pathname.split("/")[3];
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
      .patch("https://gmcprojectreact.herokuapp.com/api/products/edit/" + id, editedProductData)
      .then((response) => {
        console.log("Product Updated successfully", response);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div>
      <NavbarUser />
      <Container>
        <Row>
          <Col className="mt-5 col" xxl={11} xs={11} xl={11} sm={11} lg={11} md={11}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNewProductName">
                <Form.Label> New Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New Product Name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNewDescription">
                <Form.Label> New Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Form.Group style={{ width: "50%" }} className="mb-3" controlId="formBasicNewQuantitie">
                  <Form.Label> New Quantitie</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Old Quantitie + NumberAdded"
                    onChange={(e) => setQuantitie(e.target.value)}
                  />
                </Form.Group>

                <Form.Group style={{ width: "50%" }} className="mb-3" controlId="formBasicNewPrice">
                  <Form.Label>New Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=" Enter New Price DT"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </div>

              <Button variant="success" type="submit" onClick={handleSubmit}>
                EDIT PRODUCT
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div style={{ marginTop: "8.1rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default EditProduct;
