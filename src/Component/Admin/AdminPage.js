import React, { useEffect, useState } from "react";
import NavBarUser from "../MainParts/NavbarUser";
import Footer from "../MainParts/Footer";
import axios from "axios";
import Orders from "./Orders";
import { Table, Button } from "react-bootstrap";
import Users from "./Users";

const AdminPage = () => {
  const [numberOfOrders, setNumberOfOrders] = useState();
  const [numberOfProducts, setNumberOfProducts] = useState();
  const [items, setItems] = useState();
  const [users, setUsers] = useState();

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
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/admin/")
      .then((response) => {
        setNumberOfOrders(response.data.numberOfOrders);
        setNumberOfProducts(response.data.numberOfProducts);
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
  }, []);
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/admin/orders")
      .then((response) => {
        setItems(response.data.allOroders);
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
  }, []);
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/admin/users")
      .then((response) => {
        setUsers(response.data.allUsers);
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
  }, []);
  const [showOrders, setShowOrders] = useState({
    display: "none",
  });
  const handleOrders = (e) => {
    e.preventDefault();
    if (showOrders.display === "none") {
      setShowOrders({ display: "block" });
    } else {
      setShowOrders({ display: "none" });
    }
  };
  const [showUsers, setShowUsers] = useState({
    display: "block",
  });
  const handleUsers = (e) => {
    e.preventDefault();
    if (showUsers.display === "block") {
      setShowUsers({ display: "none" });
    } else {
      setShowUsers({ display: "block" });
    }
  };

  return (
    <div>
      <NavBarUser />
      <div
        style={{
          marginTop: "2rem",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Table striped bordered hover variant="dark">
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>Number Of Products</td>
              <td>{numberOfProducts}</td>
            </tr>
            <tr>
              <td>Number Of Orders </td>
              <td>{numberOfOrders}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Button
        variant="info"
        style={{ margin: "0.5rem", width: "6rem" }}
        onClick={handleOrders}
      >
        Show All Orders
      </Button>
      <div style={showOrders}>
        <Table striped bordered hover>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ width: "30rem" }}>Client ID </th>
              <th style={{ width: "28.5rem" }}>Date</th>
              <th style={{ width: "29rem" }}>Product ID</th>
              <th>Total Price</th>
            </tr>
          </thead>
        </Table>
        {items != undefined
          ? items
              .map((e) => {
                return <Orders data={e} />;
              })
              .reverse()
          : null}
      </div>
      <br />
      <Button
        variant="info"
        style={{ margin: "0.5rem", width: "6rem" }}
        onClick={handleUsers}
      >
        Show All Users
      </Button>
      <div style={showUsers}>
        <Table striped bordered hover>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th style={{ width: "30rem" }}>Client Name </th>
              <th style={{ width: "28.5rem" }}>Email</th>
              <th style={{ width: "29rem" }}>Role ID</th>
              <th>Is Admin</th>
            </tr>
          </thead>
        </Table>
        {users != undefined
          ? users
              .map((e) => {
                return <Users data={e} />;
              })
              .reverse()
          : null}
      </div>
      <div style={{ marginTop: "57.6vh" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
