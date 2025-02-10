import axios from 'axios';

class Request {
    constructor(page) {
        this.url = URL_API + page //URL_API is a global variable because its outside any box
        this.recipeList = document.querySelector('[data-list-recipes]');
        this.ingredientList = document.querySelector('[data-list-ingredients]');

    }

    saveToDb(dataFromCreateObject) {
        axios.post(this.url, dataFromCreateObject)
            .then(res => {
                this.renderData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    getFromDb() {
        axios.get(this.url)
            .then(res => {
                this.renderData(res)
                this.renderSearchData(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getSelectFromDb(type, MainObject, value) {
        axios.get(this.url + '/' + 'select' + '/' + type)
            .then(res => {
                MainObject.ShowData.renderSelectData(res, value)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getElementFromDbForm(id, MainObject, table, action) {
        return axios.get(this.url + '/' + 'formRecipe' + '/' + id, {
            params: { table }
        })
            .then(res => {
                if (action === 'render') {
                    MainObject.ShowData.renderFormData(res, table)
                    return null;
                }
                return res.data.result || res.data;


            })
            .catch(err => {
                console.log(err)
            })
    }

    getElementFromDbEdit(id, MainObject, table) {
        axios.get(this.url + '/' + id, {
            params: { table }
        })
            .then(res => {
                MainObject.ShowData.renderModalData(res, table)
            })
            .catch(err => {
                console.log(err)
            })
    }

    editToDb(data, table) {
        axios.put(this.url + '/' + 'edit' + '/' + data.id, data, table)
            .then((res) => {

                this.renderData(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteFromDb(id, table) {
        axios.delete(this.url + '/' + 'delete' + '/' + id, {
            data: { table }
        })
            .then((res) => {
                this.renderData(res)
            }).catch(err => {
                console.log(err)
            })
    }

    saveToRecipeTable(recipe) {
        axios.post(this.url + '/' + 'saveRecipe/', recipe)
            .then(res => {
                this.renderData(res)
                this.renderSearchData(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderData(res) {
        this.MainObject.ShowData.getFromDb()
    }

}

export default Request;