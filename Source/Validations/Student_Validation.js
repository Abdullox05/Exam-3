const Joi = require("joi");

async function Student_Validation (payload) {
  const schema = Joi.object({
    first_name: Joi.string().trim().pattern(/^[a-zA-Z]*$/).max(32).required(),
    last_name: Joi.string().trim().pattern(/^[a-zA-Z]*$/).max(32).required(),
    user_name: Joi.string().trim().pattern(/^[a-zA-Z0-9, ,_,-]*$/).max(64).required(),
    password: Joi.string().trim().max(64).required(),
  });
  
  const {error} = schema.validate(payload);

  if (error) return error;

  return false;
};

module.exports = Student_Validation;
