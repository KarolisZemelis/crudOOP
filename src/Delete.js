import Request from './Request.js'

class Delete extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.MainObject = MainObject

        this.recipeList.addEventListener('click', (event) => {

            if (event.target.matches('[data-type="delete"]')) {
                this.deleteModal = document.querySelector('[data-modal="delete"]')
                this.deleteModal.style.display = 'block'


                const parent = event.target.parentElement;

                const elementName = parent.querySelector(':first-child').textContent;
                const elementNameDom = this.deleteModal.querySelector('[data-recipe-name]');
                elementNameDom.innerHTML = `<i><b>${elementName}</b></i>`;

                this.deleteModal.querySelector('[data-type="cancel"]')
                    .addEventListener('click', _ => {
                        this.deleteModal.style.display = 'none'
                    })

                this.deleteModal.querySelector('[data-type="delete"]').onclick = () => {
                    this.deleteModal.style.display = 'none';
                    const elementId = parent.id; // Get the current id
                    this.deleteFromDb(elementId, 'recipe');
                };
            }
        });
        this.ingredientList.addEventListener('click', (event) => {

            if (event.target.matches('[data-type="delete"]')) {
                this.deleteModal = document.querySelector('[data-modal="delete"]')
                this.deleteModal.style.display = 'block'


                const parent = event.target.parentElement;

                const elementName = parent.querySelector(':first-child').textContent;
                const elementNameDom = this.deleteModal.querySelector('[data-recipe-name]');
                elementNameDom.innerHTML = `<i><b>${elementName}</b></i>`;

                this.deleteModal.querySelector('[data-type="cancel"]')
                    .addEventListener('click', _ => {
                        this.deleteModal.style.display = 'none'
                    })

                this.deleteModal.querySelector('[data-type="delete"]').onclick = () => {
                    this.deleteModal.style.display = 'none';
                    const elementId = parent.id;
                    this.deleteFromDb(elementId, 'ingredient');
                };
            }
        });
    }

}

export default Delete;