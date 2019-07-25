const express = require('express');
const path = require('path');
const exphdb = require('express-handlebars');
const app = express();

//settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphdb({
        defaultLayout: "main",
        layoutsDir: path.join(app.get('views'), 'layout'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: ".hbs",
    }));
    app.set('view engine', '.hbs');


//middleware
    app.use(express.json());   
    app.use(express.urlencoded({extended : false}));
    
//routes
    app.use('/clients', require('./router/client'));
    app.use('/pets', require('./router/pet'));
    app.use('/typeAnimal', require('./router/typeAnimal'));

//static fields
    app.use(express.static(path.join(__dirname, 'public')));

//starting the server
    app.listen(app.get('port'), () =>
    {
        console.log('server on port ' + app.get('port'));
    });