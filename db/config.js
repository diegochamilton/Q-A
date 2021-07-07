const Pool = require("pg").Pool;
const pool = new Pool({
  user: "diego",
  host: "localhost",
  database: "sdc_template",
  password: "password",
  port: 5432,
});

module.exports = pool;
