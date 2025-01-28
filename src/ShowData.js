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
            listItem.innerHTML = `
            <div data-list-name>Name: ${element.recipe_name}</div>
            <div data-list-type>Type: ${element.type_name}</div>
            <div data-list-calories>Calories: ${element.calories}</div>
            <button class="btn btn-primary" data-type="edit">Edit</button>
            <button class="btn btn-primary" data-type="delete">Delete</button>
            `;
            this.list.appendChild(listItem);
        });
    }

}



export default ShowData;
