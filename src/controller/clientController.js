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

clientConstroller.addView = (req, res)=>
{
    res.render('client/add');
}

clientConstroller.add = (req,res) =>
{
    const data = req.body;

    mysqlConnection.query('INSERT INTO clients SET ? ', [data], (err, result, fields)=>
    {
        if(!err)
        {
            res.redirect('/clients/list');
        }else 
        {
            console.log(err);
        };
    });
};

clientConstroller.delete = (req,res) =>
{
    const {id} = req.params; 

    mysqlConnection.query('DELETE FROM clients WHERE id_clients = ?', [id], (err, result, fields) =>
    {
        if(!err)
        {
            res.redirect('/clients/list');
        }else
        {
            console.log(err);
        }
    });
}

module.exports = clientConstroller;
