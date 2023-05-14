import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  // state vars to display
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // get the id from the :id in the route
  const { id } = useParams();

  useEffect(() => {
    // go to the server route, get the obj
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((serverRes) => {
        console.log(serverRes.data);
        // find where it's saving as a key, "Product", with value of array of objects
        setTitle(serverRes.data.Product.title);
        setPrice(serverRes.data.Product.price);
        setDescription(serverRes.data.Product.description);
      })
      .catch((serverErr) => console.log(serverErr));
  }, [id]);

  return (
    <div>
      <h1>{title}</h1>
      <p>{price}</p>
      <p>{description}</p>
    </div>
  );
};

export default SingleProduct;
