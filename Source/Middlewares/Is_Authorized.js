const jwt = require("../Utils/JWT");
const Admins = require("../Models/Admin_Model");
const Students = require("../Models/Student_Model");

async function Is_Authorized (req, res, next) {
  const token = req.cookies.Token?.split(" ")[1] || req.cookies.Token;

  if (!token) return res.status(401).json({message: "Invalid Token"});

  jwt.verify(token, async (err, data) => {
    if (err) return res.status(401).json({message: "Invalid Token"});

    const admin = await Admins.findById(data.id).select("-__v");

    const student = await Students.findById(data.id).select("-__v");

    if (!admin && !student) return res.status(404).json({message: "Permission denied"});

    req.student = student;
    next();
  });
};

module.exports = Is_Authorized;
