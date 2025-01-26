import Create from './Create.js'
import ShowData from './ShowData.js'
import Edit from './Edit.js'

class Recipe {
    constructor() {
        this.page = 'recipe';
        this.Create = new Create(this);
        this.ShowData = new ShowData(this);
        this.Edit = new Edit(this);


    }
}



export default Recipe;