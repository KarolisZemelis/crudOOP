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

//ROUTES
app.get('/', (req, res) => {
    res.send(loadHtml('recipes'));
});

app.get('/api/recipe/', (req, res) => {
    const sql = `
    SELECT recipe.id, recipe.recipe_name, type.type_name,  recipe.type_id, recipe.calories
    FROM recipe
    INNER JOIN type ON recipe.type_id=type.id
    `
    con.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send({
            result
        });
    });
})

app.get('/api/recipe/:id', (req, res) => {
    const sql = `
    SELECT recipe.id, recipe.recipe_name, type.type_name,  recipe.type_id, recipe.calories
    FROM recipe
    INNER JOIN type ON recipe.type_id=type.id
    WHERE recipe.id = ?
    `
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send({
            result
        });
    });
})

app.post('/api/recipe', (req, res) => {

    const sql = `
    INSERT INTO recipe
    (recipe_name, calories, type_id)
    VALUES(?, ?, ?)
    `
    con.query(sql, [req.body.recipe_name, req.body.calories, req.body.type_id], (err, result) => {
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

app.put('/api/recipe/edit/:id', (req, res) => {
    const itemToSave = req.body;

    const sql = `
    UPDATE recipe
    SET recipe_name = ?, calories = ?, type_id = ?
    WHERE id = ?
    `;

    con.query(sql, [itemToSave.recipe_name, itemToSave.calories, itemToSave.type_id, req.params.id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send({
                success: false,
                message: 'Game not found'
            });
            return;
        }

        res.send({

            success: true,
        });
    });

});

app.delete('/api/recipe/delete/:id', (req, res) => {
    const sql = `
        DELETE FROM recipe
        WHERE id = ?
    `;

    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send({
                success: false,
                message: 'Game not found'
            });
            return;
        }

        res.send({

            success: true,
        });
    });

});


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