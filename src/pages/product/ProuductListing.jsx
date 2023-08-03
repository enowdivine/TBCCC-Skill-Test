import React from "react";
import Header from "../../components/Header";
import Products from "../../components/product/Products";

const index = () => {
  return (
    <div>
      {/* header component */}
      <Header />
      {/* product listing component */}
      <Products />
    </div>
  );
};

export default index;
