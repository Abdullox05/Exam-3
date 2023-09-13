const bcrypt = require("bcrypt");
const {isValidObjectId} = require("mongoose");

const Students = require("../Models/Student_Model");
const configuration = require("../../Configuration/Index");
const Custom_Error = require("../Utils/Custom-Error");
const Student_Validation = require("../Validations/Student_Validation");
const jwt = require("../Utils/JWT");

async function Log_In (req, res, next) {
  try {
    const {user_name, password} = req.body;

    const student = await Students.findOne({user_name}).select("-__v");

    if (!student) throw  new Custom_Error(404, "Student not found");

    if (!await bcrypt.compare(password, student.password)) throw new Custom_Error(400, "Wrong Password");

    const token = jwt.sign({id: student._id});

    res.cookie("Token", token, {maxAge: configuration.token_max_age});

    res.json({message: "Successfully Log-In", data: student, token: token});
  } catch (error) {
    next(error);
  }
};

async function User_Page (req, res, next) {
  try {
    if (!req.student) throw new Custom_Error(404, "Your page not found");

    res.json({message: "Successfully shown", data: req.student});
  } catch (error) {
    next(error);
  }
};

async function Find_All (req, res, next) {
  try {
    const students = await Students.find().select("-__v");
  
    const students_count = await Students.find().countDocuments();

    res.json({message: "Successfully shown", data: students, data_count: students_count});
  } catch (error) {
    next(error);
  }
};

async function Find_One (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const student = await Students.findById(id).select("-__v");
  
    res.json({message: "Successfully shown", data: student});
  } catch (error) {
    next(error);
  }
};

async function Create (req, res, next) {
  try {
    let {first_name, last_name, user_name, password} = req.body;

    const error = await Student_Validation({first_name, last_name, user_name, password});

    if (error) throw new Custom_Error(400, error.message);

    first_name = first_name.trim();

    last_name = last_name.trim();

    user_name = user_name.trim();

    password = password.trim();

    const student = await Students.findOne({user_name});

    if (student) throw  new Custom_Error(400, "This E-Mail has already been used");

    const data = await Students.create({
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      password: await bcrypt.hash(password, 12),
    });
    
    res.json({message: "Successfully created", data: data});
  } catch (error) {
    next(error);
  }
};

async function Update_Names (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const student = await Students.findById(id).select("-__v");

    let {
      first_name = student.first_name,
      last_name = student.last_name,
      user_name = student.user_name
    } = req.body;

    const error = await Student_Validation({
      first_name,
      last_name,
      user_name,
      password: student.password
    });

    if (error) throw new Custom_Error(400, error.message);

    first_name = first_name.trim();

    last_name = last_name.trim();

    user_name = user_name.trim();

    const data = await Students.findByIdAndUpdate(id, {first_name, last_name, user_name});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Update_Password (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const student = await Students.findById(id).select("-__v");

    let {old_password, new_password} = req.body;

    if (!old_password || !new_password) throw new Custom_Error(400, "You must enter old and new passwords");

    if (!await bcrypt.compare(old_password, student.password)) throw new Custom_Error(400, "Wrong Old Password");

    const error = await Student_Validation({
      first_name: student.first_name,
      last_name: student.last_name,
      user_name: student.user_name,
      password: new_password
    });

    if (error) throw new Custom_Error(400, error.message);

    new_password = new_password.trim();

    const data = await Students.findByIdAndUpdate(id, {password: await bcrypt.hash(new_password, 12)});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Remove (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const data = await Students.findByIdAndRemove(id);

    res.json({message: "Successfully removed", data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {Log_In, User_Page, Find_All, Find_One, Create, Update_Names, Update_Password, Remove};
