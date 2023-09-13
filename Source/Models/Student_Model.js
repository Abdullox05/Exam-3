const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    first_name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    last_name: {
    type: String,
    maxlength: 32,
    required: true,
    trim: true,
    },
    user_name: {
      type: String,
      maxlength: 64,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      maxlength: 64,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Student", schema);
