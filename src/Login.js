import React, { useState, useContext } from "react";
import { DataStoreContext } from "./contexts";
import { login } from "./auth";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("dtang@usc.edu");
  const [password, setPassword] = useState("password");
  const { setUser } = useContext(DataStoreContext);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user = await login({ email, password });
      setUser(user);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
