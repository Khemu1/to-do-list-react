import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NotFound from "./components/404.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./components/Home.jsx";
import { UserProvider } from "./contexts/UserContext";

import "./styles/App.css";
function App() {
  return (
    <UserProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
