import axios from 'axios';

class Request {
    constructor(page) {
        this.url = URL_API + page //URL_API is a global variable because its outside any box
    }

    saveToDb(dataFromCreateObject) {
        axios.post(this.url, dataFromCreateObject)
            .then(res => {
                console.log('response in request', res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getFromDb() {
        axios.get(this.url)
            .then(res => {
                this.renderData(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderData(res) {

    }

}






export default Request;