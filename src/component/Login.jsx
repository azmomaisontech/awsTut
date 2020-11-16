import React, { useState, useEffect } from "react";

const Login = ({ handleLogin, isAuthenticated, location, history }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(from);
    }

    //eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <main id="login">
      <div className="form-container">
        <form className="form" onSubmit={(e) => handleLogin(e, username, password)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={handleChange} value={username} name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} value={password} name="password" />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
