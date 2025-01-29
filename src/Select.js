import Request from './Request.js'

class Select extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.MainObject = MainObject
    }


    renderSelect(res, editModal, key, value) {
        const select = document.createElement('select')
        select.name = key
        const options = res.data.result
        const modalBody = editModal.querySelector('[data-form-body]')
        options.forEach(typeElement => {
            const option = document.createElement('option')
            option.value = typeElement.id
            option.textContent = typeElement.type_name;
            if (Number(option.value) === Number(value)) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        const inputLabel = document.createElement('label');
        inputLabel.classList.add('form-label')
        inputLabel.textContent = 'Type'
        modalBody.appendChild(inputLabel)
        modalBody.appendChild(select)
    }

}


export default Select;