const { loginController } = require("../controller/loginController");

let router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to MAZE API",
  });
});

// Login Route
router.post("/login", loginController);



module.exports = router;
