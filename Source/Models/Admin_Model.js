const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
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

module.exports = model("Admin", schema);
