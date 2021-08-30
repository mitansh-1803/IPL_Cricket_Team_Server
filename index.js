const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./route/user');
const teams = require('./route/team');
const players = require('./route/player')

const port = process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

const password = process.env.password;
const database = 'edyodaDB';
const connectingString = `mongodb+srv://dbMitansh:${password}@cluster1.dkwws.mongodb.net/${database}?retryWrites=true&w=majority`;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(connectingString,options)
.then(()=> console.log('database connected!!'))
.catch(err => console.log(err));

app.use('/users',user);
app.use('/teams',teams);
app.use('/players',players);

app.listen(port,() => console.log(`Server Started at http://localhost:${port}`));