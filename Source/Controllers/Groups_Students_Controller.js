const {isValidObjectId} = require("mongoose");

const Groups_Students = require("../Models/Groups_Students_Model");
const Groups = require("../Models/Group_Model");
const Students = require("../Models/Student_Model");
const Custom_Error = require("../Utils/Custom-Error");

async function Find_All (req, res, next) {
  try {
    const groups_students = await Groups_Students.find().select("-__v");
  
    const groups_students_count = await Groups_Students.find().countDocuments();

    res.json({message: "Successfully shown", data: groups_students, data_count: groups_students_count});
  } catch (error) {
    next(error);
  }
};

async function Find_One (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const group_student = await Groups_Students.findById(id).select("-__v");
  
    res.json({message: "Successfully shown", data: groups_student});
  } catch (error) {
    next(error);
  }
};

async function Create (req, res, next) {
  try {
    const {group_id, student_id} = req.body;

    if (!isValidObjectId(group_id)) throw new Custom_Error(400, "Wrong ID");

    if (!isValidObjectId(student_id)) throw new Custom_Error(400, "Wrong ID");

    const group = await Groups.findById(group_id);

    if (!group) throw  new Custom_Error(404, "Group not found");

    const student = await Students.findById(student_id);

    if (!student) throw  new Custom_Error(404, "Student not found");

    const group_student = await Groups_Students.findOne({group_id, student_id});

    if (group_student) throw new Custom_Error(400, "This Student is already in this Group");

    const data = await Groups_Students.create({group_id, student_id});
    
    res.json({message: "Successfully Created", data: data});
  } catch (error) {
    next(error);
  }
};

async function Update (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const group_student = Groups_Students.findById(id);
    
  const {
      group_id = group_student.group_id,
      student_id = group_student.student_id
    } = req.body;

    if (!isValidObjectId(group_id)) throw new Custom_Error(400, "Wrong ID");

    if (!isValidObjectId(student_id)) throw new Custom_Error(400, "Wrong ID");

    const group = await Groups.findById(group_id);

    if (!group) throw  new Custom_Error(404, "Group not found");

    const student = await Students.findById(student_id);

    if (!student) throw  new Custom_Error(404, "Student not found");

    const check_group_student = await Groups_Students.findOne({group_id, student_id});

    if (check_group_student) throw new Custom_Error(400, "This Student is already in this Group");

    const data = await Groups_Students.findByIdAndUpdate(id, {group_id, student_id});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Remove (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const data = await Groups_Students.findByIdAndRemove(id);

    res.json({message: "Successfully removed", data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {Find_All, Find_One, Create, Update, Remove};
