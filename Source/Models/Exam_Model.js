const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    finish_time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Exam", schema);
