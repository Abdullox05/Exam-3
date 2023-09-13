const {Schema, model} = require("mongoose");

const schema = new Schema(
  {
    exam_id: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
    },
    fine: {
      type: Number,
    },
    result: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Exam_Pass", schema);
