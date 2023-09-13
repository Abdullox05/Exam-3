const Is_Admin = require("../Middlewares/Is_Admin");
const Is_Authorized = require("../Middlewares/Is_Authorized");
const {
  Log_In,
  User_Page,
  Find_All,
  Find_One,
  Create,
  Update_Names,
  Update_Password,
  Remove
} = require("../Controllers/Student_Controller");

const router = require("express").Router();

router.post("/Student/Log_In", Log_In);
router.get("/Student/Me", Is_Authorized, User_Page);
router.get("/Student/All", Is_Admin, Find_All);
router.get("/Student/:id", Is_Admin, Find_One);
router.post("/Student/Create", Is_Admin, Create);
router.put("/Student/Update_Names/:id", Is_Authorized, Update_Names);
router.put("/Student/Update_Password/:id", Is_Authorized, Update_Password);
router.delete("/Student/:id", Is_Admin, Remove);

module.exports = router;
