import Request from './Request.js'

class ShowData extends Request {
    constructor(MainObject) {
        super(MainObject.page)

        this.MainObject = MainObject
        this.editModal = document.querySelector('[data-modal="edit"]')
        this.modalBody = this.editModal.querySelector('[data-form-body]')

        this.getFromDb()

    }

    renderData(response) {

        const responseData = response.data

        for (const [key, value] of Object.entries(responseData)) {
            if (key === 'recipes') {
                this.recipeList.innerHTML = ''
                value.forEach(element => {
                    const listItem = document.createElement('li');
                    listItem.draggable = true;
                    listItem.setAttribute('id', `${element.id}`)
                    for (let key in element) {
                        if (!key.includes('id') && key.includes('recipe_name')) {
                            const container = document.createElement('div');
                            container.dataset.list = key
                            container.innerHTML = `<h5>${element[key]}</h5>`
                            listItem.appendChild(container)

                        } else if (!key.includes('id') && !key.includes('recipe_name')) {
                            const container = document.createElement('div');
                            container.dataset.list = key
                            container.textContent = `${key}: ${element[key]}`
                            listItem.appendChild(container)
                        }
                    }
                    const btnContainer = document.createElement('div');
                    this.renderEditButton(listItem, btnContainer)
                    this.renderDeleteButton(listItem, btnContainer)
                    this.recipeList.appendChild(listItem);
                });
            } else {
                this.ingredientList.innerHTML = ''

                value.forEach(element => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('ingredientListItem')
                    listItem.setAttribute('id', `${element.id}`)
                    for (let key in element) {
                        if (!key.includes('id')) {
                            const container = document.createElement('div');
                            container.dataset.list = key
                            container.innerHTML = `<h6>${element[key]}</h6>`
                            listItem.appendChild(container)
                        }
                    }
                    const btnContainer = document.createElement('div');
                    this.renderEditButton(listItem, btnContainer)
                    this.renderDeleteButton(listItem, btnContainer)
                    this.ingredientList.appendChild(listItem);
                });
            }
        }

        this.renderSearchData(responseData)
    }
    renderModalData(response, table) {

        this.modalBody.innerHTML = ''

        const responseData = response.data.result[0]
        const container = document.createElement('div');

        for (const [key, value] of Object.entries(responseData)) {

            if (!key.includes('id') && !key.includes('type_name')) {
                const inputLabel = document.createElement('label');
                inputLabel.classList.add('form-label')
                inputLabel.textContent = key
                const input = document.createElement('input');
                input.classList.add('form-label')
                input.name = key
                input.value = value
                container.appendChild(inputLabel)
                container.appendChild(input)
            } else if (key === 'type_id') {

                this.getSelectFromDb(table, this.MainObject, key, value)
            }
        }

        this.modalBody.append(container);


    }
    renderSelectData(res, key, value) {
        const select = document.createElement('select');
        select.name = key;
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
        inputLabel.textContent = 'Type';
        this.modalBody.appendChild(inputLabel);
        this.modalBody.appendChild(select);
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
            filteredData = filterByText(responseData, searchInput.value);
            for (const [key, value] of Object.entries(filteredData)) {
                if (key === 'recipes') {


                    value.forEach(element => {
                        const listItem = document.createElement('li');
                        listItem.setAttribute('id', `${element.id}`)
                        for (let key in element) {
                            if (!key.includes('id') && key.includes('recipe_name')) {
                                const container = document.createElement('div');
                                container.dataset.list = key
                                container.innerHTML = `<h5>${element[key]}</h5>`
                                listItem.appendChild(container)

                            } else if (!key.includes('id') && !key.includes('recipe_name')) {
                                const container = document.createElement('div');
                                container.dataset.list = key
                                container.textContent = `${key}: ${element[key]}`
                                listItem.appendChild(container)
                            }
                        }
                        const btnContainer = document.createElement('div');

                        this.renderEditButton(listItem, btnContainer)
                        this.renderDeleteButton(listItem, btnContainer)
                        this.recipeList.appendChild(listItem);
                    });
                } else {
                    this.ingredientList.innerHTML = ''

                    value.forEach(element => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('ingredientListItem')
                        listItem.setAttribute('id', `${element.id}`)
                        for (let key in element) {
                            if (!key.includes('id')) {
                                const container = document.createElement('div');
                                container.dataset.list = key
                                container.innerHTML = `<h6>${element[key]}</h6>`
                                listItem.appendChild(container)
                            }
                        }
                        const btnContainer = document.createElement('div');
                        this.renderEditButton(listItem, btnContainer)
                        this.renderDeleteButton(listItem, btnContainer)
                        this.ingredientList.appendChild(listItem);
                    });
                }
            }
        })

    }
}

export default ShowData;
