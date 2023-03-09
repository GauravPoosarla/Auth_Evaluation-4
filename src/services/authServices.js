const db = require("../../database/models");
const authUtils = require("../utils/authUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (email, password) => {
  const userExists = await db.User.findOne({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const result = db.User.create({
    email,
    password: bcrypt.hashSync(password, 10),
  });
  return "User created successfully";
};

const login = async (email, password) => {
  const user = await db.User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = authUtils.generateToken(user.email);
  authUtils.putToken(token);
  return token;
};

const validate = async (token) => {
  const tokenExists = await authUtils.checkTokenExists(token);
  if (!tokenExists) {
    throw new Error("Invalid token"); // throw 401
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return decodedToken.username;
};

module.exports = {
  register,
  login,
  validate,
};
