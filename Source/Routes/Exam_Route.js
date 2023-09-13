const Is_Admin = require("../Middlewares/Is_Admin");
const {Generate_Date, Find_All, Find_One, Create, Update, Remove} = require("../Controllers/Exam_Controller");

const router = require("express").Router();

router.post("/Exam/Generate_Date", Is_Admin, Generate_Date);
router.get("/Exam", Is_Admin, Find_All);
router.get("/Exam/:id", Is_Admin, Find_One);
router.post("/Exam", Is_Admin, Create);
router.put("/Exam/:id", Is_Admin, Update);
router.delete("/Exam/:id", Is_Admin, Remove);

module.exports = router;
