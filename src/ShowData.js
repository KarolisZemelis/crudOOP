import Request from './Request.js'

class ShowData extends Request {
    constructor(MainObject) {
        super(MainObject.page)

        this.MainObject = MainObject

        this.recipeList = document.querySelector('[data-list-recipes]')
        this.ingredientList = document.querySelector('[data-list-ingredients]')

        this.editModal = document.querySelector('[data-modal="edit"]')
        this.modalBody = this.editModal.querySelector('[data-form-body]')

        this.recipeContainer = document.querySelector('.drop-container')
        this.ingredientContainer = document.querySelector('.drop-container-ingredients')

        this.recipeTemplate = document.querySelector('[data-recipeTemplate]')
        this.ingredientTemplate = document.querySelector('[data-ingredientTemplate]')
        this.recipeEditTemplate = document.querySelector('[data-recipeEditTemplate]')
        this.ingredientEditTemplate = document.querySelector('[data-ingredientEditTemplate]')

        this.getFromDb()

    }

    renderData(response) {
        const responseArray = response.data
        this.recipeList.innerHTML = ''
        this.ingredientList.innerHTML = ''
        for (const [key, value] of Object.entries(responseArray)) {
            if (key === 'recipes') {
                const recipesArray = Array.from(value)
                recipesArray.forEach(recipe => {
                    const itemClone = this.recipeTemplate.content.cloneNode(true);
                    const li = itemClone.querySelector('li')
                    li.setAttribute('data-itemid', `${recipe.id}`)
                    li.setAttribute('draggable', true)
                    itemClone.querySelector('[data-recipe-name]').textContent = recipe.recipe_name.toUpperCase()
                    itemClone.querySelector('[data-recipe-type]').textContent = recipe.type_name
                    itemClone.querySelector('[data-recipe-calories]').textContent = recipe.calories
                    this.recipeList.appendChild(itemClone)
                })
            } else {
                const ingredientsArray = Array.from(value)
                ingredientsArray.forEach(ingredient => {
                    const itemClone = this.ingredientTemplate.content.cloneNode(true);
                    const li = itemClone.querySelector('li')
                    li.setAttribute('data-itemid', `${ingredient.id}`)
                    li.setAttribute('draggable', true)
                    itemClone.querySelector('[data-ingredient-name]').textContent = ingredient.ingredient_name.toUpperCase()
                    itemClone.querySelector('[data-ingredient-type]').textContent = ingredient.type_name
                    this.ingredientList.appendChild(itemClone)
                })
            }
        }
    }
    renderModalData(response, table) {
        this.modalBody.innerHTML = ''
        const responseData = response.data.result[0]

        if (table === 'recipe') {
            const itemClone = this.recipeEditTemplate.content.cloneNode(true);
            const recipeName = itemClone.querySelector('[data-name]')
            recipeName.value = responseData.recipe_name
            const recipeId = responseData.id
            this.getSelectFromDb(table, this.MainObject, recipeId)
            const recipeCalories = itemClone.querySelector('[data-recipe-calories]')
            recipeCalories.value = responseData.calories
            this.modalBody.append(itemClone);
        } else {
            const itemClone = this.ingredientEditTemplate.content.cloneNode(true);
            const ingredientName = itemClone.querySelector('[data-name]')
            ingredientName.value = responseData.ingredient_name
            const ingredientId = responseData.id
            this.getSelectFromDb(table, this.MainObject, ingredientId)
            this.modalBody.append(itemClone);
        }



    }
    renderFormData(response, table) {

        const responseData = response.data.result[0]

        if (table === 'recipe') {
            const itemClone = this.recipeTemplate.content.cloneNode(true);
            const container = itemClone.querySelector('li')
            container.setAttribute('data-itemid', `${responseData.id}`)

            const recipeName = itemClone.querySelector('[data-recipe-name]')
            recipeName.innerHTML = responseData.recipe_name
            const recipeType = itemClone.querySelector('[data-recipe-type]')
            recipeType.innerHTML = responseData.type_name
            const recipeCalories = itemClone.querySelector('[data-recipe-calories]')
            recipeCalories.innerHTML = responseData.calories

            const btnContainerToRemove = itemClone.querySelector('[data-btncontainer]')
            btnContainerToRemove.remove()

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove'
            removeButton.classList.add('btn', 'btn-primary', 'remove-button')
            container.appendChild(removeButton);
            this.recipeContainer.append(itemClone);

            removeButton.addEventListener('click', () => {
                container.remove(); // Remove the parent <li> element when the button is clicked
                let obj = this.MainObject.FormRecipe.recipeToSave
                for (let key in obj) {
                    if (obj[key] === responseData.id) { // Remove keys where value is false
                        delete obj[key];
                    }
                }
            });
        } else {
            const itemClone = this.ingredientTemplate.content.cloneNode(true);
            const container = itemClone.querySelector('li')
            container.setAttribute('data-itemid', `${responseData.id}`)

            const ingredientName = itemClone.querySelector('[data-ingredient-name]')
            ingredientName.innerHTML = responseData.ingredient_name
            const ingredientType = itemClone.querySelector('[data-ingredient-type]')
            ingredientType.innerHTML = responseData.type_name
            const ingredientQuantity = itemClone.querySelector('input[name="quantity"]');
            ingredientQuantity.style.display = 'block';
            const btnContainerToRemove = itemClone.querySelector('[data-btncontainer]')
            btnContainerToRemove.remove()

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove'
            removeButton.classList.add('btn', 'btn-primary', 'remove-button')
            const rightContainer = itemClone.querySelector('.rightContainer')
            rightContainer.appendChild(removeButton);
            // this.ingredientContainer.append(itemClone);

            if (this.ingredientContainer.children.length > 0) {
                this.ingredientContainer.insertBefore(itemClone, this.ingredientContainer.children[0]);
            } else {
                this.ingredientContainer.appendChild(itemClone);
            }

            removeButton.addEventListener('click', () => {
                container.remove(); // Remove the parent <li> element when the button is clicked

            });
        }



    }
    renderSelectData(res, value) {
        const select = document.createElement('select');
        select.name = 'type_id';
        const options = res.data.result;
        options.forEach(typeElement => {
            const option = document.createElement('option');
            option.value = typeElement.id;
            option.textContent = typeElement.type_name;
            if (Number(option.value) === Number(value)) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        const inputLabel = document.createElement('label');
        inputLabel.classList.add('form-label');
        inputLabel.textContent = 'Tipas';
        const nameInput = this.modalBody.querySelector('[data-name]')
        nameInput.insertAdjacentElement('afterend', inputLabel);
        inputLabel.insertAdjacentElement('afterend', select);
    }
    renderEditButton(listItem, btnContainer) {

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit'
        editButton.classList.add('btn', 'btn-primary')
        editButton.dataset.type = 'edit'
        btnContainer.appendChild(editButton)
        listItem.appendChild(btnContainer)

    }
    renderDeleteButton(listItem, btnContainer) {

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('btn', 'btn-primary')
        deleteButton.dataset.type = 'delete'
        btnContainer.appendChild(deleteButton)
        listItem.appendChild(btnContainer)

    }
    renderSearchData(responseData) {
        const searchInput = document.querySelector('[data-search]')
        const filterByText = (data, text) => {
            const lowerText = text.toLowerCase();
            return {
                ...data, // Keep the original object structure
                recipes: data.recipes.filter(recipe => recipe.recipe_name.toLowerCase().includes(lowerText)),
                ingredients: data.ingredients.filter(ingredient => ingredient.ingredient_name.toLowerCase().includes(lowerText))
            };
        };

        let filteredData = responseData

        searchInput.addEventListener('input', _ => {
            this.recipeList.innerHTML = ''
            this.ingredientList.innerHTML = ''

            filteredData = filterByText(responseData.data, searchInput.value);

            for (const [key, value] of Object.entries(filteredData)) {
                if (key === 'recipes') {
                    const recipesArray = Array.from(value)
                    recipesArray.forEach(recipe => {
                        const itemClone = this.recipeTemplate.content.cloneNode(true);
                        const li = itemClone.querySelector('li')
                        li.setAttribute('data-itemid', `${recipe.id}`)
                        li.setAttribute('draggable', true)
                        itemClone.querySelector('[data-recipe-name]').textContent = recipe.recipe_name.toUpperCase()
                        itemClone.querySelector('[data-recipe-type]').textContent = recipe.type_name
                        itemClone.querySelector('[data-recipe-calories]').textContent = recipe.calories
                        this.recipeList.appendChild(itemClone)
                    })
                } else {
                    const ingredientsArray = Array.from(value)
                    ingredientsArray.forEach(ingredient => {
                        const itemClone = this.ingredientTemplate.content.cloneNode(true);
                        const li = itemClone.querySelector('li')
                        li.setAttribute('data-itemid', `${ingredient.id}`)
                        li.setAttribute('draggable', true)
                        itemClone.querySelector('[data-ingredient-name]').textContent = ingredient.ingredient_name.toUpperCase()
                        itemClone.querySelector('[data-ingredient-type]').textContent = ingredient.type_name
                        this.ingredientList.appendChild(itemClone)
                    })
                }
            }
        })

    }
}

export default ShowData;
