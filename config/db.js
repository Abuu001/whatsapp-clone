const {Pool}=require('pg');
require('dotenv').config({path : "./dev.env"});


// const pool = new Pool({
//     user : process.env.PG_USER,
//     host:  process.env.PG_HOST,
//     database:  process.env.PG_DATABASE,
//     password:  process.env.PG_PASSWORD,
//     port:  process.env.PG_PORT
// })

const devConfig=`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
const prodConfig = process.env.DATABASE_URL
const pool = new Pool({
    connectionString : process.env.NODE_ENV !=='production' ?  devConfig : prodConfig
});
 
module.exports =pool;