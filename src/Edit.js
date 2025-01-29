import Request from './Request.js'

class Edit extends Request {
  constructor(MainObject) {
    super(MainObject.page)
    this.MainObject = MainObject
    this.modalBody = document.querySelector('[data-form-body]')
    this.listenToEdit(this.recipeList)
    this.listenToEdit(this.ingredientList)

  }

  renderModalData(response, editModal, table) {

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
        this.getSelectFromDb(table, this.MainObject, editModal, key, value)
      }
    }

    this.modalBody.append(container);
    console.log(editModal)
    editModal.querySelector('[data-type="submit"]').addEventListener('click', _ => {
      let editObject = {}

      const inputs = editModal.querySelectorAll("[name]");
      console.log(inputs)
      editModal.style.display = 'none'
    })
  }

  listenToEdit(list) {
    list.addEventListener('click', (event) => {
      if (list.dataset.hasOwnProperty('listIngredients')) { }
      if (event.target.matches('[data-type="edit"]')) {
        this.editModal = document.querySelector('[data-modal="edit"]')
        this.editModal.style.display = 'block'

        const parent = event.target.parentElement;
        const elementId = parent.id;
        let table = list.dataset.hasOwnProperty('listIngredients') ? 'ingredient' : 'recipe'
        this.getElementFromDb(elementId, this.MainObject, this.editModal, table)

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



}

export default Edit;