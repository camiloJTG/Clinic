typeAnimalController = {}; 

const mysqlConnection = require('../database/mysqlConnection');
 
typeAnimalController.list = async (req,res)=>
{
    try 
    {
        const dataTypeAnimal = await mysqlConnection.query('SELECT * FROM type_animal');
        res.render('typeAnimal/list', {data:dataTypeAnimal});
    } catch (e) 
    {
        console.log(e);    
    }
};

typeAnimalController.addView = (req,res) =>
{
    res.render('typeAnimal/add');
};

typeAnimalController.add = async (req, res) =>
{
    try 
    {
        const data = req.body;
        await mysqlConnection.query('INSERT INTO type_animal SET ?', [data]);
        res.redirect('/typeAnimal/list');
    } catch (e) 
    {
        console.log(e);    
    }
}

typeAnimalController.delete = async (req,res) =>
{
    try 
    {
        const {id} = req.params;
        await mysqlConnection.query('DELETE FROM pet WHERE id_type_animal = ?', [id]);
        await mysqlConnection.query('DELETE FROM type_animal WHERE id_type_animal = ?', [id]);
        res.redirect('/typeAnimal/list');
    } catch (e) 
    {
        console.log(e);   
    }
};

typeAnimalController.editView = async (req,res)=>
{
    try 
    {
        const {id} = req.params;
        const editTypeAnimal = await mysqlConnection.query('SELECT * FROM type_animal WHERE id_type_animal = ?', [id]);    
        res.render('typeAnimal/edit', {data: editTypeAnimal[0]});
    } catch (e)
    {
        console.log(e);    
    }
};

typeAnimalController.edit = async (req,res)=>
{
    try 
    {
        const {id} = req.params;
        const data = req.body;
        await mysqlConnection.query('UPDATE type_animal SET ? WHERE id_type_animal = ? ', [data,id]);   
        res.redirect('/typeAnimal/list');     
    } catch (e) 
    {
        console.log(e);    
    }
};

module.exports = typeAnimalController;