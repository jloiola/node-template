const { cleanEnv, str } = require("envalid");
require("dotenv").config();

module.exports = cleanEnv(process.env, {
  S3_BUCKET_CAREER_URL: str(),
  MYSQL_USER: str(),
  MYSQL_PASS: str(),
  MYSQL_HOST: str(),
  MYSQL_DB: str(),
});
