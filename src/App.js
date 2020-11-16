import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import setAuthToken from "./util/setAuthToken";
import NavBar from "./component/NavBar";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import "./App.css";

const App = () => {
  const POOL_DATA = {
    UserPoolId: "",
    ClientId: "",
  };

  const URL = "/dev/compare-yourself";

  const userPool = new CognitoUserPool(POOL_DATA);

  const [initState, setInitState] = useState({
    isAuthenticated: false,
    user: null,
    token: "",
  });

  const { isAuthenticated, token } = initState;

  useEffect(() => {
    getUserFromLocalStorage();

    //eslint-disable-next-line
  }, []);

  const handleSignUp = async (e, userInfo) => {
    e.preventDefault();

    const attributeList = [];
    const emailAttribute = {
      Name: "email",
      Value: userInfo.email,
    };

    const firstNameAttribute = {
      Name: "given_name",
      Value: userInfo.firstname,
    };

    const lastNameAttribute = {
      Name: "family_name",
      Value: userInfo.lastname,
    };

    attributeList.push(new CognitoUserAttribute(emailAttribute));
    attributeList.push(new CognitoUserAttribute(firstNameAttribute));
    attributeList.push(new CognitoUserAttribute(lastNameAttribute));

    userPool.signUp(userInfo.username, userInfo.password, attributeList, null, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      const cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
    });
  };

  const confirmUser = (e, username, token) => {
    e.preventDefault();
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    console.log(username, token);
    cognitoUser.confirmRegistration(token, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
    });
  };

  const handleLogin = (e, username, password) => {
    e.preventDefault();
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setInitState({ ...initState, isAuthenticated: true });
      },

      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  const getUserFromLocalStorage = () => {
    const user = userPool.getCurrentUser();
    if (user != null) {
      user.getSession((err, session) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        } else if (session.isValid) {
          user.getUserAttributes((err, result) => {
            if (err) alert(err.message || JSON.stringify(err));
            setInitState({
              ...initState,
              isAuthenticated: true,
              token: session.getIdToken().getJwtToken(),
            });
          });
        }
      });
    }
  };

  const logoutUser = () => {
    userPool.getCurrentUser().signOut();
    setInitState({ ...initState, user: null, isAuthenticated: false });
  };

  const storeData = async (e, data) => {
    e.preventDefault();
    setAuthToken(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(URL, data, config);
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} handleLogin={handleLogin} isAuthenticated={isAuthenticated} />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <SignUp {...props} handleSignUp={handleSignUp} confirmUser={confirmUser} />}
        />
        <Route exact path="/" render={(props) => <Home {...props} token={token} storeData={storeData} />} />
      </Switch>
    </Router>
  );
};

export default App;
