import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login.jsx";
import "./styles/App.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/*"element={} /> */}
      </Routes>
    </>
  );
}

export default App;
