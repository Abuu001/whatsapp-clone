const {Pool}=require('pg');
require('dotenv').config({path : "./dev.env"});


// const pool = new Pool({
//     user : process.env.PG_USER,
//     host:  process.env.PG_HOST,
//     database:  process.env.PG_DATABASE,
//     password:  process.env.PG_PASSWORD,
//     port:  process.env.PG_PORT
// })

//const devConfig=`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
const devConfig = `postgres://ojafszxdrsoysa:94114e55b616e5c6c481c40e77473b7d377659a1421f9d1ff2bd99d4d148a149@ec2-54-164-241-193.compute-1.amazonaws.com:5432/d84frempg8coe6`
const prodConfig = process.env.DATABASE_URL
const pool = new Pool({
    connectionString : process.env.NODE_ENV === "production" ? prodConfig : devConfig
});
 
module.exports =pool;