const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');


const URL = 'http://localhost:3000/';
const URL_API = 'http://localhost:3000/api/';

app.use(express.static('public'));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recipes'
});


const loadHtml = page => {
    let pageHtml = fs.readFileSync(`./html/${page}.html`, 'utf8');

    pageHtml = pageHtml.replaceAll('{{URL}}', URL);
    pageHtml = pageHtml.replaceAll('{{URL_API}}', URL_API);

    return pageHtml;
}


app.get('/', (req, res) => {
    res.send(loadHtml('recipes'));
});

app.get('/api/recipe', (req, res) => {
    const sql = `
    SELECT * FROM recipe
    `
    con.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({
            result
        });
    });
})

app.post('/api/recipe', (req, res) => {
    const sql = `
    INSERT INTO recipe
    (recipe_name, calories)
    VALUES(?, ?)
    `
    con.query(sql, [req.body.recipe_name, req.body.calories], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send({
            success: true,
            id: result.insertId
        });
    })

})

con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});

// Start server

const port = 3000;
app.listen(port, () => {
    console.log(`Serveris shopping list APP pasiruošęs ir laukia ant ${port} porto!`);
});