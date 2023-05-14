import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./views/Main";
import SingleProduct from "./components/SingleProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
}
export default App;
