const joi = require("joi");
const credentialsSchema = joi.object({
  email: joi.string().min(3).max(30).required(),
  password: joi.string().min(3).max(30).required(),
});
const tokenSchema = joi.string().required();
module.exports = { credentialsSchema, tokenSchema };
