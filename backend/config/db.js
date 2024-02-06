const {Pool} = require('pg')
require('dotenv').config();


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});


/* const getDate = async () => {
  const result = await pool.query("select NOW()");
  console.log(result.rows);
};

getDate(); */

module.exports = pool;