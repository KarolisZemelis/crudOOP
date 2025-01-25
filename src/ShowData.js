import Request from './Request.js'

class ShowData extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.page = MainObject.page;
        this.list = document.querySelector('[data-list-bin]');

        this.getFromDb()


    }

    renderData(response) {
        this.list.innerHTML = ''
        const responseData = response.data.result
        responseData.forEach(element => {
            console.log(element)
            const listItem = document.createElement('li');
            listItem.innerHTML = `Name: ${element.recipe_name}
            Type: ${element.type_name}  
            Calories: ${element.calories}
            <button class="btn btn-primary" data-type="submit">Edit</button>
            <button class="btn btn-primary" data-type="submit">Delete</button>
            `;
            this.list.appendChild(listItem);
        });
    }



}



export default ShowData;
