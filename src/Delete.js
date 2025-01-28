import Request from './Request.js'

class Delete extends Request {
    constructor(MainObject) {
        console.log('delete objekc')
        super(MainObject.page)
        this.MainObject = MainObject
        this.list = document.querySelector('[data-list-bin]')
        this.list.addEventListener('click', (event) => {

            if (event.target.matches('[data-type="delete"]')) {
                this.deleteModal = document.querySelector('[data-modal="delete"]')
                this.deleteModal.style.display = 'block'

                const parent = event.target.parentElement; // Get the parent element
                const recipeId = parent.id;
                const recipeName = parent.querySelector('[data-list-name]').textContent.split(' ')[1]

                const recipeNameDom = this.deleteModal.querySelector('[data-recipe-name]')

                recipeNameDom.innerHTML = recipeName
                this.deleteModal.querySelector('[data-type="cancel"]')
                    .addEventListener('click', _ => {
                        this.deleteModal.style.display = 'none'
                    })
                this.deleteModal.querySelector('[data-type="delete"]')
                    .addEventListener('click', _ => {
                        this.deleteModal.style.display = 'none'
                        this.deleteFromDb(recipeId)
                    })
            }
        });
    }

}

export default Delete;