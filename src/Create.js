import Request from './Request.js'

class Create extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.page = MainObject.page//it is not stored in parent object thus we store it here
        this.MainObject = MainObject
        this.form = document.querySelector('[data-page="recipes"]');

        const addBtns = this.form.querySelectorAll('[data-type=submit]')

        addBtns.forEach((btn) => {
            btn.addEventListener('click', this.submitCreate.bind(this));
        })

    }

    submitCreate() {

        this.saveToDb(this.collectData())
        this.form.querySelectorAll('[name]')
            .forEach(input => {
                input.value = '';
            });
    }

    collectData() {
        const data = {};
        this.form.querySelectorAll('[name]')
            .forEach(input => {
                if (input.value !== "" && (input.name.includes('id') || input.name.includes('calories'))) {
                    data[input.name] = Number(input.value)

                } else if (input.value !== "") {
                    data[input.name] = input.value

                }
            });
        return data;
    }
}



export default Create;