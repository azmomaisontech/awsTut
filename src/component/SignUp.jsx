import React, { useState } from "react";

const SignUp = ({ handleSignUp, confirmUser }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    code: "",
  });

  const { username, firstname, lastname, email, password, cpassword, code } = user;

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <main id="signup">
      <div className="form-container">
        <form className="form" onSubmit={(e) => handleSignUp(e, user)}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" onChange={handleChange} value={firstname} name="firstname" />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" onChange={handleChange} value={lastname} name="lastname" />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={handleChange} value={username} name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">EMail</label>
            <input type="email" id="email" onChange={handleChange} value={email} name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} value={password} name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input type="password" id="confirmpassword" onChange={handleChange} value={cpassword} name="cpassword" />
          </div>
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </form>
        {!show ? (
          <button className="btn btn-secondary" onClick={handleShow}>
            Confirm User
          </button>
        ) : (
          <form className="form" onSubmit={(e) => confirmUser(e, username, code)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={handleChange} value={username} name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="code">Validation Code</label>
              <input type="text" id="code" onChange={handleChange} value={code} name="code" />
            </div>
            <button className="btn btn-primary" type="submit">
              Confirm Account
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default SignUp;
