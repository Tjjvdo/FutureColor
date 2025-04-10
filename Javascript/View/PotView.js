class PotView{
    constructor(){
        this.pottenHal1Container = document.getElementById('potten-hal-1');
        this.pottenHal2Container = document.getElementById('potten-hal-2');
    }

    MaakNieuwePotHal1(pot){
        const potElement = this.MaakNieuwePot(pot);

        this.pottenHal1Container.appendChild(potElement);
    }

    MaakNieuwePotHal2(pot){
        const potElement = this.MaakNieuwePot(pot);

        this.pottenHal2Container.appendChild(potElement);
    }

    MaakNieuwePot(pot){
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

            if (pot.potStatus === 'in-mixer') {
                return;
            }

            const ingredientId = event.dataTransfer.getData('text/plain');

            if (ingredientId) {
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

                if (ingredientElementOrigineel) {
                    const ingredientChildren = potElement.querySelectorAll('.ingrediënt');
                    if (!pot.isDezelfdeMengSnelheid(ingredientChildren, ingredientElementOrigineel)) {
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
            console.log(pot.potId);
            event.dataTransfer.setData('text/plain', potElement.dataset.potId);
        });

        return potElement;
    }
}

export default PotView;