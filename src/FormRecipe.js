import Request from './Request.js'

class FormRecipe extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.MainObject = MainObject

        this.recipeDropContainer = document.querySelector('.drop-container');
        this.ingredientDropContainer = document.querySelector('.drop-container-ingredients');

        this.formRecipe()
        this.submitFormedRecipe()
        this.recipeToSave = { recipeId: '', ingredients: [] }


    }

    formRecipe() {
        //recipes
        document.querySelector('[data-list]').addEventListener('dragstart', (e) => {
            const item = e.target.closest('li[draggable="true"]');

            if (!item) return; // Ignore if not a valid draggable item

            // Extract data from the dynamically generated list item
            const data = {
                type: 'recipe',
                id: Number(item.dataset.itemid),
            };

            // Store the data in the drag event
            const jsonData = JSON.stringify(data);
            e.dataTransfer.setData('text/plain', jsonData);

            selectContainer('drop-container')
        });
        //ingredients
        document.querySelector('[data-list-ingredients]').addEventListener('dragstart', (e) => {
            const item = e.target.closest('li[draggable="true"]');
            if (!item) return; // Ignore if not a valid draggable item
            // Extract data from the dynamically generated list item
            const data = {
                type: 'ingredient',
                id: Number(item.dataset.itemid),
            };
            // Store the data in the drag event
            const jsonData = JSON.stringify(data);
            e.dataTransfer.setData('text/plain', jsonData);
            selectContainer('drop-container-ingredients')
        });
        // Enable drop functionality
        const selectContainer = (cont) => {

            const container = document.querySelector(`.${cont}`);

            container.addEventListener('dragover', (e) => {
                e.preventDefault(); // Required to allow dropping
            });

            container.ondrop = (e) => {
                e.preventDefault();
                // Retrieve dragged item data
                const dataString = e.dataTransfer.getData('text/plain');
                if (!dataString) {
                    console.error("No data received during drop.");
                    return;
                }

                try {
                    const data = JSON.parse(dataString);
                    if (cont === 'drop-container') {
                        if (data.type !== 'recipe') return;

                        const recipeId = data.id;
                        const table = data.type;
                        this.getElementFromDbForm(recipeId, this.MainObject, table, 'render')
                        this.recipeToSave.recipeId = data.id;
                    } else if (cont === 'drop-container-ingredients') {
                        if (data.type !== 'ingredient') return

                        const ingredientId = data.id;
                        const table = data.type;
                        this.getElementFromDbForm(ingredientId, this.MainObject, table, 'render')
                        const ingredientObj = { ingredientId: ingredientId, quantity: '' }
                        this.recipeToSave.ingredients.push(ingredientObj)

                    }

                } catch (error) {
                    console.error("Error parsing JSON data:", error);
                }
            };

        }
    }

    submitFormedRecipe() {
        const submitBtn = document.querySelector('[data-type="submitRecipe"]');
        submitBtn.addEventListener('click', _ => {
            this.recipeToSave.ingredients.forEach(ingredient => {
                const ingredientContainer = this.ingredientDropContainer.querySelector(`li[data-itemid="${ingredient.ingredientId}"]`);
                ingredient.quantity = ingredientContainer.querySelector('input').value
            })
            this.saveToRecipeTable(this.recipeToSave)
            this.recipeDropContainer.innerHTML = ''
            this.ingredientDropContainer.innerHTML = ''
        })


    }


}
export default FormRecipe;