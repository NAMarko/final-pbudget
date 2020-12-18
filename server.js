const express = require('express');
const mysql = require('mysql');

const port = process.env.port || 3000;
const app = express();

var connection = mysql.createConnection({
    host : 'sql9.freemysqlhosting.net',
    user : 'sql9382951',
    password : 'VecSrsQeYQ',
    database : 'sql9382951'
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

app.get('/', async (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM budget', function (error, results, fields) {
        connection.end();
        if (error) throw error;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
