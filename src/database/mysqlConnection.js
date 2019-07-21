const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "camilo",
    password: "root",
    database: "clinic"
});

connection.connect( (err) =>
{
    if(!err)
    {
        console.log('conected database')
    }else 
    {
        console.log(err);
    }
});

module.exports = connection;