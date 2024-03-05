const { loginService } = require("../service/loginService.js");

exports.loginController = async (req, res) => {
  console.log("loginController");
  let user = req.body;
  console.log(user);
  let authResponse= await loginService(user);
  console.log(authResponse);
  if (authResponse.login) {
    req.session.user = authResponse.user;
    req.session.token = authResponse.token;
    res.status(200).json({
      message: "Login Successful",
    });

  } else {
    res.status(401).json({
      message: "Login Failed",
    });
  }
};
