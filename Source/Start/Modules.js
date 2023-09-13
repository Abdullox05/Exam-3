const cors = require("cors");
const file_upload = require("express-fileupload");
const cookie = require("cookie-parser");

const routes = require("../Routes/Index");
const error_handler = require("../Middlewares/Error-Handler");

async function Modules (express, server) {
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({extended: true}));
  server.use(file_upload());
  server.use(cookie());

  server.use(express.static(process.cwd() + "/Uploads"));

  server.use("/API", routes);

  server.use(error_handler);
};

module.exports = Modules;
