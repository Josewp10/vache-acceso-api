process.env.NODE_CONFIG_DIR = './src/config';

//Import dependencies
const express = require('express');
const cors = require('cors');
const config = require('config');

//Initialize express
const app = express();


app.use(express.json());
app.use(cors());

//Endpoint
app.get('/', (req,res) =>{
    res.send('API');
});

//routes
const login = require('../src/libs/login/routes/login');
app.use(login);

const signup = require('../src/libs/signup/routes/signup');
app.use(signup);
//Port
const port = config.get('SERVER.port');

//Levantamiento
 app.listen(port || 3000, () => {
    console.log(`Escuchando API en http://localhost:${port}`);
 });

 