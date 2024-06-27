// Nav.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/nav.css";
function Nav() {
  const navigateTo = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleLogout = (e) => {
    e.preventDefault();

    fetch("/api/logout", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          navigateTo("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav>
      <div className="logo">TaskMaster</div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="" onClick={(e) => handleLogout(e)}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
