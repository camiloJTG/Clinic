clientConstroller = {};

const mysqlConnection = require('../database/mysqlConnection');

clientConstroller.list = async (req, res) =>
{
    try 
    {
        const data = await mysqlConnection.query('SELECT * FROM clients');
        res.render('client/List', {data:data});    
    } catch (e) 
    {
        console.log(e);
    }
};

clientConstroller.addView = (req, res)=>
{
    res.render('client/add');
}

clientConstroller.add = async (req,res) =>
{
    try 
    {
        const data = req.body;
        const addClient = await mysqlConnection.query('INSERT INTO clients SET ? ', [data]);
        res.redirect('/clients/list');    
    } catch (e) 
    {
        console.log(e)    
    }
};

clientConstroller.delete = async (req,res) =>
{
    try 
    {
        const {id} = req.params;
        await mysqlConnection.query('DELETE FROM pet WHERE id_clients = ?', [id]);
        await mysqlConnection.query('DELETE FROM clients WHERE id_clients = ?', [id]);
        res.redirect('/clients/list');
    } catch (e)
    {
        console.log(e);
    }
}

clientConstroller.editView = async (req, res)=>
{
    try 
    {
        const {id} = req.params;
        const data = await mysqlConnection.query('SELECT * FROM clients WHERE id_clients = ?', [id]);
        res.render('client/edit', {data: data[0]});   
    } catch (e)
    {
        console.log(e);
    }
};

clientConstroller.edit = async (req, res) =>
{
    try 
    {
        const {id} = req.params;
        const data = req.body;  
        await mysqlConnection.query('UPDATE clients SET ? WHERE id_clients = ?', [data,id]);
        res.redirect('/clients/list');
    } catch (e) 
    {
        console.log(e);
    }
};

module.exports = clientConstroller;
