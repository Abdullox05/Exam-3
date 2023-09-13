const bcrypt = require("bcrypt");
const {v4: uuid} = require("uuid");
const path = require("path");
const {isValidObjectId} = require("mongoose");

const Students = require("../Models/Student_Model");
const Exams = require("../Models/Exam_Model");
const Exams_Passes = require("../Models/Exam_Pass_Model");
const Custom_Error = require("../Utils/Custom-Error");

async function Check (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const exam_pass = await Exams_Passes.findById(id);

    if (!exam_pass) throw new Custom_Error(400, "Exam Pass not found");

    let {score} = req.body;
    
    if (isNaN(score) || score < 0 || score > 100)
      throw new Custom_Error(400, "Inalid score");

    if ((score - exam_pass.fine) < 0) {
      score = 0;
    }else {
      score -= exam_pass.fine; 
    }

    let result = true;

    if (score < 50) result = false;

    const data = await Exams_Passes.findByIdAndUpdate(id, {score, result});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Find_All (req, res, next) {
  try {
    const exams_passes = await Exams_Passes.find().select("-__v");
  
    const exams_passes_count = await Exams_Passes.find().countDocuments();

    res.json({message: "Successfully shown", data: exams_passes, data_count: exams_passes_count});
  } catch (error) {
    next(error);
  }
};

async function Find_One (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const exam_pass = await Exams_Passes.findById(id).select("-__v");
  
    res.json({message: "Successfully shown", data: exam_pass});
  } catch (error) {
    next(error);
  }
};

async function Create (req, res, next) {
  try {
    let {exam_id, student_id, password, answer} = req.body;

    if (!answer) answer = req.files?.answer;

    if (!isValidObjectId(exam_id)) throw new Custom_Error(400, "Wrong ID");

    if (!isValidObjectId(student_id)) throw new Custom_Error(400, "Wrong ID");

    const exam_pass = await Exams_Passes.findOne({exam_id, student_id});

    if (exam_pass) throw new Custom_Error(400, "You have already submitted the answer for this Exam");

    const exam = await Exams.findById(exam_id);

    if (!exam) throw new Custom_Error(400, "Exam not found");

    const student = await Students.findById(student_id);

    if (!student) throw new Custom_Error(400, "Student not found");

    if (!await bcrypt.compare(password, student.password)) throw new Custom_Error(400, "Wrong Password");

    let file = "";
    
    if (typeof answer !== "string") {
      file = uuid() + path.extname(answer.name);

      answer.mv(process.cwd() + "/uploads/" + file);
    };

    if (exam.start_time > new Date()) throw new Custom_Error(400, "Exam has not started yet");

    let difference = 0;

    if (exam.finish_time < new Date()) {
      difference = ((new Date() - exam.finish_time)/60000).toFixed();
    };

    if (difference % 5 !== 0) {
      while (difference % 5 !== 0 && difference > 0) {
        difference--;
      };
    };

    let data;

    if (file) {
      data = await Exams_Passes.create({
        exam_id,
        student_id,
        answer: file,
        fine: difference
      });
    }else {
      data = await Exams_Passes.create({
        exam_id,
        student_id,
        answer: answer,
        fine: difference
      });
    };

    res.json({message: "Successfully Created", data: data});
  } catch (error) {
    next(error);
  }
};

async function Remove (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const data = await Exams_Passes.findByIdAndRemove(id);

    res.json({message: "Successfully removed", data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {Check, Find_All, Find_One, Create, Remove};
