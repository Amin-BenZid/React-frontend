import React from "react";
import Navbar from "../MainParts/Navbar";
import NavbarUser from "../MainParts/NavbarUser";
import Footer from "../MainParts/Footer";
import Shop from "../Shop/Shop";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth } = useSelector((state) => state.login);

  return (
    <div>
      
      {isAuth ? <NavbarUser /> : <Navbar />}
      <Shop />
      <Footer />
    </div>
  );
};

export default Home;
