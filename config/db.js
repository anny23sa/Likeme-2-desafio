const {Pool} = require('pg')
require('dotenv').config();


const pool = new Pool({
    host:'localhost',
    user: 'postgres',
    password: '1234', //process.env.DB_PASSWORD ? process.env.DB_PASSWORD.toString() : '',
    database: 'likeme',
    port: 5432,
    allowExitOnIdle: true
});


//const getDate = async () => {
    //const result = await pool.query("select NOW()");
  //  console.log(result.rows);
//};

//getDate();

module.exports = pool;