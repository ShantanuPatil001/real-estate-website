const {
  verifyFirebaseAuthTokenMiddleware,
} = require("../service/loginService");

// token bearer authentication middleware
exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (req.path === "/public/v1/list" || req.path === "/public/v1/info" || req.path === "/api" || req.path === "/public/v1/add-info") {
    next();
  }
  else if (req.path === "/api/login" && bearerHeader === undefined) {
    next();
  } else {
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      let authCheck = await verifyFirebaseAuthTokenMiddleware(bearerToken);

      if (authCheck.isValid) {
        next();
      } else {
        res.status(401).json({
          message: "Unauthorized",
        });
      }
    }
  }
};
