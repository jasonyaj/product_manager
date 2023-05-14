import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";

const Main = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <ProductForm products={products} setProducts={setProducts} />
    </div>
  );
};

export default Main;
