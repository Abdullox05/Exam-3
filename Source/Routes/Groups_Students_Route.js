const Is_Admin = require("../Middlewares/Is_Admin");
const {Find_All, Find_One, Create, Update, Remove} = require("../Controllers/Groups_Students_Controller");

const router = require("express").Router();

router.get("/Groups_Students", Is_Admin, Find_All);
router.get("/Groups_Students/:id", Is_Admin, Find_One);
router.post("/Groups_Students", Is_Admin, Create);
router.put("/Groups_Students/:id", Is_Admin, Update);
router.delete("/Groups_Students/:id", Is_Admin, Remove);

module.exports = router;
