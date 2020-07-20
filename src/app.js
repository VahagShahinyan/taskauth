const express = require('express')
const router = require('./routes/root.route')
const bodyParser = require('body-parser');
const database = require('./config/database');
const config = require('./config/config');

database.sync()

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use((error,req,res)=>{
    const status=error.statusCode || 500;
    const message= error.message;
    res.status(status).json({message:message})
});

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))