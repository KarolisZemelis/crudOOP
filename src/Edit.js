import Request from './Request.js'

class Edit extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.editModal = document.querySelector('[data-modal="edit"]')
        this.list = document.querySelector('[data-list-bin]')




        this.list.addEventListener('click', (event) => {
            if (event.target.matches('[data-type="edit"]')) {
                const parent = event.target.parentElement; // Get the parent <li>
                const recipeId = parent.id;
                this.getElementFromDb(recipeId)
                this.editModal.style.display = 'block'

                this.editModal.querySelector('[data-type="cancel"]')
                    .addEventListener('click', _ => {
                        this.editModal.style.display = 'none'
                    })
                this.editModal.querySelector('[data-type="close"]')
                    .addEventListener('click', _ => {
                        this.editModal.style.display = 'none'
                    })

                const recipeNameDom = this.editModal.querySelector('[name="recipe_name"]');



            }
        });


    }
    renderData(response) {
        const modalBody = this.editModal.querySelector('[data-form-body]')
        const responseData = response.data.result
        responseData.forEach(element => {
            const item = document.createElement('div');

            item.innerHTML = `
          <div class="modal-body">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" name="recipe_name" value='${element.recipe_name}'/>
            <label class="form-label">Calories</label>
            <input type="number" class="form-control" name="calories" value='${element.calories}'/>
            <label class="form-label">Recipe type:</label>
            <select name="type_id">
            <option value="" ${!element.type_id ? 'selected' : ''}>--Please choose an option--</option>
            <option value="1" ${element.type_id === 1 ? 'selected' : ''}>Pusryčiai</option>
            <option value="2" ${element.type_id === 2 ? 'selected' : ''}>Pietūs</option>
            <option value="3" ${element.type_id === 3 ? 'selected' : ''}>Užkandis</option>
            <option value="4" ${element.type_id === 4 ? 'selected' : ''}>Vakarienė</option>
            </select>
          </div>
            `;
            modalBody.appendChild(item);
        });
    }
}

export default Edit;