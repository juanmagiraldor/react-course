import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../API";

import Button from "./Button";

import { Wrapper } from "./Login.styles";

import { Context } from "../context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [_user, setUser] = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);

    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(
        requestToken,
        username,
        password
      );
      setUser({ sessionId: sessionId.session_id, username });
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <Wrapper>
      {error && <div className="error">Something went wrong...</div>}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleInput}
      />

      <input
        type="password"
        value={password}
        name="password"
        onChange={handleInput}
      />

      <Button text="Login" callback={handleSubmit} />
    </Wrapper>
  );
};

export default Login;
