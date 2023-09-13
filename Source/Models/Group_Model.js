const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    name: {
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

module.exports = model("Group", schema);
