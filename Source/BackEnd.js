const express = require("express");

const server = express();

require("./Start/Modules")(express, server);
require("./Start/Run")(server);
