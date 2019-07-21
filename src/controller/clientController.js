clientConstroller = {};

const mysqlConnection = require('../database/mysqlConnection');

clientConstroller.list = (req, res) =>
{
    mysqlConnection.query('SELECT * FROM clients', (err,result,fields)=>
    {
        if(!err)
        {
            res.render('client/List', {data: result});
        }else 
        {
            console.log(err);
        };
    });
};

module.exports = clientConstroller;
