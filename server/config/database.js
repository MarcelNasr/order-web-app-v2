const dotenv = require('dotenv');
const mysql2 = require("mysql2/promise")
dotenv.config()
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

 connectSQL = async ()=>{
    try{
        await pool.getConnection()
        console.log("connected to sql")
    }catch(error){
        console.log(error)
    }
 }

 module.exports = {connectSQL, pool}