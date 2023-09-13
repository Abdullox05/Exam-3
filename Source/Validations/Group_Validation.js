const Joi = require("joi");

async function Group_Validation (payload) {
  const schema = Joi.object({
    name: Joi.string().trim().pattern(/^[a-zA-Z0-9, ,_,-]*$/).max(64).required(),
  });
  
  const {error} = schema.validate(payload);

  if (error) return error;

  return false;
};

module.exports = Group_Validation;
