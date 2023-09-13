const Joi = require("joi");

async function Exam_Validation (payload) {
  const schema = Joi.object({
    start_time: Joi.date().iso().required(),
    finish_time: Joi.date().iso().required(),
  });
  
  const {error} = schema.validate(payload);

  if (error) return error;

  return false;
};

module.exports = Exam_Validation;
