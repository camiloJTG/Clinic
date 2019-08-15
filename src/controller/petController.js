const petController = {};

const mysqlConnection = require('../database/mysqlConnection');

petController.addView = async (req, res) =>
{
    try 
    {
        const clients = await mysqlConnection.query('SELECT * FROM clients');
        const animal = await mysqlConnection.query('SELECT * FROM type_animal');
        res.render('pet/add', {clients,animal});
    } catch (e) 
    {
        console.log(e);    
    }
}

petController.add = async (req, res) =>
{
    try 
    {
        const data = req.body;
        await mysqlConnection.query('INSERT INTO pet SET ?', [data]);    
        res.redirect('/pets/list');
    } catch (e)
    {
        console.log(e);    
    }
};

petController.list = async (req,res) =>
{
    try 
    {
        const listPet = await mysqlConnection.query('SELECT * FROM pet p join clients cli on (p.id_clients = cli.id_clients) join type_animal ti on (p.id_type_animal = ti.id_type_animal)');    
        res.render('pet/list', {data: listPet});
    } catch (e)
    {
        console.log(e);    
    }
};

petController.delete = async (req,res)=>
{
    try 
    {
        const {id} = req.params;
        await mysqlConnection.query('DELETE FROM pet WHERE id_pet = ?', [id]);
        res.redirect('/pets/list');
    } catch (e) 
    {
        console.log(e);    
    }
};

petController.idEdit = async (req,res) =>
{
    try 
    {
        const {id} = req.params;
        const petEdit = await mysqlConnection.query('SELECT * FROM pet p join clients cli on (p.id_clients = cli.id_clients) join type_animal ti on (p.id_type_animal = ti.id_type_animal) WHERE p.id_pet = ?', [id]);
        const client = await mysqlConnection.query('SELECT * FROM clients');
        const animal = await mysqlConnection.query('SELECT * FROM type_animal');
        const pet = petEdit[0];
        res.render('pet/edit', {pet,client,animal});
    } catch (e) 
    {
        console.log(e);
    }
}

petController.edit = async (req,res)=>
{
    try 
    {
        const {id} = req.params;
        const data = req.body;
        await mysqlConnection.query('UPDATE pet SET ? WHERE id_pet = ?', [data,id]);    
        res.redirect('/pets/list');
    } catch (e)
    {
        console.log(e);    
    }
};

module.exports = petController;