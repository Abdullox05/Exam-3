const {isValidObjectId} = require("mongoose");

const Groups = require("../Models/Group_Model");
const Custom_Error = require("../Utils/Custom-Error");
const Group_Validation = require("../Validations/Group_Validation");

async function Find_All (req, res, next) {
  try {
    const groups = await Groups.find().select("-__v");
  
    const groups_count = await Groups.find().countDocuments();

    res.json({message: "Successfully shown", data: groups, data_count: groups_count});
  } catch (error) {
    next(error);
  }
};

async function Find_One (req, res, next) {
  try {
    const {id} = req.params;

    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const group = await Groups.findById(id).select("-__v");
  
    res.json({message: "Successfully shown", data: group});
  } catch (error) {
    next(error);
  }
};

async function Create (req, res, next) {
  try {
    let {name} = req.body;

    const error = await Group_Validation({name});

    if (error) throw new Custom_Error(400, error.message);

    name = name.trim();

    const group = await Groups.findOne({name});

    if (group) throw  new Custom_Error(400, "This Name has already been used");

    const data = await Groups.create({name: name});
    
    res.json({message: "Successfully Created", data: data});
  } catch (error) {
    next(error);
  }
};

async function Update (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    let {name} = req.body;

    const error = await Group_Validation({name});

    if (error) throw new Custom_Error(400, error.message);

    name = name.trim();

    const data = await Groups.findByIdAndUpdate(id, {name});

    res.json({message: "Successfully updated", data: data});
  } catch (error) {
    next(error);
  }
};

async function Remove (req, res, next) {
  try {
    const {id} = req.params;
    
    if (!isValidObjectId(id)) throw new Custom_Error(400, "Wrong ID");

    const data = await Groups.findByIdAndRemove(id);

    res.json({message: "Successfully removed", data: data});
  } catch (error) {
    next(error);
  }
};

module.exports = {Find_All, Find_One, Create, Update, Remove};
