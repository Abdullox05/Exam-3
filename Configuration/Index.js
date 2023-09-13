require("dotenv/config");

const {env} = process;

const config = {
  port: env.PORT,
  db_url: env.DB_URL,
  jwt_secret_key: env.JWT_SECRET_KEY,
  token_exp: env.TOKEN_EXP,
  token_max_age: env.TOKEN_MAX_AGE,
  admin_user_name: env.ADMIN_USER_NAME,
  admin_password: env.ADMIN_PASSWORD,
};

module.exports = config;
