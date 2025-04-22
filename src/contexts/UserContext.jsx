import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (location.pathname === "/home") {
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/userData", {
            method: "GET",
          });
          const result = await response.json();
          if (response.ok) {
            setUser(result);
            return;
          }
          navigateTo("/");
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  }, [location.pathname, location.search]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
