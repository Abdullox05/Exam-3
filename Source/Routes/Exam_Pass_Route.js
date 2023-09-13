const Is_Admin = require("../Middlewares/Is_Admin");
const Is_Authorized = require("../Middlewares/Is_Authorized");
const {Check, Find_All, Find_One, Create, Remove} = require("../Controllers/Exam_Pass_Controller");

const router = require("express").Router();

router.put("/Exam_Pass/:id", Is_Admin, Check);
router.get("/Exam_Pass", Is_Admin, Find_All);
router.get("/Exam_Pass/:id", Is_Admin, Find_One);
router.post("/Exam_Pass", Is_Authorized, Create);
router.delete("/Exam_Pass/:id", Is_Authorized, Remove);

module.exports = router;
