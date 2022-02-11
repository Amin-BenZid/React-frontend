import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Orders = (props) => {
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
  const id = props.data._id;
  const handleSetAdmin = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/admin/user/role/${id}`)
      .then((response) => {
        alert(`${id} is now an admin`);
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
  const handleremAdmin = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/admin/user/remrole/${id}`)
      .then((response) => {
        alert(`${id} is no longer an admin`);
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
  const handleBan = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/admin/user/ban/${id}`)
      .then((response) => {
        alert(`${id} is Perma Baned`);
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
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td style={{ width: "30rem" }}>
              <Button
                onClick={handleSetAdmin}
                variant="warning"
                style={{ marginRight: "1rem", width: "6rem" }}
              >
                Set Admin
              </Button>
              <Button
                onClick={handleremAdmin}
                variant="warning"
                style={{ marginRight: "1rem", width: "6rem" }}
              >
                Remove Admin
              </Button>
              <Button
                style={{ marginRight: "1rem", width: "4rem" }}
                onClick={handleBan}
                variant="danger"
              >
                Ban User
              </Button>

              {props.data.name}
            </td>
            <td style={{ width: "28.5rem" }}>{props.data.email}</td>
            <td style={{ width: "29rem" }}>{props.data.role}</td>
            <td>{`${props.data.isAdmin}`} </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
