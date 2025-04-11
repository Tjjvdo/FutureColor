class PotView{
    constructor(){
        this.pottenHal1Container = document.getElementById('potten-hal-1');
        this.pottenHal2Container = document.getElementById('potten-hal-2');
    }

    MaakNieuwePotHal1(pot, controller){
        const potElement = this.MaakNieuwePot(pot, controller);

        this.pottenHal1Container.appendChild(potElement);
    }

    MaakNieuwePotHal2(pot, controller){
        const potElement = this.MaakNieuwePot(pot, controller);

        this.pottenHal2Container.appendChild(potElement);
    }

    MaakNieuwePot(pot, controller){
        const potElement = document.createElement('div');
        potElement.classList.add('pot');
        potElement.title = `Lege pot`;
        potElement.dataset.potStatus = pot.potStatus;
        potElement.dataset.potId = pot.potId;
        potElement.draggable = true;

        potElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        potElement.addEventListener('drop', (event) => {
            event.preventDefault();

            //vorige werkte helemaal niet eens...
            if (potElement.dataset.potStatus === 'in-mixer') {
                return;
            }

            const ingredientId = event.dataTransfer.getData('text/plain');

            if (ingredientId) {
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

                if (ingredientElementOrigineel) {
                    const ingredientChildren = potElement.querySelectorAll('.ingrediënt');
                    if (!controller.isDezelfdeMengSnelheidPot(pot, ingredientChildren, ingredientElementOrigineel)) {
                        return;
                    }

                    const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true);
                    potElement.appendChild(ingredientElementKloon);

                    ingredientElementKloon.draggable = false;
                } else {
                    alert(`Fout: Origineel ingredient element met ID ${ingredientId} NIET gevonden!`);
                }

            } else {
                alert('Fout: Geen ingredient ID ontvangen in dataTransfer!');
            }
        });

        potElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', potElement.dataset.potId);
        });

        return potElement;
    }

    VerplaatsPotNaarGemengdeHal(ingredientElement, potElementOrigineel, gemengdePottenHal){
        const ingredientElementKloon = ingredientElement.cloneNode(true);
        potElementOrigineel.innerHTML = "";
        potElementOrigineel.appendChild(ingredientElementKloon);

        ingredientElementKloon.draggable = false;

        gemengdePottenHal.appendChild(potElementOrigineel);
        potElementOrigineel.dataset.potStatus = 'in-hal';
        // weer draggable maken zodat je verder kan mixen
        potElementOrigineel.draggable = true;
    }
}

export default PotView;