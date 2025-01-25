import Request from './Request.js'

class ShowData extends Request {
    constructor(RequestObject) {
        super(RequestObject.page)
        this.page = RequestObject.page;
        this.list = document.querySelector('[data-list-bin]');

        this.getFromDb()


    }

    renderData(response) {
        this.list.innerHTML = ''
        const responseData = response.data.result
        responseData.forEach(element => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `Name: ${element.recipe_name} Calories: ${element.calories}`;
            this.list.appendChild(listItem);
        });
    }



}



export default ShowData;
