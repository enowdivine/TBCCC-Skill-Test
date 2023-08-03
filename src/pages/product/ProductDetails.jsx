import React from "react";
import Header from "../../components/Header";
import ProductDetails from "../../components/product/ProductDetails";

const ProductDetailspage = () => {
  return (
    <div>
      <Header />
      {/* product details component */}
      <ProductDetails />
    </div>
  );
};

export default ProductDetailspage;
