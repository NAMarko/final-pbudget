const express = require('express');
const mysql = require('mysql');
const port = 3000;

const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bodyParser  =require('body-parser');
const path = require('path');

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});


var connection = mysql.createConnection({
    host : 'sql9.freemysqlhosting.net',
    user : 'sql9382951',
    password : 'VecSrsQeYQ',
    database : 'sql9382951'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


var page="";
const secretKey = "my secret key";
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});

app.get('/api/signup', async (req, res) => {
    const {username, password} = res.body;
    connection.connect();
    connection.query('INSERT INTO user VALUES ("", ?, ?)', [username, password], function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json({success: true});
    });
}); 

app.get('/api/gbudget', async (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM budget', function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });
});

app.get('/api/login', async (req, res) => {
    const {username, password} = res.body;
    connection.connect();
    connection.query('INSERT INTO user VALUES ("", ?, ?)', [username, password], function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json({success: true});
    });
}); 

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
