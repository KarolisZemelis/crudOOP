import Request from './Request.js'

class Edit extends Request {
  constructor(MainObject) {
    super(MainObject.page)
    this.MainObject = MainObject

    this.recipeList.addEventListener('click', (event) => {

      if (event.target.matches('[data-type="edit"]')) {
        this.editModal = document.querySelector('[data-modal="edit"]')
        this.editModal.style.display = 'block'

        const parent = event.target.parentElement; // Get the parent element
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
    this.ingredientList.addEventListener('click', (event) => {

      if (event.target.matches('[data-type="edit"]')) {
        this.editModal = document.querySelector('[data-modal="edit"]')
        this.editModal.style.display = 'block'

        const parent = event.target.parentElement; // Get the parent element
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
  }

  renderModalData(response, editModal) {

    const modalBody = editModal.querySelector('[data-form-body]')
    const responseData = response.data.result

    const item = document.createElement('div');
    modalBody.innerHTML = ''
    item.innerHTML = `
          
            <label class="form-label">Title</label>
            <input type="text" class="form-control" name="recipe_name" value='${responseData[0].recipe_name}'/>
            <label class="form-label">Calories</label>
            <input type="number" class="form-control" name="calories" value='${responseData[0].calories}'/>
            <label class="form-label">Recipe type:</label>
            <select name="type_id">
            <option value="" ${!responseData[0].type_id ? 'selected' : ''}>--Please choose an option--</option>
            <option value="1" ${responseData[0].type_id === 1 ? 'selected' : ''}>Pusryčiai</option>
            <option value="2" ${responseData[0].type_id === 2 ? 'selected' : ''}>Pietūs</option>
            <option value="3" ${responseData[0].type_id === 3 ? 'selected' : ''}>Užkandis</option>
            <option value="4" ${responseData[0].type_id === 4 ? 'selected' : ''}>Vakarienė</option>
            </select>
      
            `;

    modalBody.append(item);

    editModal.querySelector('[data-type="submit"]').addEventListener('click', _ => {
      let editObject = {}

      editObject.id = responseData[0].id
      editObject.recipe_name = editModal.querySelector(`[name="recipe_name"]`).value
      editObject.calories = Number(editModal.querySelector(`[name="calories"]`).value)
      editObject.type_id = Number(editModal.querySelector('select[name="type_id"]').value)

      this.editToDb(editObject)

      editModal.style.display = 'none'
    })
  }

}

export default Edit;