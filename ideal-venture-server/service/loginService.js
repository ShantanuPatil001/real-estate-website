const { auth } = require("../config/firebaseConfig");

exports.loginService = async (user) => {
  console.log("loginService", user);
  let token = user.token;
  let authToken = null;
  // let authCookie = null;
  // const expiresIn = 60 * 60 * 24 * 5 * 1000;
  console.log("user", user);
  await auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      authToken = {
        login: true,
        user: decodedToken,
        token: token,
      };
    })
    .catch((error) => {
      authToken = {
        login: false,
        error: error,
      };
    });

  // await auth.createSessionCookie(token, { expiresIn: 3600 * 24 * 7 }).then(
  //   (sessionCookie) => {
  //     const options = { maxAge: expiresIn, httpOnly: true, secure: true };
  //     authCookie = {
  //       name: "session",
  //       value: sessionCookie,
  //       options: options,
  //     };
  //   },
  //   (error) => {
  //     authCookie = {
  //       login: false,
  //       error: error,
  //     };
  //   }
  // );

  return authToken;
};

exports.verifyFirebaseAuthTokenMiddleware = async (token) => {
  let authCookie = null;
  let authToken = null;
  await auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      authToken = {
        login: true,
        user: decodedToken,
      };
    })
    .catch((error) => {
      authToken = {
        login: false,
        user: null,
      };
    });
  return {
    isValid: authToken.login,
    user: authToken.user,
  };
};
