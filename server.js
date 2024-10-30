const express=require('express');
const app=express();
const db = require('./db');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); //data stored in req.body

const MenuItem = require('./models/menu');

app.get('/', function(req, res){
    res.send('Welcome to my hotel... How can i help you sir?')
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(2000, ()=>{
    console.log('listening on port 2000')
});

