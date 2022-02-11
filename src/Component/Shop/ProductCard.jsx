import React from "react";
import "./shopStyle.css";

const Shop = (props) => {
  const productName = props.product.productName;
  const description = props.product.description;
  const price = props.product.price;
  const id = props.product._id;
  return (
    <div>
      <div className="product">
        <h3 className="productName">{productName}</h3>
        <p className="productDis">{description}</p>
        <p className="productPrice">{price}DT</p>
      </div>
    </div>
  );
};

export default Shop;
