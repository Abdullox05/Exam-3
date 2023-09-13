const bcrypt = require("bcrypt");
const {isValidObjectId} = require("mongoose");

const Admins = require("../Models/Admin_Model");
const configuration = require("../../Configuration/Index");
const Custom_Error = require("../Utils/Custom-Error");
const Admin_Validation = require("../Validations/Admin_Validation");
const jwt = require("../Utils/JWT");

async function Create_Default (req, res, next) {
  try {
    const default_admin = await Admins.findOne({user_name: configuration.admin_user_name});

    if (!default_admin) {
      const data = await Admins.create({
        user_name: configuration.admin_user_name,
        password: await bcrypt.hash(configuration.admin_password, 12),
      });

      return res.status(201).json({message: "Default Admin successfully created", data: data});
    };

    return res.json({message: "Default Admin already exists", data: default_admin});
  } catch (error) {
    next(error);
  }
};

async function Log_In (req, res, next) {
  try {
    const {user_name, password} = req.body;

    const admin = await Admins.findOne({user_name}).select("-__v");

    if (!admin) throw  new Custom_Error(404, "Admin not found");

    if (!await bcrypt.compare(password, admin.password)) throw new Custom_Error(400, "Wrong Password");

    const token = jwt.sign({id: admin._id});

    res.cookie("Token", token, {maxAge: configuration.token_max_age});

    res.json({message: "Successfully Log-In", data: admin, token: token});
  } catch (error) {
    next(error);
  }
};

async function Find_All (req, res, next) {
  try {
    const admins = await Admins.find().select("-__v");
  
    const admins_count = await Admins.find().countDocuments();

    res.json({message: "Successfully shown", data: admins, data_count: admins_count});
  } catch (error) {
    next(error);
  }
};

async function Find_One (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const admin = await Admins.findById(id).select("-__v");
  
    res.json({message: "Successfully shown", data: admin});
  } catch (error) {
    next(error);
  }
};

async function Create (req, res, next) {
  try {
    let {user_name, password} = req.body;

    const error = await Admin_Validation({user_name, password});

    if (error) throw new Custom_Error(400, error.message);

    user_name = user_name.trim();

    password = password.trim();

    const check = await Admins.findOne({user_name});

    if (check) throw  new Custom_Error(400, "This User-Name has already been used");

    const data = await Admins.create({
      user_name: user_name,
      password: await bcrypt.hash(password, 12),
    });

    const token = jwt.sign({id: data._id});

    res.cookie("Token", token, {maxAge: configuration.token_max_age});

    res.json({message: "Successfully created", data: data, token: token});
  } catch (error) {
    next(error);
  }
};

async function Update_User_Name (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const admin = await Admins.findById(id).select("-__v");

    let {user_name} = req.body;

    const error = await Admin_Validation({user_name, password: admin.password});

    if (error) throw new Custom_Error(400, error.message);

    user_name = user_name.trim();

    const data = await Admins.findByIdAndUpdate(id, {user_name});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Update_Password (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const admin = await Admins.findById(id).select("-__v");

    let {old_password, new_password} = req.body;

    if (!old_password || !new_password) throw new Custom_Error(400, "You must enter old and new passwords");

    if (!await bcrypt.compare(old_password, admin.password)) throw new Custom_Error(400, "Wrong Old Password");

    const error = await Admin_Validation({user_name: admin.user_name, password: new_password});

    if (error) throw new Custom_Error(400, error.message);

    new_password = new_password.trim();

    const data = await Admins.findByIdAndUpdate(id, {password: await bcrypt.hash(new_password, 12)});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Remove (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const data = await Admins.findByIdAndRemove(id);

    res.json({message: "Successfully removed", data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Create_Default,
  Log_In,
  Find_All,
  Find_One,
  Create,
  Update_User_Name,
  Update_Password,
  Remove,
};
