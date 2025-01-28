import Request from './Request.js'

class ShowData extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.list = document.querySelector('[data-list-bin]');
        this.MainObject = MainObject

        this.getFromDb()
    }

    renderData(response) {
        this.list.innerHTML = ''
        const responseData = response.data.result

        responseData.forEach(element => {
            const listItem = document.createElement('li');
            listItem.setAttribute('id', `${element.id}`)

            for (let key in element) {
                if (key !== 'id') {
                    const container = document.createElement('div');
                    container.dataset.list = key
                    container.textContent = `${key}: ${element[key]}`

                    listItem.appendChild(container)
                }
            }
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit'
            editButton.classList.add('btn', 'btn-primary')
            editButton.dataset.type = 'edit'
            listItem.appendChild(editButton)
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete'
            deleteButton.classList.add('btn', 'btn-primary')
            deleteButton.dataset.type = 'delete'
            listItem.appendChild(deleteButton)
            this.list.appendChild(listItem);
        });
    }

}



export default ShowData;
