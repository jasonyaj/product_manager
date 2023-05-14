import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./views/Main";
import SingleProduct from "./components/SingleProduct";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* landing page */}
        <Route path="/" element={<Main />} />
        {/* view a single product */}
        <Route path="/product/:id" element={<SingleProduct />} />
        {/* edit a single product */}
        <Route path="/product/:id/edit" element={<Update />} />
      </Routes>
    </div>
  );
}
export default App;
