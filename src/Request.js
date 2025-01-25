import axios from 'axios';

class Request {
    constructor(page) {
        this.url = URL_API + page //URL_API is a global variable because its outside any box
    }

    saveToDb(dataFromCreateObject) {
        axios.post(this.url, dataFromCreateObject)
            .then(res => {
                console.log('response is request', res)
            })
            .catch(err => {
                console.log(err)
            })
    }
}




export default Request;