import Request from './Request.js'

class Edit extends Request {
  constructor(MainObject) {
    super(MainObject.page)
    this.MainObject = MainObject
    this.editModal = document.querySelector('[data-modal="edit"]')
    this.listenToEdit(this.recipeList)
    this.listenToEdit(this.ingredientList)

  }
  listenToSubmitEdit(table, elementId) {
    this.editModal.querySelector('[data-type="submit"]').onclick = (event) => {
      let editObject = {};
      editObject.table = table;
      editObject.id = elementId;
      const inputs = this.editModal.querySelectorAll("[name]");

      inputs.forEach(input => {

        editObject[input.name] = input.value;
      });

      this.editToDb(editObject, table, this.MainObject);
      this.editModal.style.display = 'none';
    };
  }


  listenToEdit(list) {
    list.addEventListener('click', (event) => {

      if (event.target.matches('[data-type="edit"]')) {
        this.editModal = document.querySelector('[data-modal="edit"]')
        this.editModal.style.display = 'block'

        const parent = event.target.parentElement;
        const elementId = parent.id;
        let table = list.dataset.hasOwnProperty('listIngredients') ? 'ingredient' : 'recipe'
        this.getElementFromDb(elementId, this.MainObject, table)

        this.editModal.querySelector('[data-type="cancel"]')
          .addEventListener('click', _ => {
            this.editModal.style.display = 'none'
          })
        this.editModal.querySelector('[data-type="close"]')
          .addEventListener('click', _ => {
            this.editModal.style.display = 'none'
          })
        this.listenToSubmitEdit(table, elementId)
      }

    });
  }

}

export default Edit;