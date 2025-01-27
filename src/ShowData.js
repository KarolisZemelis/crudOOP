import Request from './Request.js'

class ShowData extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.list = document.querySelector('[data-list-bin]');
        this.MainObject = MainObject
        this.list.addEventListener('click', (event) => {
            this.editModal = document.querySelector('[data-modal="edit"]')
            if (event.target.matches('[data-type="edit"]')) {
                this.editModal.style.display = 'block'

                const parent = event.target.parentElement; // Get the parent <li>
                const recipeId = parent.id;

                this.getElementFromDb(recipeId, this.MainObject, this.editModal)


                this.editModal.querySelector('[data-type="cancel"]')
                    .addEventListener('click', _ => {
                        this.editModal.style.display = 'none'
                    })
                this.editModal.querySelector('[data-type="close"]')
                    .addEventListener('click', _ => {
                        this.editModal.style.display = 'none'
                    })

            }
        });
        this.getFromDb()
    }

    renderData(response) {
        this.list.innerHTML = ''
        const responseData = response.data.result
        responseData.forEach(element => {
            const listItem = document.createElement('li');
            listItem.setAttribute('id', `${element.id}`)
            listItem.innerHTML = `
            <div data-list-name>Name: ${element.recipe_name}</div>
            <div data-list-type>Type: ${element.type_name}</div>
            <div data-list-calories>Calories: ${element.calories}</div>
            <button class="btn btn-primary" data-type="edit">Edit</button>
            <button class="btn btn-primary" data-type="delete">Delete</button>
            `;
            this.list.appendChild(listItem);
        });
    }




}



export default ShowData;
