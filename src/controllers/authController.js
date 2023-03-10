const authServices = require("../services/authServices");

const register = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const user = await authServices.register(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body.data;
  try {
    const token = await authServices.login(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validate = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const verifiedStatus = await authServices.validate(token);
    res.status(200).json(verifiedStatus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  validate,
};
