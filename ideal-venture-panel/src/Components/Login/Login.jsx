import { React, useState } from "react";
import { login } from "../../API/AllRequestResponse";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./auth.css";
import logo from "../../assets/logo.svg";
import { Button, Card, Form, Image } from "react-bootstrap";

const LoginPage = () => {
  if (localStorage.getItem("auth")) {
    window.location.href = "/admin";
  }
  const auth = getAuth();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    userNameError: "",
    passwordError: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeLoginForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmitLoginForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    let data = {
      username: loginForm.username,
      password: loginForm.password,
    };
    let userToken = null;
    await signInWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        userToken = userCredential.user.accessToken;
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          setError({
            ...error,
            passwordError: 'Wrong password.',
          });
        } else if (errorCode === "auth/user-not-found") {
          setError({
            ...error,
            userNameError: 'User not found.',
          });
        }
        setLoading(false);
          //console.log(errorCode, errorMessage);
      });
    await login(userToken)
      .then((res) => {
        //console.log(res);
        sessionStorage.setItem("auth", userToken);
        sessionStorage.setItem("status", true);
        sessionStorage.setItem("maintenance", false);
        window.location.href = "/admin";
      })
      .catch((err) => {
        alert("Oops! Try Again or Call Support");
      });
    
  };
  return (
    <div className="login-page">
      <div>
        <Image src={logo} id="logo" />
      </div>
      <Card id="LoginCard">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="username"
              placeholder="Enter email"
              value={loginForm.username}
              autoComplete="email"
              onChange={onChangeLoginForm}
              isInvalid={error.userNameError ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.userNameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={onChangeLoginForm}
              isInvalid={error.passwordError ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Button variant="primary" onClick={onSubmitLoginForm}>
            {loading ? ("Loading...") : ("Login")}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
