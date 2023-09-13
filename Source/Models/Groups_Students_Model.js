const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Groups_Students", schema);
