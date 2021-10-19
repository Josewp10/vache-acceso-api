require('dotenv').config();

module.exports={
    SERVER:{
        port:3001
    },
    DB:{
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB,
        password: process.env.DB_PASSWORD,
        ssl: { rejectUnauthorized: false },
        port: process.env.DB_PORT
    }
}