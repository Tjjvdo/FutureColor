const gemengdeIngredientenLijst = document.getElementById('gemengde-ingredienten-lijst');

class TestGrid {
    constructor(gridGrote) {
        this.vierkantjes = [];

        for (let i = 0; i < gridGrote * gridGrote; i++) {
            const vierkantje = document.createElement('div');
            vierkantje.classList.add('kleur-vierkantje');
            this.addEventListeners(vierkantje);
            this.vierkantjes.push(vierkantje);
        }
    }

    addEventListeners(vierkantje) {
        this.addDragoverListener(vierkantje);
        this.addDropListener(vierkantje);
    }

    addDragoverListener(vierkantje) {
        vierkantje.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
    }

    addDropListener(vierkantje) {
        vierkantje.addEventListener('drop', (event) => {
            event.preventDefault();

            const ingredientId = event.dataTransfer.getData('text/plain');

            if (ingredientId) {
                const ingredientElementOrigineel = gemengdeIngredientenLijst.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

                if (ingredientElementOrigineel) {
                    if (vierkantje.children.length > 0) {
                        return;
                    }

                    const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true);
                    vierkantje.appendChild(ingredientElementKloon);

                    ingredientElementKloon.draggable = false;
                }
            }
        });
    }

    getElementen() {
        return this.vierkantjes;
    }
}

export default TestGrid;