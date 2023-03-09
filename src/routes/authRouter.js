const authController = require("../controllers/authController");
const authRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

authRouter.post(
  "/register",
  authMiddleware.credentialsValidator,
  authController.register
);
authRouter.post(
  "/login",
  authMiddleware.credentialsValidator,
  authController.login
);
authRouter.post(
  "/validate",
  authMiddleware.tokenValidator,
  authController.validate
);

module.exports = authRouter;
