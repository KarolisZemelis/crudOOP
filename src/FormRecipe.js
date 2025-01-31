class FormRecipe {
    constructor() {

        this.formRecipe()


    }

    formRecipe() {
        document.querySelector('[data-list-recipes]').addEventListener('dragstart', (e) => {
            const item = e.target.closest('li[draggable="true"]');
            if (!item) return; // Ignore if not a valid draggable item

            // Extract data from the dynamically generated list item
            const data = {
                id: item.id,
                recipe_name: item.querySelector('[data-list="recipe_name"] h5')?.textContent.trim() || "",
                type_name: item.querySelector('[data-list="type_name"]')?.textContent.replace('type_name: ', '').trim() || "",
                calories: item.querySelector('[data-list="calories"]')?.textContent.replace('calories: ', '').trim() || ""
            };

            // Store the data in the drag event
            const jsonData = JSON.stringify(data);
            e.dataTransfer.setData('text/plain', jsonData);
            console.log("Dragging:", jsonData);
        });

        // Enable drop functionality
        const dropContainer = document.querySelector('.drop-container');

        dropContainer.addEventListener('dragover', (e) => {
            e.preventDefault(); // Required to allow dropping
        });

        dropContainer.addEventListener('drop', (e) => {
            e.preventDefault();

            // Retrieve dragged item data
            const dataString = e.dataTransfer.getData('text/plain');

            if (!dataString) {
                console.error("No data received during drop.");
                return;
            }

            try {
                const data = JSON.parse(dataString);

                // Create a new list item in the drop container
                const newItem = document.createElement('li');
                newItem.innerHTML = `
                    <div data-list="recipe_name"><h5>${data.recipe_name}</h5></div>
                    <div data-list="type_name">type_name: ${data.type_name}</div>
                    <div data-list="calories">calories: ${data.calories}</div>
                `;

                // Append the new item
                dropContainer.appendChild(newItem);
            } catch (error) {
                console.error("Error parsing JSON data:", error);
            }
        });
    }

}
export default FormRecipe;