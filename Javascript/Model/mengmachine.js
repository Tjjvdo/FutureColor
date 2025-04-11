class Mengmachine {
    constructor(gemengdePottenHal) {
        this.gemengdePottenHal = gemengdePottenHal;
    }

    valideerMixKleur(rood, groen, blauw, mengtijd, mengsnelheid, structuur) {
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

                        if (nieuwRood > 255) nieuwRood = 255;
                        if (nieuwGroen > 255) nieuwGroen = 255;
                        if (nieuwBlauw > 255) nieuwBlauw = 255;

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
                };

                // moest later op idle worden gezet
                this.mengmachineElement.dataset.mixerStatus = 'mixen';

                return [nieuwIngredient, potElementOrigineel, this.gemengdePottenHal];
            }
        }
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();

        // extra status erbij gekomen wanner er iets niet in mag
        let mixerStatus = this.mengmachineElement.dataset.mixerStatus;
        if (mixerStatus === 'bezet' || mixerStatus === 'mixen') {
            return;
        }

        const potId = event.dataTransfer.getData('text/plain');

        if (potId) {
            const potElementOrigineel = document.querySelector(`.pot[data-pot-id="${potId}"]`);

            if (potElementOrigineel) {
                // kijken of er wel dingen in zitten
                if (potElementOrigineel.hasChildNodes()) {
                    this.mengmachineElement.appendChild(potElementOrigineel);
                    potElementOrigineel.dataset.potStatus = 'in-mixer';
                    this.mengmachineElement.dataset.mixerStatus = 'bezet';
                    // anders kan je draggen, maar nergens laten droppen, iets netter
                    potElementOrigineel.draggable = false;
                } else {
                    alert('Er zit niks in de pot');
                }
            } else {
                alert(`Fout: Origineel pot element met ID ${potId} NIET gevonden!`);
            }
        } else {
            alert('Fout: Geen pot ID ontvangen in dataTransfer!');
        }
    }

    resetStatus() {
        this.mengmachineElement.dataset.mixerStatus = 'idle';
    }

    getAantalActieveMachines() {
        // haal de bijbehorende meng machine hal zelf op
        const mengmachineHal = this.mengmachineElement.parentNode.parentNode;

        // pak alle machines daar van
        const machines = mengmachineHal.querySelectorAll('.mengmachine');

        // filter op de actieve machines
        const actieveMachines = Array.from(machines).filter(machine => {
            return machine.dataset.mixerStatus === 'mixen';
        });

        // geef de lengte van de array (de actieve machines dus) terug
        return actieveMachines.length;
    }
}

export default Mengmachine;