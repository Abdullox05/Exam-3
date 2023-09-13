const Is_Admin = require("../Middlewares/Is_Admin");
const {Find_All, Find_One, Create, Update, Remove} = require("../Controllers/Group_Controller");

const router = require("express").Router();

router.get("/Group", Is_Admin, Find_All);
router.get("/Group/:id", Is_Admin, Find_One);
router.post("/Group", Is_Admin, Create);
router.put("/Group/:id", Is_Admin, Update);
router.delete("/Group/:id", Is_Admin, Remove);

module.exports = router;
