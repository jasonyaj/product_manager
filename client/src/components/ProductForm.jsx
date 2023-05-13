import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // make a post to creat a new product
    axios
      .post("http://localhost:8000/api/product", {
        title,
        price,
        description,
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setPrice("");
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="m-4">Product Manager</h1>
      <Container className="mt-5">
        <Form onSubmit={onSubmitHandler}>
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
      </Container>
    </div>
  );
};

export default ProductForm;
