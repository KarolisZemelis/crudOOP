import axios from 'axios';

class Request {
    constructor(page) {
        this.url = URL_API + page //URL_API is a global variable because its outside any box
    }

    saveToDb(dataFromCreateObject) {
        axios.post(this.url, dataFromCreateObject)
            .then(res => {
                console.log('response in request', res)
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
            })
            .catch(err => {
                console.log(err)
            })
    }


    //this -> create object because this is being called from create
    //MainObject -> recipe because we pass <this which is recipe when creating a class object >
    //ShowData -> ShowData object
    //getFromDb -> method getFromDb which ShowData has taken from Request
    renderData(res) {
        this.MainObject.ShowData.getFromDb()
    }

}






export default Request;