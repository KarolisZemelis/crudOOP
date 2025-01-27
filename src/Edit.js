import Request from './Request.js'

class Edit extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.list = document.querySelector('[data-list-bin]')

    }
    renderData(response, editModal) {
        const modalBody = editModal.querySelector('[data-form-body]')
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