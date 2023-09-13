const jwt = require("jsonwebtoken");

const configuration = require("../../Configuration/Index");

const sign = (payload) => jwt.sign(payload, configuration.jwt_secret_key, {expiresIn: configuration.token_exp});

const verify = (payload, callback) => jwt.verify(payload, configuration.jwt_secret_key, callback);

module.exports = {sign, verify};
