import Create from './Create.js'

class Recipe {
    constructor() {
        this.page = 'recipe';
        this.Create = new Create(this)
    }
}



export default Recipe;