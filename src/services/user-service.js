const Joi = require("joi")
const createCrudService = require("../services/crud-service")

const schema = Joi.object({
  email: Joi.string().min(1).max(50).trim(),
  password: Joi.string().min(1).max(500).trim(),
  token: Joi.string().min(1).max(500).trim(),
})

const UserService = createCrudService({Collection:'User', schema});

module.exports = UserService;
