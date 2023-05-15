import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Update = (props) => {
  const nav = useNavigate();

  // get the id from the :id in the route
  const { id } = useParams();

  // state vars for the input
  // const [_id, set_id] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // find that one obj from the DB aka READ ONE
  // make it execute right away
  useEffect(() => {
    // go to the server route, get the obj
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => {
        // put returned value in state to update
        // set_id(res.data.Product._id);
        setTitle(res.data.Product.title);
        setPrice(res.data.Product.price);
        setDescription(res.data.Product.description);
      })
      .catch((serverErr) => console.log(serverErr));
  }, [id]);

  // update form submit
  const updateProduct = (e) => {
    e.preventDefault();

    // create the object that mimics the MODEL
    const tempProductObj = {
      title,
      price,
      description,
    };
    // send it to the server
    axios
      .patch("http://localhost:8000/api/product/" + id, tempProductObj)
      .then((res) => {
        // ! always clog the server response
        console.log("✅", res.data);
        nav("/");
      })
      .catch((errRes) => {
        console.log("❌", errRes);
      });
  };

  // function to delete the one
  const deleteMe = (productId) => {
    console.log("delete", productId);
    axios
      .delete("http://localhost:8000/api/product/" + productId)
      .then((res) => {
        // console.log(res.data);
        nav("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1>Update {title}</h1>
      <Form onSubmit={updateProduct}>
        <Form.Group>
          <Row>
            <Col className="d-flex justify-content-center">
              <p className="me-2">Title</p>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="title"
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <p className="me-2">Price</p>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="price"
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <p className="me-2">Description</p>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="description"
              />
            </Col>
            <div>
              <Button
                className="mt-3"
                variant="primary"
                size="sm"
                type="submit"
              >
                Update
              </Button>
            </div>
          </Row>
        </Form.Group>
      </Form>
      <div>
        <Button onClick={() => deleteMe(id)} className="mt-2">
          {" "}
          Delete From Database
        </Button>
      </div>
    </Container>
  );
};

export default Update;
