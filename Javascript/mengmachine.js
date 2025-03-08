const gemengdeIngredientenLijstContainer = document.getElementById('gemengde-ingredienten-lijst');

class Mengmachine {
    constructor(gemengdePottenHal) {
        this.gemengdePottenHal = gemengdePottenHal;
        this.machineContainer = document.createElement('div');
        this.machineContainer.classList.add('machine-container');

        this.mengmachineElement = document.createElement('div');
        this.mengmachineElement.classList.add('mengmachine');
        this.mengmachineElement.title = `Lege mengmachine`;
        this.mengmachineElement.dataset.mixerStatus = 'idle';

        this.machineContainer.appendChild(this.mengmachineElement);

        this.mixKnop = document.createElement('button');
        this.mixKnop.textContent = 'Mix!';
        this.mixKnop.classList.add('mix-knop');
        this.machineContainer.appendChild(this.mixKnop);

        this.addEventListeners();
    }

    addEventListeners() {
        this.mixKnop.addEventListener('click', () => this.handleMixClick());
        this.mengmachineElement.addEventListener('dragover', (event) => this.handleDragOver(event));
        this.mengmachineElement.addEventListener('drop', (event) => this.handleDrop(event));
    }

    valideerMixKleur(rood, groen, blauw, mengtijd, mengsnelheid, structuur){
        let heeftFouten = false;

        if (isNaN(mengtijd) || mengtijd <= 0) {
            heeftFouten = true;
        }

        if (isNaN(mengsnelheid) || mengsnelheid <= 0) {
            heeftFouten = true;
        }

        if (isNaN(rood) || rood < 0 || rood > 255) {
            heeftFouten = true;
        }

        if (isNaN(groen) || groen < 0 || groen > 255) {
            heeftFouten = true;
        }

        if (isNaN(blauw) || blauw < 0 || blauw > 255) {
            heeftFouten = true;
        }

        if (!structuur) {
            heeftFouten = true;
        }

        return heeftFouten;
    }

    handleMixClick() {
        const potElementOrigineel = this.mengmachineElement.querySelector('.pot');

        if (potElementOrigineel) {
            const potIngredientenOrigineel = potElementOrigineel.querySelectorAll('.ingrediënt');
            
            if (potIngredientenOrigineel) {
                let nieuwRood = 0, nieuwGroen = 0, nieuwBlauw = 0;
                let nieuweMengtijd = 0, nieuweMengsnelheid = 0, nieuweStructuur;

                potIngredientenOrigineel.forEach(ingredient => {
                    let ingredientAchtergrond = ingredient.style.backgroundColor;
                    let rgbValues = ingredientAchtergrond.match(/\d+/g);
                    
                    if (rgbValues) {
                        let ingredientRood = parseInt(rgbValues[0]);
                        let ingredientGroen = parseInt(rgbValues[1]);
                        let ingredientBlauw = parseInt(rgbValues[2]);

                        nieuwRood += ingredientRood;
                        nieuwGroen += ingredientGroen;
                        nieuwBlauw += ingredientBlauw;

                        if(nieuwRood > 255) nieuwRood = 255;
                        if(nieuwGroen > 255) nieuwGroen = 255;
                        if(nieuwBlauw > 255) nieuwBlauw = 255;

                        let titleText = ingredient.title;
                        let titleParts = titleText.split(',').map(part => part.trim());

                        let mengtijd = parseInt(titleParts[0].split(': ')[1]);
                        let mengsnelheid = parseInt(titleParts[1].split(': ')[1]);
                        let structuur = titleParts[2].split(': ')[1];

                        if (mengtijd > nieuweMengtijd) {
                            nieuweMengtijd = mengtijd;
                        }

                        nieuweMengsnelheid = mengsnelheid;
                        nieuweStructuur = structuur;
                    }
                });

                if (this.valideerMixKleur(nieuwRood, nieuwGroen, nieuwBlauw, nieuweMengtijd, nieuweMengsnelheid, nieuweStructuur)) {
                    return;
                }

                let nieuweKleur = {
                    type: 'rgb',
                    rood: nieuwRood,
                    groen: nieuwGroen,
                    blauw: nieuwBlauw
                };

                let nieuwIngredient = {
                    mengtijd: nieuweMengtijd,
                    mengsnelheid: nieuweMengsnelheid,
                    kleur: nieuweKleur,
                    structuur: nieuweStructuur,
                    id: Date.now()
                };

                    const ingredientElement = this.creëerIngredientElement(nieuwIngredient);
                    gemengdeIngredientenLijstContainer.appendChild(ingredientElement);

                    const ingredientElementKloon = ingredientElement.cloneNode(true);
                    potElementOrigineel.innerHTML = "";
                    potElementOrigineel.appendChild(ingredientElementKloon);

                    ingredientElementKloon.draggable = false;

                    this.gemengdePottenHal.appendChild(potElementOrigineel);
                    potElementOrigineel.dataset.potStatus = 'in-hal';
                    this.mengmachineElement.dataset.mixerStatus = 'idle';
            }
        }
    }

    creëerIngredientElement(ingredientData) {
        // Maak een visuele representatie van het ingrediënt
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingrediënt');
        ingredientElement.title = `Mengtijd: ${ingredientData.mengtijd}ms, Mengsnelheid: ${ingredientData.mengsnelheid}, Structuur: ${ingredientData.structuur}`;
        ingredientElement.style.backgroundColor = `rgb(${ingredientData.kleur.rood}, ${ingredientData.kleur.groen}, ${ingredientData.kleur.blauw})`;

        if (ingredientData.structuur === 'korrel') {
            ingredientElement.style.borderStyle = 'dotted';
        } else if (ingredientData.structuur === 'grove-korrel') {
            ingredientElement.style.borderStyle = 'dashed';
            ingredientElement.style.borderWidth = '2px';
        } else if (ingredientData.structuur === 'slijmerig') {
            ingredientElement.style.borderRadius = '50%';
        }

        ingredientElement.dataset.ingredientId = ingredientData.id;
        ingredientElement.draggable = true;

        ingredientElement.addEventListener('dragstart', (event) => {
            const ingredientId = ingredientElement.dataset.ingredientId;
            event.dataTransfer.setData('text/plain', ingredientId);
        });

        return ingredientElement;
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();

        if (this.mengmachineElement.dataset.mixerStatus === 'bezet') {
            return;
        }

        const potId = event.dataTransfer.getData('text/plain');

        if (potId) {
            const potElementOrigineel = document.querySelector(`.pot[data-pot-id="${potId}"]`);

            if (potElementOrigineel) {
                this.mengmachineElement.appendChild(potElementOrigineel);
                potElementOrigineel.dataset.potStatus = 'in-mixer';
                this.mengmachineElement.dataset.mixerStatus = 'bezet';
            } else {
                alert(`Fout: Origineel pot element met ID ${potId} NIET gevonden!`);
            }
        } else {
            alert('Fout: Geen pot ID ontvangen in dataTransfer!');
        }
    }

    getElement() {
        return this.machineContainer;
    }
}

export default Mengmachine;