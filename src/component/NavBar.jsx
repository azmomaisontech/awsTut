import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ isAuthenticated, logoutUser }) => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <NavLink to="/">Compare Yourself </NavLink>
        </li>
        {!isAuthenticated ? (
          <Fragment>
            <li>
              <NavLink to="/login"> Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/signup"> Sign Up </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/login"> Compare</NavLink>
            </li>
            <li>
              <button className="btn btn-danger" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
