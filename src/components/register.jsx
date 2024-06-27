import { set } from "mongoose";
import { useState, useEffect } from "react";
import "../styles/register.css";
import { useRegister } from "../hooks/APIs";

function Register() {
  const [email, setEmail] = useState("alghost900020@gmail.com");
  const [username, setUsername] = useState("Ali_26");
  const [password, setPassowrd] = useState("Kh951357268");
  const [data, setData] = useState(null);
  const { dataStatus, error } = useRegister(data);
  document.title = "Register";
  const handleRegister = (e) => {
    e.preventDefault();
    const blog = { email, username, password };
    setData(blog);
  };
  return (
    <>
      <form className="register-form" onSubmit={(e) => handleRegister(e)}>
        <h2>Register Now and start planning </h2>
        <div className="register-form-input">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className={error && error.email ? "error-field" : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && error.email && (
            <small className="error email-error">{error.email}</small>
          )}
        </div>
        <div className="register-form-input">
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              className={error && error.username ? "error-field" : ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {error && error.username && (
            <small className="error username-error">{error.username}</small>
          )}
        </div>
        <div className="register-form-input">
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className={error && error.password ? "error-field" : ""}
              onChange={(e) => setPassowrd(e.target.value)}
            />
          </div>
          {error && error.password && (
            <small className="error password-error">{error.password}</small>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
