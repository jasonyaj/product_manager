import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        setProducts(res.data.Products);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  const removeFromDom = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <div>
      <ProductForm
        products={products}
        setProducts={setProducts}
        removeFromDom={removeFromDom}
      />
    </div>
  );
};

export default Main;
