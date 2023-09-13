const {isValidObjectId} = require("mongoose");

const Exams = require("../Models/Exam_Model");
const Groups = require("../Models/Group_Model");
const Custom_Error = require("../Utils/Custom-Error");
const Exam_Validation = require("../Validations/Exam_Validation");

async function Generate_Date (req, res, next) {
  try {
    const {month, day, hour, minute} = req.body;

    if (
      isNaN(month) || 
      isNaN(day) || 
      isNaN(hour) || 
      isNaN(minute) || 
      month > 12 || 
      month < 1 || 
      day > 31 || 
      day < 1 || 
      hour > 23 || 
      minute > 59
    ) throw new Custom_Error(400, "Wrong dates");

    const date = new Date(
      new Date().getFullYear(),
      month,
      day,
      hour,
      minute
    );

    if(date < new Date()) throw new Custom_Error(400, "Wrong dates");

    res.json({message: "Date generated", data: date.toISOString()});
  } catch (error) {
    next(error);
  }
};

async function Find_All (req, res, next) {
  try {
    const exams = await Exams.find().select("-__v");
  
    const exams_count = await Exams.find().countDocuments();

    res.json({message: "Successfully shown", data: exams, data_count: exams_count});
  } catch (error) {
    next(error);
  }
};

async function Find_One (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const exam = await Exams.findById(id).select("-__v");
  
    res.json({message: "Successfully shown", data: exam});
  } catch (error) {
    next(error);
  }
};

async function Create (req, res, next) {
  try {
    const {group_id, start_time, finish_time} = req.body;

    if (!isValidObjectId(group_id)) throw new Custom_Error(400, "Wrong Group-ID");

    const group = await Groups.findById(group_id);

    if (!group) throw new Custom_Error(404, "Group not found");

    const error = await Exam_Validation({start_time, finish_time});

    if (error) throw new Custom_Error(400, error.message);

    const exam = await Exams.findOne({group_id, start_time});

    if (exam) throw  new Custom_Error(400, "At this Time this Group already has Exam");

    if (new Date(start_time) >= new Date(finish_time)) throw new Custom_Error(400, "Wrong dates");

    const data = await Exams.create({group_id, start_time, finish_time});
    
    res.json({message: "Successfully created", data: data});
  } catch (error) {
    next(error);
  }
};

async function Update (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const exam = await Exams.findById(id).select("-__v");

    const {
      group_id = exam.group_id,
      start_time = exam.start_time,
      finish_time = exam.finish_time
    } = req.body;

    if (!isValidObjectId(group_id)) throw new Custom_Error(400, "Wrong Group-ID");

    const group = await Groups.findById(group_id);

    if (!group) throw new Custom_Error(404, "Group not found");

    const error = await Exam_Validation({start_time, finish_time});

    if (error) throw new Custom_Error(400, error.message);

    if (new Date(start_time) >= new Date(finish_time)) throw new Custom_Error(400, "Wrong dates");

    const data = await Exams.findByIdAndUpdate(id, {group_id, start_time, finish_time});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Remove (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const data = await Exams.findByIdAndRemove(id);

    res.json({message: "Successfully removed", data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {Generate_Date, Find_All, Find_One, Create, Update, Remove};
