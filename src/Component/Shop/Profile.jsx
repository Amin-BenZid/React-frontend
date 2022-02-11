import React from "react";
import NavbarUser from "../MainParts/NavbarUser";
import Footer from "../MainParts/Footer";
import Shop from "../Shop/Shop";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/login/" + id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <NavbarUser user={user} />
      <Shop />
      <Footer />
    </div>
  );
};

export default Home;
