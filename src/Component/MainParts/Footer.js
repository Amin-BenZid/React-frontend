import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Container
        style={{
          backgroundColor: "black",
          height: "4rem",
          textAlign: "center",
          position: "absolute",
        }}
        fluid
      >
        <p style={{ color: "white", padding: "0.5rem", fontSize: "12px" }}>
          © 2022 All Rights Reserved <br />
          aminebenzid2003@gmail.com
        </p>
      </Container>
    </div>
  );
};
export default Footer;
