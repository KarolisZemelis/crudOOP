const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const URL = 'http://localhost:3000/';
const URL_API = 'http://localhost:3000/api/';

app.use(express.static('public'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

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

app.get('/plan', (req, res) => {
    res.send(loadHtml('plan'));
});

app.get('/api/recipe/', (req, res) => {

    const sql1 = `
    SELECT recipe.id, recipe.recipe_name, type.type_name,  recipe.type_id, recipe.calories
    FROM recipe
    INNER JOIN type ON recipe.type_id=type.id
    `
    const sql2 = `
    SELECT ingredient.id, ingredient.ingredient_name, ingredient_qty_type.type_name, ingredient.type_id
    FROM ingredient
    INNER JOIN ingredient_qty_type ON ingredient.type_id=ingredient_qty_type.id
    `;

    con.query(sql1, (err, result1) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        con.query(sql2, (err2, result2) => {
            if (err2) {
                res.status(500).send({ error: err2 });
                return;
            }
            res.status(200).send({
                recipes: result1,
                ingredients: result2
            });
        });
    })
})

app.get('/api/recipe/:id', (req, res) => {

    if (req.query.table === 'recipe') {
        const sql = `
                SELECT recipe.id, recipe.recipe_name, type.type_name, recipe.type_id, recipe.calories
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
    } else {
        const sql = `
                SELECT ingredient.id, ingredient.ingredient_name, ingredient_qty_type.type_name, ingredient.type_id
                FROM ingredient
                INNER JOIN ingredient_qty_type ON ingredient.type_id=ingredient_qty_type.id
                WHERE ingredient.id = ?
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
    }
})

app.get('/api/recipe/formRecipe/:id', (req, res) => {

    if (req.query.table === 'recipe') {
        const sql = `
                SELECT recipe.id, recipe.recipe_name, type.type_name, recipe.type_id, recipe.calories
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
    } else {
        const sql = `
                SELECT ingredient.id, ingredient.ingredient_name, ingredient_qty_type.type_name, ingredient.type_id
                FROM ingredient
                INNER JOIN ingredient_qty_type ON ingredient.type_id=ingredient_qty_type.id
                WHERE ingredient.id = ?
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
    }



})

app.get('/api/recipe/select/:type', (req, res) => {
    const type = req.params.type === 'ingredient' ? 'ingredient_qty_type' : 'type'

    const sql = `
    SELECT *
    FROM ${type}
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

app.post('/api/recipe', (req, res) => {
    if (req.body.hasOwnProperty('recipe_name')) {

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
    } else {

        const sql = `
    INSERT INTO ingredient
    (ingredient_name, type_id)
    VALUES(?, ?)
    `
        con.query(sql, [req.body.ingredient_name, req.body.type_id], (err, result) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(201).send({
                success: true,
                id: result.insertId
            });
        })
    }



})

app.post('/api/recipe/saveRecipe', (req, res) => {
    const recipeObject = req.body;

    let ingredientArray = recipeObject.ingredients.map(ingredient => ingredient.ingredientId);
    let formatedRecipe = [];

    // SQL query to get recipe details
    const sql1 = `
        SELECT recipe.recipe_name, type.type_name, recipe.type_id, recipe.calories
        FROM recipe
        INNER JOIN type ON recipe.type_id = type.id
        WHERE recipe.id = ?
    `;

    con.query(sql1, [recipeObject.recipeId], (err, recipeResult) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (recipeResult.length === 0) {
            res.status(404).send({ message: "Recipe not found" });
            return;
        }

        // SQL query to get ingredient details
        const sql2 = `
            SELECT ingredient.id, ingredient.ingredient_name, ingredient_qty_type.type_name, ingredient.type_id
            FROM ingredient
            INNER JOIN ingredient_qty_type ON ingredient.type_id = ingredient_qty_type.id
            WHERE ingredient.id IN (?)
        `;

        con.query(sql2, [ingredientArray], (err, ingredientResult) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (ingredientResult.length === 0) {
                res.status(404).send({ message: "Ingredient not found" });
                return;
            }

            // Process ingredients and format them
            ingredientResult.forEach(ingredient => {
                recipeObject.ingredients.forEach(ingredientFromApp => {
                    if (ingredientFromApp.ingredientId === ingredient.id) {
                        let ingredientObj = {
                            id: uuidv4(),
                            recipe_id: Number(recipeObject.recipeId),
                            ingredient_id: Number(ingredient.id),
                            ingredient_name: ingredient.ingredient_name,
                            ingredient_type: ingredient.type_name,
                            quantity: ingredientFromApp.quantity
                        };
                        formatedRecipe.push(ingredientObj);
                    }
                });
            });

            console.log("Formatted Recipe:", formatedRecipe);

            // If there is no formatted data, return
            if (formatedRecipe.length === 0) {
                res.status(400).send({ message: "No ingredients to insert" });
                return;
            }

            // Insert into database
            const sql3 = `
                INSERT INTO recipe_with_ingredients
                (id, recipe_id, ingredient_id, ingredient_name, ingredient_type, quantity)
                VALUES ?
            `;

            const values = formatedRecipe.map(row => [
                row.id,
                row.recipe_id,
                row.ingredient_id,
                row.ingredient_name,
                row.ingredient_type,
                row.quantity
            ]);

            con.query(sql3, [values], (err, result) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.status(201).send({ success: true, insertedRows: result.affectedRows });
                console.log("Inserted ingredients successfully!");
            });
        });
    });
});

app.put('/api/recipe/edit/:id', (req, res) => {
    const itemToSave = req.body;
    console.log(itemToSave)
    console.log(req.body)
    if (req.body.table === 'recipe') {
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
                    message: 'Recipe not found'
                });
                return;
            }

            res.send({

                success: true,
            });
        });
    } else {
        const sql = `
        UPDATE ingredient
        SET ingredient_name = ?, type_id = ?
        WHERE id = ?
        `;

        con.query(sql, [itemToSave.ingredient_name, itemToSave.type_id, req.params.id], (err, result) => {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).send({
                    success: false,
                    message: 'Ingredient not found'
                });
                return;
            }

            res.send({

                success: true,
            });
        });
    }


});

app.delete('/api/recipe/delete/:id', (req, res) => {
    const table = req.body.table === 'recipe' ? 'recipe' : 'ingredient'
    const sql = `
        DELETE FROM ${table}
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