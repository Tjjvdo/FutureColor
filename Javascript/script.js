document.addEventListener('DOMContentLoaded', () => {
    const nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
    const ingredientFormulier = document.getElementById('ingredient-formulier');
    const ingredientToevoegenKnop = document.getElementById('ingredient-toevoegen-knop');
    const annuleerIngredientKnop = document.getElementById('annuleer-ingredient-knop');
    const ingredientenLijstContainer = document.getElementById('ingredienten-lijst');
    const gemengdeIngredientenLijstContainer = document.getElementById('gemengde-ingredienten-lijst');
    const nieuwePotKnopHal1 = document.getElementById('nieuwe-pot-knop-hal-1');
    const pottenHal1Container = document.getElementById('potten-hal-1');
    const nieuwePotKnopHal2 = document.getElementById('nieuwe-pot-knop-hal-2');
    const pottenHal2Container = document.getElementById('potten-hal-2');
    const nieuweMengmachineKnopHal1 = document.getElementById('nieuwe-mengmachine-knop-hal-1');
    const mengmachinesHal1Container = document.getElementById('mengmachines-hal-1');
    const nieuweMengmachineKnopHal2 = document.getElementById('nieuwe-mengmachine-knop-hal-2');
    const mengmachinesHal2Container = document.getElementById('mengmachines-hal-2');
    const gemengdePottenHal1 = document.getElementById('gemengde-potten-hal-1');
    const gemengdePottenHal2 = document.getElementById('gemengde-potten-hal-2');

    nieuwIngredientKnop.addEventListener('click', () => {
        ingredientFormulier.style.display = 'block';
        nieuwIngredientKnop.style.display = 'none';
    });

    annuleerIngredientKnop.addEventListener('click', () => {
        ingredientFormulier.style.display = 'none';
        nieuwIngredientKnop.style.display = 'block';
    });

    ingredientToevoegenKnop.addEventListener('click', () => {
        // Reset eventuele eerdere foutmeldingen (optioneel, maar netjes)
        resetFoutmeldingen();

        // Lees de waarden uit het formulier
        const mengtijdInput = document.getElementById('mengtijd');
        const mengsnelheidInput = document.getElementById('mengsnelheid');
        const rgbRoodInput = document.getElementById('rgb-rood');
        const rgbGroenInput = document.getElementById('rgb-groen');
        const rgbBlauwInput = document.getElementById('rgb-blauw');
        const structuurInput = document.getElementById('structuur');

        const rood = parseInt(rgbRoodInput.value);
        const groen = parseInt(rgbGroenInput.value);
        const blauw = parseInt(rgbBlauwInput.value);
        const mengtijd = parseInt(mengtijdInput.value);
        const mengsnelheid = parseInt(mengsnelheidInput.value);
        const structuur = structuurInput.value;

        if (valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur)) {
            return;
        }

        // Maak een ingrediënt object (alleen als er GEEN fouten zijn)
        const kleur = {
            type: 'rgb',
            rood: rood,
            groen: groen,
            blauw: blauw
        };

        const nieuwIngredient = {
            mengtijd: mengtijd,
            mengsnelheid: mengsnelheid,
            kleur: kleur,
            structuur: structuur,
            id: Date.now()
        };

        // Maak een visuele representatie van het ingrediënt
        const ingredientElement = creëerIngredientElement(nieuwIngredient);

        ingredientenLijstContainer.appendChild(ingredientElement);

        ingredientFormulier.reset();
        ingredientFormulier.style.display = 'none';
        nieuwIngredientKnop.style.display = 'block';
    });

    function valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur) {
        let heeftFouten = false;
        let foutmelding = "De volgende velden zijn verplicht en moeten correct ingevuld zijn:\n";

        if (isNaN(mengtijd) || mengtijd <= 0) {
            heeftFouten = true;
            foutmelding += "- Mengtijd (moet een getal groter dan 0 zijn)\n";
            markeerFoutiefVeld(mengtijdInput);
        }

        if (isNaN(mengsnelheid) || mengsnelheid <= 0) {
            heeftFouten = true;
            foutmelding += "- Mengsnelheid (moet een getal groter dan 0 zijn)\n";
            markeerFoutiefVeld(mengsnelheidInput);
        }

        if (isNaN(rood) || rood < 0 || rood > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Rood (moet een getal tussen 0 en 255 zijn)\n";
            markeerFoutiefVeld(rgbRoodInput);
        }

        if (isNaN(groen) || groen < 0 || groen > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Groen (moet een getal tussen 0 en 255 zijn)\n";
            markeerFoutiefVeld(rgbGroenInput);
        }

        if (isNaN(blauw) || blauw < 0 || blauw > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Blauw (moet een getal tussen 0 en 255 zijn)\n";
            markeerFoutiefVeld(rgbBlauwInput);
        }

        if (!structuur) {
            heeftFouten = true;
            foutmelding += "- Structuur (selecteer een structuur)\n";
            markeerFoutiefVeld(structuurSelect);
        }

        if (heeftFouten) {
            return true;
        }
    }

    function valideerMixKleur(rood, groen, blauw, mengtijd, mengsnelheid, structuur){
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

        if (heeftFouten) {
            return true;
        }
    }

    function markeerFoutiefVeld(veld) {
        veld.classList.add('fout-veld');
    }

    function resetFoutmeldingen() {
        const foutieveVelden = document.querySelectorAll('.fout-veld');
        foutieveVelden.forEach(veld => {
            veld.classList.remove('fout-veld');
        });
    }

    function creëerIngredientElement(ingredientData) {
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

    nieuwePotKnopHal1.addEventListener('click', () => {
        const potElement = maakNieuwePot();

        pottenHal1Container.appendChild(potElement);
    });

    nieuwePotKnopHal2.addEventListener('click', () => {
        const potElement = maakNieuwePot();

        pottenHal2Container.appendChild(potElement);
    });

    function maakNieuwePot() {
        const potElement = document.createElement('div');
        potElement.classList.add('pot');
        potElement.title = `Lege pot`;
        potElement.dataset.potStatus = 'in-hal';

        potElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        potElement.addEventListener('drop', (event) => {
            event.preventDefault();

            if (potElement.dataset.potStatus === 'in-mixer') {
                return;
            }

            const ingredientId = event.dataTransfer.getData('text/plain');

            if (ingredientId) {
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

                if (ingredientElementOrigineel) {
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

        potElement.dataset.potId = Date.now();
        potElement.draggable = true;

        potElement.addEventListener('dragstart', (event) => {
            const potId = potElement.dataset.potId;
            event.dataTransfer.setData('text/plain', potId);
        });

        return potElement;
    }

    nieuweMengmachineKnopHal1.addEventListener('click', () => {
        const machineContainer = maakNieuweMengmachine(gemengdePottenHal1);

        mengmachinesHal1Container.appendChild(machineContainer);
    });

    nieuweMengmachineKnopHal2.addEventListener('click', () => {
        const machineContainer = maakNieuweMengmachine(gemengdePottenHal2);

        mengmachinesHal2Container.appendChild(machineContainer);
    });

    function maakNieuweMengmachine(gemengdePottenHal) {
        const machineContainer = document.createElement('div');
        machineContainer.classList.add('machine-container');

        const mengmachineElement = document.createElement('div');
        mengmachineElement.classList.add('mengmachine');
        mengmachineElement.title = `Lege mengmachine`;
        mengmachineElement.dataset.mixerStatus = 'idle';

        machineContainer.appendChild(mengmachineElement);

        const mixKnop = document.createElement('button');
        mixKnop.textContent = 'Mix!';
        mixKnop.classList.add('mix-knop');
        machineContainer.appendChild(mixKnop);

        mixKnop.addEventListener('click', () => {
            const potElementOrigineel = mengmachineElement.querySelector('.pot');

            // potElementOrigineel is de pot die in deze machine zit, hier moet je wel nog wat informatie uit de pot zelf halen.
            if (potElementOrigineel) {
                const potIngredientenOrigineel = potElementOrigineel.querySelectorAll('.ingrediënt');
                
                if(potIngredientenOrigineel){
                    let nieuwRood = 0;
                    let nieuwGroen = 0;
                    let nieuwBlauw = 0;
                    let nieuweMengtijd = 0;
                    let nieuweMengsnelheid = 0;
                    let nieuweStructuur;

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
                    
                            if(nieuwRood > 255){
                                nieuwRood = 255;
                            }
                            if(nieuwGroen > 255){
                                nieuwGroen = 255;
                            }
                            if(nieuwBlauw > 255){
                                nieuwBlauw = 255;
                            }

                            let titleText = ingredient.title; 

                            let titleParts = titleText.split(',').map(part => part.trim());

                            let mengtijd = parseInt(titleParts[0].split(': ')[1]);
                            let mengsnelheid = parseInt(titleParts[1].split(': ')[1]);
                            let structuur = titleParts[2].split(': ')[1];

                            if(mengtijd > nieuweMengtijd){
                                nieuweMengtijd = mengtijd;
                            }

                            nieuweMengsnelheid = mengsnelheid;
                            nieuweStructuur = structuur;
                        }
                    });

                    if (valideerMixKleur(nieuwRood, nieuwGroen, nieuwBlauw, nieuweMengtijd, nieuweMengsnelheid, nieuweStructuur)) {
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

                    const ingredientElement = creëerIngredientElement(nieuwIngredient);
                    gemengdeIngredientenLijstContainer.appendChild(ingredientElement);

                    const ingredientElementKloon = ingredientElement.cloneNode(true);

                    potElementOrigineel.innerHTML = "";
                    potElementOrigineel.appendChild(ingredientElementKloon);

                    ingredientElementKloon.draggable = false;

                    gemengdePottenHal.appendChild(potElementOrigineel);
                    potElementOrigineel.dataset.potStatus = 'in-hal';
                    mengmachineElement.dataset.mixerStatus = 'idle';
                }
            }
        });

        mengmachineElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        mengmachineElement.addEventListener('drop', (event) => {
            event.preventDefault();

            if (mengmachineElement.dataset.mixerStatus === 'bezet') {
                return;
            }

            const potId = event.dataTransfer.getData('text/plain');

            if (potId) {
                const potElementOrigineel = document.querySelector(`.pot[data-pot-id="${potId}"]`);

                if (potElementOrigineel) {
                    mengmachineElement.appendChild(potElementOrigineel);

                    potElementOrigineel.dataset.potStatus = 'in-mixer';
                    mengmachineElement.dataset.mixerStatus = 'bezet';
                } else {
                    alert(`Fout: Origineel pot element met ID ${potId} NIET gevonden!`);
                }
            } else {
                alert('Fout: Geen pot ID ontvangen in dataTransfer!');
            }
        });

        return machineContainer;
    }
});