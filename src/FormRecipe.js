import Request from './Request.js'

class FormRecipe extends Request {
    constructor(MainObject) {
        super(MainObject.page)
        this.MainObject = MainObject

        this.formRecipe()
        this.submitFormedRecipe()
        this.recipeToSave = {}


    }

    // formRecipe() {
    //     document.querySelector('[data-list-recipes]').addEventListener('dragstart', (e) => {
    //         const item = e.target.closest('li[draggable="true"]');
    //         if (!item) return; // Ignore if not a valid draggable item

    //         // Extract data from the dynamically generated list item
    //         const data = {
    //             type: 'recipe',
    //             id: Number(item.id),
    //             recipe_name: item.querySelector('[data-list="recipe_name"] h5')?.textContent.trim() || "",
    //             type_name: item.querySelector('[data-list="type_name"]')?.textContent.replace('type_name: ', '').trim() || "",
    //             typeId: Number(item.querySelector('[data-type-id]')?.getAttribute('data-type-id') || ""),
    //             calories: Number(item.querySelector('[data-list="calories"]')?.textContent.replace('calories: ', '').trim() || "")
    //         };

    //         // Store the data in the drag event
    //         const jsonData = JSON.stringify(data);
    //         e.dataTransfer.setData('text/plain', jsonData);
    //         console.log("Dragging:", jsonData);

    //         selectContainer('drop-container')

    //     });

    //     document.querySelector('[data-list-ingredients]').addEventListener('dragstart', (e) => {
    //         const item = e.target.closest('li[draggable="true"]');
    //         if (!item) return; // Ignore if not a valid draggable item
    //         // Extract data from the dynamically generated list item
    //         const data = {
    //             type: 'ingredient',
    //             id: item.id,
    //             ingredient_name: item.querySelector('[data-list="ingredient_name"] h6')?.textContent.trim() || "",
    //             type_id: item.querySelector('.ingredientListItem')?.dataset?.typeId || "",

    //         };
    //         // Store the data in the drag event
    //         const jsonData = JSON.stringify(data);
    //         e.dataTransfer.setData('text/plain', jsonData);
    //         // console.log("Dragging:", jsonData);
    //         selectContainer('drop-container-ingredients')
    //     });
    //     // Enable drop functionality
    //     function selectContainer(cont) {

    //         const container = document.querySelector(`.${cont}`);

    //         container.addEventListener('dragover', (e) => {
    //             e.preventDefault(); // Required to allow dropping
    //         });

    //         container.ondrop = (e) => {
    //             e.preventDefault();

    //             // Retrieve dragged item data
    //             const dataString = e.dataTransfer.getData('text/plain');

    //             if (!dataString) {
    //                 console.error("No data received during drop.");
    //                 return;
    //             }

    //             try {
    //                 const data = JSON.parse(dataString);
    //                 // Create a new list item in the drop container
    //                 const newItem = document.createElement('li');

    //                 if (cont === 'drop-container') {

    //                     if (data.type !== 'recipe') {
    //                         return;
    //                     }
    //                     container.innerHTML = ''
    //                     console.log(data)
    //                     newItem.innerHTML = `
    //                     <div data-list="recipe_name"><h5>${data.recipe_name}</h5></div>
    //                     <div data-type="${data.type_name}">type_name: ${data.type_name}</div>
    //                     <div data-list="calories">calories: ${data.calories}</div>
    //                     <div>
    //                         <button class="btn btn-primary remove-button">Remove</button>
    //                     </div>
    //                 `;
    //                     // Add an event listener to the "Remove" button
    //                     const removeButton = newItem.querySelector('.remove-button');
    //                     removeButton.addEventListener('click', () => {
    //                         newItem.remove(); // Remove the parent <li> element when the button is clicked
    //                     });

    //                 } else if (cont === 'drop-container-ingredients') {
    //                     if (data.type !== 'ingredient') {

    //                         return
    //                     }
    //                     newItem.style.display = 'flex';
    //                     newItem.style.alignItems = 'center';
    //                     newItem.style.gap = '0.25rem';
    //                     newItem.style.marginBottom = '0.25rem';
    //                     newItem.style.marginTop = '0.25rem';
    //                     newItem.innerHTML = `
    //                     <div  data-list="ingredient_name"><h6 class='mb-0'>${data.ingredient_name}</h6></div>
    //                     <div>
    //                         <button class="btn btn-primary remove-button">Remove</button>
    //                     </div>
    //                     `;
    //                     // Add an event listener to the "Remove" button
    //                     const removeButton = newItem.querySelector('.remove-button');
    //                     removeButton.addEventListener('click', () => {
    //                         newItem.remove(); // Remove the parent <li> element when the button is clicked
    //                     });


    //                 }
    //                 // Append the new item
    //                 container.appendChild(newItem);
    //             } catch (error) {
    //                 console.error("Error parsing JSON data:", error);
    //             }
    //         };

    //     }



    // }
    formRecipe() {
        //recipes
        document.querySelector('[data-list]').addEventListener('dragstart', (e) => {
            const item = e.target.closest('li[draggable="true"]');

            if (!item) return; // Ignore if not a valid draggable item

            // Extract data from the dynamically generated list item
            const data = {
                type: 'recipe',
                id: Number(item.dataset.itemid),
            };

            // Store the data in the drag event
            const jsonData = JSON.stringify(data);
            e.dataTransfer.setData('text/plain', jsonData);

            selectContainer('drop-container')
        });
        //ingredients
        document.querySelector('[data-list-ingredients]').addEventListener('dragstart', (e) => {
            const item = e.target.closest('li[draggable="true"]');
            if (!item) return; // Ignore if not a valid draggable item
            // Extract data from the dynamically generated list item
            const data = {
                type: 'ingredient',
                id: Number(item.dataset.itemid),
            };
            // Store the data in the drag event
            const jsonData = JSON.stringify(data);
            e.dataTransfer.setData('text/plain', jsonData);
            selectContainer('drop-container-ingredients')
        });
        // Enable drop functionality
        const selectContainer = (cont) => {

            const container = document.querySelector(`.${cont}`);

            container.addEventListener('dragover', (e) => {
                e.preventDefault(); // Required to allow dropping
            });

            container.ondrop = (e) => {
                e.preventDefault();

                // Retrieve dragged item data
                const dataString = e.dataTransfer.getData('text/plain');

                if (!dataString) {
                    console.error("No data received during drop.");
                    return;
                }

                try {
                    const data = JSON.parse(dataString);

                    if (cont === 'drop-container') {
                        if (data.type !== 'recipe') {
                            return;
                        }
                        const recipeId = data.id;
                        const table = data.type;
                        this.getElementFromDbForm(recipeId, this.MainObject, table, 'render')
                        this.recipeToSave.recipeId = data.id;
                    } else if (cont === 'drop-container-ingredients') {
                        if (data.type !== 'ingredient') {
                            return
                        }
                        const ingredientId = data.id;
                        const table = data.type;
                        this.getElementFromDbForm(ingredientId, this.MainObject, table, 'render')



                    }

                } catch (error) {
                    console.error("Error parsing JSON data:", error);
                }
            };

        }
    }

    async submitFormedRecipe() {
        const submitBtn = document.querySelector('[data-type="submitRecipe"]');

        submitBtn.onclick = async () => {
            console.log(this.recipeToSave)
            const recipeContainer = document.querySelector('.drop-container');
            const recipeId = [Number(recipeContainer.querySelector('[data-itemid]').dataset.itemid)];
            try {

                // const dataFromDb = await this.getElementFromDbForm(recipeId, this.MainObject, 'recipe', 'form');
                // const recipeData = dataFromDb[0]
                // for (let key in recipeData) {
                //     recipeToSave[key] = recipeData[key]
                // }
                // gal reikia iškelti recipeToSave i constructorių ir kas kart pridėjus įsirašo o jei removini reikia removint ir iš objekto
            } catch (error) {
                console.error("❌ Error fetching recipe in FormRecipe.js:", error);
            }







        };
    }


}
export default FormRecipe;