const Custom_Error = require("../Utils/Custom-Error");

/*async*/ function error_handler (err, req, res, next) {
  if (err instanceof Custom_Error) {
    return res.status(err.status).json({message: err.message});
  }

  res.status(500).json({message: "Internal Server Error"});
};

module.exports = error_handler;
