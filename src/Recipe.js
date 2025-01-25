import Create from './Create.js'
import ShowData from './ShowData.js'

class Recipe {
    constructor() {
        this.page = 'recipe';
        this.Create = new Create(this);
        this.ShowData = new ShowData(this);


    }
}



export default Recipe;