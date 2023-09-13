const admin_router = require("./Admin_Route");
const group_router = require("./Group_Route");
const student_router = require("./Student_Route");
const exam_router = require("./Exam_Route");
const groups_students_router = require("./Groups_Students_Route");
const exam_pass_router = require("./Exam_Pass_Route");

module.exports = [
  admin_router,
  group_router,
  student_router,
  exam_router,
  groups_students_router,
  exam_pass_router
];
