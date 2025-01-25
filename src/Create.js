import Request from './Request.js'

class Create extends Request {
    constructor(RequestObject) {
        super(RequestObject.page)
        this.page = RequestObject.page//it is not stored in parent object thus we store it here

        this.form = document.querySelector('[data-form=create]');

        this.form.querySelector('[data-type=submit]')
            .addEventListener('click', this.submitCreate.bind(this));
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
                data[input.name] = input.value;
            });

        return data;
    }
}



export default Create;