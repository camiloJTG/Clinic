const express = require('express');
const path = require('path');
const app = express();

//settings
    app.set('port', process.env.PORT || 3000);

//middleware
    app.use(express.json());
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

//routes
    app.use(require('./router/client'));

//static fields

//starting the server
    app.listen(app.get('port'), () =>
    {
        console.log('server on port ' + app.get('port'));
    });