import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ProductForm = (props) => {
  const { products, setProducts } = props;
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // const [apiProducts, setApiProducts] = useState("");

  // get the data right away
  useEffect(() => {
    // make the call to the server
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        // ! always clog the server response
        console.log(" SERVER SUCCESS => ", res.data.Products);
        setProducts(res.data.Products); //will not work with setProducts, line 10, why???
      })
      .catch((err) => {
        console.log(" SERVER ERROR", err);
      });
  }, []);

  const createProduct = (e) => {
    e.preventDefault();

    const tempProductObj = {
      title,
      price,
      description,
    };

    // make a post to create a new product
    axios
      .post("http://localhost:8000/api/product", tempProductObj)
      .then((res) => {
        console.log(res);
        setTitle("");
        setPrice("");
        setDescription("");
        setProducts([...products, res.data]); //***shouldn't this be setProducts([...products, res.Products.data])
      })
      .catch((err) => console.log(err));
  };

  // function to delete the one
  const deleteMe = (productId) => {
    console.log("delete", productId);
    axios
      .delete("http://localhost:8000/api/product/" + productId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // function for button link to edit a single product
  const updateMe = (productId) => {
    nav(`/product/${productId}/edit`);
  };

  return (
    <div>
      <h1 className="m-4">Product Manager</h1>
      <Container className="mt-5">
        <Form onSubmit={createProduct}>
          <Form.Group>
            <Row>
              <Col className="d-flex justify-content-center">
                <p className="me-2">Title</p>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Col>
              <Col className="d-flex justify-content-center">
                <p className="me-2">Price</p>
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </Col>
              <Col className="d-flex justify-content-center">
                <p className="me-2">Description</p>
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Col>
              <div>
                <Button
                  className="mt-3"
                  variant="primary"
                  size="sm"
                  type="submit"
                >
                  Create
                </Button>
              </div>
            </Row>
          </Form.Group>
        </Form>
        <hr />
        {products.map((product) => {
          return (
            <div key={product._id}>
              <li className="mt-2">
                <Link to={`/product/${product._id}`} className="mx-2">
                  {product.title}
                </Link>
                <span className="mx-2">{product.price}</span>
                {product.description}
                <Button onClick={() => deleteMe(product._id)} className="mx-2">
                  Delete
                </Button>
                <Button onClick={() => updateMe(product._id)} className="mx-2">
                  Update
                </Button>
              </li>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default ProductForm;
