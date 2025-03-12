class Pot {
    constructor() {
        this.potElement = document.createElement('div');
        this.potElement.classList.add('pot');
        this.potElement.title = `Lege pot`;
        this.potElement.dataset.potStatus = 'in-hal';
        this.potElement.dataset.potId = Date.now();
        this.potElement.draggable = true;

        this.addDragoverListener();
        this.addDropListener();
        this.addDragstartListener();
    }

    addDragoverListener() {
        this.potElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
    }

    addDropListener() {
        this.potElement.addEventListener('drop', (event) => {
            event.preventDefault();

            if (this.potElement.dataset.potStatus === 'in-mixer') {
                return;
            }

            const ingredientId = event.dataTransfer.getData('text/plain');

            if (ingredientId) {
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

                if (ingredientElementOrigineel) {
                    const ingredientChildren = this.potElement.querySelectorAll('.ingrediënt');
                    if (!this.isDezelfdeMengSnelheid(ingredientChildren, ingredientElementOrigineel)){
                        return;
                    }

                    const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true);
                    this.potElement.appendChild(ingredientElementKloon);

                    ingredientElementKloon.draggable = false;
                } else {
                    alert(`Fout: Origineel ingredient element met ID ${ingredientId} NIET gevonden!`);
                }

            } else {
                alert('Fout: Geen ingredient ID ontvangen in dataTransfer!');
            }
        });
    }

    addDragstartListener() {
        this.potElement.addEventListener('dragstart', (event) => {
            const potId = this.potElement.dataset.potId;
            event.dataTransfer.setData('text/plain', potId);
        });
    }

    getElement() {
        return this.potElement;
    }

    isDezelfdeMengSnelheid(ingredientChildren, ingredientElementOrigineel) {
        if (ingredientChildren.length > 0) {
            let titleText = ingredientChildren[0].title;
            let titleParts = titleText.split(',').map(part => part.trim());

            let mengsnelheid = parseInt(titleParts[1].split(': ')[1]);

            let nieuwIngredientTitleText = ingredientElementOrigineel.title;
            let nieuwIngredientTitleParts = nieuwIngredientTitleText.split(',').map(part => part.trim());

            let nieuwIngredientmengsnelheid = parseInt(nieuwIngredientTitleParts[1].split(': ')[1]);

            if (mengsnelheid === nieuwIngredientmengsnelheid) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}

export default Pot;