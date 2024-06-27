import { useState, useEffect } from "react";
import "../styles/login.css";
import { useLogin } from "../hooks/APIs";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("alghost900020@gmail.com");
  const [password, setPassowrd] = useState("Kh9513572680");
  const [data, setData] = useState(null);
  const { dataStatus, error } = useLogin(data);
  document.title = "Login";
  const handleLogin = (e) => {
    e.preventDefault();
    const blog = { email, password };
    setData(blog);
  };
  useEffect(() => {
    if (dataStatus) {
      navigateTo("/home");
    }
  }, [dataStatus]);
  return (
    <>
      <form
        className="login-form"
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => handleLogin(e)}
      >
        <h2>Login</h2>
        <div children="login-form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className={error ? "error-field" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div children="login-form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className={error ? "error-field" : ""}
            onChange={(e) => setPassowrd(e.target.value)}
          />
        </div>
        {error && <small className="error">{error.error}</small>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
