import React, { useEffect, useState } from "react";
import Navbar from "../MainParts/Navbar";
import NavbarUser from "../MainParts/NavbarUser";
import Footer from "../MainParts/Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FiEdit, FiDelete } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./pageProductStyle.css";
import axios from "axios";

const ProductPage = () => {
  let navigate = useNavigate();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState();
  const [number, setNumber] = useState(0);
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/products/find/" + id)
      .then((response) => {
        setProduct(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .delete("http://localhost:5000/api/products/delete/" + id)
      .then(() => {
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
  const quantitie = {
    quantitie: number,
  };
  const handleOrder = async (e) => {
    e.preventDefault();
    if (number > 0) {
      await axios
        .post("http://localhost:5000/api/orders/" + id, quantitie)
        .then((res) => {
          console.log(res);
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
    } else console.log("you cant buy 0");
  };
  const handleIncrement = (e) => {
    e.preventDefault();
    setNumber(number + 1);
  };
  const handleDecrement = (e) => {
    e.preventDefault();
    number > 0 ? setNumber(number - 1) : setNumber(number);
  };
  const { isAuth } = useSelector((state) => state.login);

  const token = localStorage.getItem("authorization");
  var decoded = jwt_decode(token);

  return (
    <div>
      {isAuth ? <NavbarUser /> : <Navbar />}
      {product === undefined ? (
        "no"
      ) : (
        <div className="productCard">
          {product.vendorID === decoded.user_ID && isAuth ? (
            <Link to={`/products/edit/${id}`} style={{ marginLeft: "1rem" }}>
              <FiEdit />
            </Link>
          ) : null}

          {product.vendorID === decoded.user_ID ||
          (decoded.userIsAdmin === true && isAuth) ? (
            <button
              onClick={handleDelete}
              className="btn"
              style={{ marginLeft: "0.4rem" }}
            >
              <FiDelete />
            </button>
          ) : null}
          <ul>
            <li>
              <h1>{product.productName}</h1>
            </li>
            <li>
              <p>
                <b>Description : </b>
                {product.description}
              </p>
            </li>
            <li>
              <p>
                {product.price} <b>DT</b>
              </p>
            </li>
            <li>
              <p>
                <b>Quantitie : </b>
                {product.quantitie}
              </p>
            </li>
          </ul>
          <div className="productquant ">
            <button onClick={handleOrder} className="btn btn-success buyBtn ">
              Buy
            </button>
            <button
              style={{
                height: "2rem",
                marginTop: "2.2rem",
                marginLeft: "2rem",
                marginRight: "1rem",
                width: "2rem",
              }}
              onClick={handleDecrement}
            >
              -
            </button>
            <b
              style={{
                marginTop: "2.5rem",
              }}
            >
              {number}
            </b>
            <button
              onClick={handleIncrement}
              style={{
                height: "2rem",
                marginTop: "2.2rem",
                width: "2rem",
                marginLeft: "1rem",
              }}
            >
              +
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
