typeAnimalController = {}; 
const mysqlConnection = require('../database/mysqlConnection');
 
typeAnimalController.list = (req,res)=>
{
    mysqlConnection.query('SELECT * FROM type_animal', (err,result,fields)=>
    {
        if(!err)
        {
            res.render('typeAnimal/list', {data:result});
        }else 
        {
            console.log(err);
        }
    });
};

typeAnimalController.addView = (req,res) =>
{
    res.render('typeAnimal/add');
};

typeAnimalController.add = (req, res) =>
{
    const data = req.body;
    
    mysqlConnection.query('INSERT INTO type_animal SET ?', [data], (err,result,fields)=>
    {
        if(!err)
        {
            res.redirect('/typeAnimal/list');
        }else 
        {
            console.log(err);
        }
    });
}

typeAnimalController.delete = (req,res) =>
{
    const {id} = req.params;

    mysqlConnection.query('DELETE FROM pet WHERE id_type_animal = ?', [id], (err,result,fields)=>
    {
        if(!err)
        {
            mysqlConnection.query('DELETE FROM type_animal WHERE id_type_animal = ?', [id], (err,result,fields)=>
            {
                if(!err)
                {
                    res.redirect('/typeAnimal/list');
                }else
                {
                    console.log(err);
                };
            });
        }else 
        {
            console.log(err);
        };
    });
};

typeAnimalController.editView = (req,res)=>
{
    const {id} = req.params;

    mysqlConnection.query('SELECT * FROM type_animal WHERE id_type_animal = ?', [id], (err,result,fields)=>
    {
        if(!err)
        {
            res.render('typeAnimal/edit', {data: result[0]});
        }else 
        {
            console.log(err);
        }
    });
};

typeAnimalController.edit = (req,res)=>
{
    const {id} = req.params;
    const data = req.body;

    mysqlConnection.query('UPDATE type_animal SET ? WHERE id_type_animal = ? ', [data,id], (err,result,fields)=>
    {
        if(!err)
        {   
            res.redirect('/typeAnimal/list');
        }else 
        {
            console.log(err);
        }
    });
};

module.exports = typeAnimalController;