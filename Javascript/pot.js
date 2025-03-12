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
}

export default Pot;