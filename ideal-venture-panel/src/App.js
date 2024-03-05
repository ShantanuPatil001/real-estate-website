import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./Components/Login/Login";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "./Config/firebaseConfig.js";
import { useEffect, useState } from "react";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import FormFile from "./Components/AdminPanel/AddProperty/FormFile";
// const {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
// } = require("firebase/app-check");

function App() {
  const app = initializeApp(firebaseConfig);
  // initializeAppCheck(app, {
  //   provider: new ReCaptchaV3Provider("shantanupatil"),
  //   isTokenAutoRefreshEnabled: true,
  // });

  const [isLoggedIn, setsLoggedIn] = useState(sessionStorage.getItem("status"));

  useEffect(() => {
    const session = () => {
      if (sessionStorage.getItem("auth")) {
        setsLoggedIn(true);
      }
    };
    session();
    return () => {

    }
  }, [isLoggedIn]);
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };

  return (
    <div className="App">
      <Router basename={"/admin"}>
        <div>
          <Switch>
            <PrivateRoute exact path="/">
              <AdminPanel />
            </PrivateRoute>
            <PrivateRoute exact path="/add">
              <FormFile />
            </PrivateRoute>
            <PrivateRoute exact path="/edit">
              <FormFile />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="*">
              <br />
              <center>
                <h1>404</h1>
              </center>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
