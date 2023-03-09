const Joi = require("joi");
const schemas = require("./schemas");

//validators
const credentialsValidator = (req, res, next) => {
  const { error } = schemas.credentialsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
const tokenValidator = (req, res, next) => {
  const { error } = schemas.tokenSchema.validate(req.headers.authorization);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
module.exports = { credentialsValidator, tokenValidator };
