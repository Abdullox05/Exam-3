const Is_Admin = require("../Middlewares/Is_Admin");
const {
  Create_Default,
  Log_In,
  Find_All,
  Find_One,
  Create,
  Update_User_Name,
  Update_Password,
  Remove,
} = require("../Controllers/Admin_Controller");

const router = require("express").Router();

router.get("/Admin/Default", Create_Default);
router.post("/Admin/Log_In", Log_In);
router.get("/Admin/All", Is_Admin, Find_All);
router.get("/Admin/:id", Is_Admin, Find_One);
router.post("/Admin/Create", Is_Admin, Create);
router.put("/Admin/Update_User_Name/:id", Is_Admin, Update_User_Name);
router.put("/Admin/Update_Password/:id", Is_Admin, Update_Password);
router.delete("/Admin/:id", Is_Admin, Remove);

module.exports = router;
