import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Orders = (props) => {
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td style={{ width: "30rem" }}>{props.data.client}</td>
            <td style={{ width: "28.5rem" }}>{props.data.date}</td>
            <td style={{ width: "29rem" }}>{props.data.productId}</td>
            <td>{props.data.totalPrice} DT</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
