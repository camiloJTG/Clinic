const petController = {};
const mysqlConnection = require('../database/mysqlConnection');

petController.addView = (req, res) =>
{
    mysqlConnection.query('SELECT * FROM clients', (err,result,fields)=>
    {
        if(!err)
        {
            const clients = result;
            
            mysqlConnection.query('SELECT * FROM type_animal', (err,resultA,fields)=>
            {
                if(!err)
                {
                    const animal = resultA;
                    res.render('pet/add', {clients,animal});
                }else 
                {
                    console.log(err);
                }
            });
        }else 
        {
            console.log(err);
        }
    });
}

petController.add = (req, res) =>
{
    const data = req.body;

    mysqlConnection.query('INSERT INTO pet SET ?', [data], (err,result,fields)=>
    {
        if(!err)
        {
            res.redirect('/pets/list');
        }else 
        {
            console.log(err);
        };
    })
};

petController.list = (req,res) =>
{
    mysqlConnection.query('SELECT * FROM pet p join clients cli on (p.id_clients = cli.id_clients) join type_animal ti on (p.id_type_animal = ti.id_type_animal)', (err, result, fields)=>
    {
        if(!err)
        {
            res.render('pet/list', {data: result});
        }else 
        {
            console.log(err);
        }
    })
};

petController.delete = (req,res)=>
{
    const {id} = req.params; 

    mysqlConnection.query('DELETE FROM pet WHERE id_pet = ?', [id], (err,result,fields)=>
    {
        if(!err)
        {
            res.redirect('/pets/list');
        }else 
        {
            console.log(err);
        }

    });
};

petController.idEdit = (req,res) =>
{
    const {id} = req.params; 

    mysqlConnection.query('SELECT * FROM pet p join clients cli on (p.id_clients = cli.id_clients) join type_animal ti on (p.id_type_animal = ti.id_type_animal) WHERE p.id_pet = ?', [id], (err,dataPet,fields)=>
    {
        if(!err)
        {
            const pet = dataPet[0];
            mysqlConnection.query('SELECT * FROM clients', (err, dataClients, fields)=>
            {
                if(!err)
                {
                    const client = dataClients;
                    mysqlConnection.query('SELECT * FROM type_animal', (err, dataTypeAnimal, fields)=>
                    {
                        if(!err)
                        {
                            const animal = dataTypeAnimal;
                            res.render('pet/edit', {pet,client,animal});
                        }else
                        {
                            console.log(err);
                        }
                    });
                }else 
                {
                    console.log(err);
                }
            });
            
        }else 
        {
            console.log(err);
        };
    });
}

petController.edit = (req,res)=>
{
    const {id} = req.params;
    const data = req.body;

    mysqlConnection.query('UPDATE pet SET ? WHERE id_pet = ?', [data,id], (err,result,fields)=>
    {
        if(!err)
        {
            res.redirect('/pets/list');
        }else 
        {
            console.log(err);
        }
    });
};

module.exports = petController;