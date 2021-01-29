const Joi = require("joi")
const createCrudService = require("../services/crud-service")

const schema = Joi.object({
  userId: Joi.string().min(1).max(50).trim(),
  description: Joi.string().min(1).max(500).trim(),
  title: Joi.string().min(1).max(100).trim(),
  startDate: Joi.date(),
  endDate: Joi.date(),
})

const EventService = createCrudService({Collection:'Event', schema});

module.exports = EventService;
