import Request from './Request.js'

class ShowData extends Request {
    constructor(MainObject) {
        super(MainObject.page)

        this.MainObject = MainObject

        this.getFromDb()
    }

    renderData(response) {

        const responseData = response.data

        for (const [key, value] of Object.entries(responseData)) {
            if (key === 'recipes') {
                this.recipeList.innerHTML = ''
                let element = value[0]
                const listItem = document.createElement('li');
                listItem.setAttribute('id', `${element.id}`)

                for (let key in element) {
                    if (key !== 'id') {
                        const container = document.createElement('div');
                        container.dataset.list = key
                        container.textContent = `${key}: ${element[key]}`

                        listItem.appendChild(container)
                    }
                }
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit'
                editButton.classList.add('btn', 'btn-primary')
                editButton.dataset.type = 'edit'
                listItem.appendChild(editButton)
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete'
                deleteButton.classList.add('btn', 'btn-primary')
                deleteButton.dataset.type = 'delete'
                listItem.appendChild(deleteButton)
                this.recipeList.appendChild(listItem);
            } else {
                this.ingredientList.innerHTML = ''
                let element = value[0]
                const listItem = document.createElement('li');
                listItem.setAttribute('id', `${element.id}`)

                for (let key in element) {
                    if (key !== 'id') {
                        const container = document.createElement('div');
                        container.dataset.list = key
                        container.textContent = `${key}: ${element[key]}`

                        listItem.appendChild(container)
                    }
                }
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit'
                editButton.classList.add('btn', 'btn-primary')
                editButton.dataset.type = 'edit'
                listItem.appendChild(editButton)
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete'
                deleteButton.classList.add('btn', 'btn-primary')
                deleteButton.dataset.type = 'delete'
                listItem.appendChild(deleteButton)
                this.ingredientList.appendChild(listItem);
            }
        }

    }

    // responseData.forEach(element => {
    //     console.log(element)
    //     const listItem = document.createElement('li');
    //     listItem.setAttribute('id', `${element.id}`)

    //     for (let key in element) {
    //         if (key !== 'id') {
    //             const container = document.createElement('div');
    //             container.dataset.list = key
    //             container.textContent = `${key}: ${element[key]}`

    //             listItem.appendChild(container)
    //         }
    //     }
    //     const editButton = document.createElement('button');
    //     editButton.textContent = 'Edit'
    //     editButton.classList.add('btn', 'btn-primary')
    //     editButton.dataset.type = 'edit'
    //     listItem.appendChild(editButton)
    //     const deleteButton = document.createElement('button');
    //     deleteButton.textContent = 'Delete'
    //     deleteButton.classList.add('btn', 'btn-primary')
    //     deleteButton.dataset.type = 'delete'
    //     listItem.appendChild(deleteButton)
    //     this.list.appendChild(listItem);
    // });
}





export default ShowData;
