const mysql = require('mysql');
const { promisify } = require('util'); // permite hacer uso de las promesas y tener acceso a los datos async/await

const connection = mysql.createPool({
    host: "localhost",
    user: "camilo",
    password: "root",
    database: "clinic"
});

connection.getConnection( (err) =>
{
    if(!err)
    {
        console.log('conected database')
    }else 
    {
        console.log(err);
    }
});

//permite utilizar promisify para lograr el usar de async/ await
connection.query = promisify(connection.query);

module.exports = connection;