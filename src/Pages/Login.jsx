import { useState, useEffect } from "react";
import React from "react";
import { login } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import "../Styles/login.css";
import { useToast, CircularProgress } from "@chakra-ui/react";
import { useNavigate, Link, useLocation } from "react-router-dom";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };
    fetch("https://blog-backend-3osk.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        if (res.msg === "wrong Password") {
          toast({
            position: "top",
            title: "Wrong Password",
            description: "Please Enter Correct Password",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else if (res.msg === "User Not Found") {
          toast({
            position: "top",
            title: "User Not Found",
            description: "Please Register",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setIsLoading(true);
          toast({
            position: "top",
            title: "Login Successfully",
            description: "Welcome to yourway.com",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          dispatch(login(res.name));
          localStorage.setItem("token", res.token);
          localStorage.setItem("userName", res.name);
          setemail("");
          setPassword("");
          navigate(location.state ? location.state : "/", { replace: true });
        }
      })
      .catch((err) => {
        console.log("error-", err);
      });
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {!isLoading && (
          <button type="submit" className="login-button">
            Log In
          </button>
        )}
        {isLoading && <CircularProgress isIndeterminate color="blue.300" />}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </form>
    </div>
  );
};
export default Login;
