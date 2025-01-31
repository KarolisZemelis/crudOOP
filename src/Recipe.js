import Create from './Create.js'
import ShowData from './ShowData.js'
import Edit from './Edit.js'
import Delete from './Delete.js'
import FormRecipe from './FormRecipe.js'


class Recipe {
    constructor() {
        this.page = 'recipe';
        this.Create = new Create(this);
        this.ShowData = new ShowData(this);
        this.Edit = new Edit(this);
        this.Delete = new Delete(this);
        this.FormRecipe = new FormRecipe(this);
    }
}

export default Recipe;