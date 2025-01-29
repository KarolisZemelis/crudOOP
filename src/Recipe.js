import Create from './Create.js'
import ShowData from './ShowData.js'
import Edit from './Edit.js'
import Delete from './Delete.js'
import Select from './Select.js'

class Recipe {
    constructor() {
        this.page = 'recipe';
        this.Create = new Create(this);
        this.ShowData = new ShowData(this);
        this.Edit = new Edit(this);
        this.Delete = new Delete(this);
        this.Select = new Select(this);

    }
}

export default Recipe;