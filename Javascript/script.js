document.addEventListener('DOMContentLoaded', () => {
    const nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
    const ingredientFormulier = document.getElementById('ingredient-formulier');
    const ingredientToevoegenKnop = document.getElementById('ingredient-toevoegen-knop');
    const annuleerIngredientKnop = document.getElementById('annuleer-ingredient-knop');
    const ingredientenLijstContainer = document.getElementById('ingredienten-lijst');
    const nieuwePotKnopHal1 = document.getElementById('nieuwe-pot-knop-hal-1');
    const pottenHal1Container = document.getElementById('potten-hal-1');
    const nieuwePotKnopHal2 = document.getElementById('nieuwe-pot-knop-hal-2');
    const pottenHal2Container = document.getElementById('potten-hal-2');
    const ingredientInfoGebied = document.getElementById('ingredient-info-gebied');
    const ingredientInfoTekstElement = document.getElementById('ingredient-info-tekst');

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

    function valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur){
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
        ingredientElement.classList.add('ingrediënt-voorbeeld');
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
        const potElement = document.createElement('div');
        potElement.classList.add('pot-voorbeeld');
        potElement.title = `Lege pot`;

        potElement.ingredienten = [];

        potElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        potElement.addEventListener('drop', (event) => {
            event.preventDefault();
            const ingredientId = event.dataTransfer.getData('text/plain'); // Haal het ingredient ID op uit de dataTransfer

            if (ingredientId) { // Controleer of er een ingredientId is meegegeven (voor de zekerheid)
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt-voorbeeld[data-ingredient-id="${ingredientId}"]`); // Zoek ingredient element met de matching data-ingredient-id
                
                if (ingredientElementOrigineel) {
                    const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true); // Kloon het ingredient element
                    potElement.appendChild(ingredientElementKloon); // Voeg de KLOON toe aan de pot
                    potElement.title = "Pot met ingrediënten";

                    ingredientElementKloon.style.display = 'none';

                    const ingredientKleur = ingredientElementOrigineel.style.backgroundColor;
                    potElement.ingredienten.push(ingredientKleur);
                    updatePotAchtergrond(potElement);
                } else {
                    alert(`Fout: Origineel ingredient element met ID ${ingredientId} NIET gevonden!`);
                }
            } else {
                alert('Fout: Geen ingredient ID ontvangen in dataTransfer!'); // Foutmelding als er geen ID is
            }
        });

        potElement.addEventListener('click', () => {
            const ingredientKleuren = potElement.ingredienten; // Haal de array met ingredient kleuren op
            let infoString = "Ingrediënten in deze pot:\n"; // Start van de info string

            if (ingredientKleuren.length === 0) {
                infoString += "- Leeg"; // Als er geen ingredienten zijn
            } else {
                for (let i = 0; i < ingredientKleuren.length; i++) {
                    const kleur = ingredientKleuren[i];
                    infoString += `- Ingrediënt ${i + 1}: RGB(${kleur})\n`; // Voeg kleur info toe voor elk ingredient
                }
            }

            ingredientInfoTekstElement.innerHTML = infoString.replace(/\n/g, '<br>'); // Zet de infoString in de paragraaf, vervang \n met <br> voor HTML weergave
            ingredientInfoGebied.style.display = 'block'; // Zorg dat het info gebied zichtbaar is (voor het geval dat we het ooit zouden verbergen met CSS)            
        });

        pottenHal1Container.appendChild(potElement);
    });

    nieuwePotKnopHal2.addEventListener('click', () => {
        const potElement = document.createElement('div');
        potElement.classList.add('pot-voorbeeld');
        potElement.title = `Lege pot`;

        pottenHal2Container.appendChild(potElement);
    });

    function updatePotAchtergrond(potElement) {
        const ingredientKleuren = potElement.ingredienten; // Haal de array van ingredient kleuren op
    
        if (ingredientKleuren.length === 0) {
            // Lege pot: zet standaard achtergrond (lichtgrijs, of wat je wilt)
            potElement.style.backgroundColor = 'lightgray'; // Of een andere standaard kleur voor lege pot
            potElement.style.backgroundImage = 'none'; // Verwijder eventuele background image (gradient)
            return; // Stop hier, er zijn geen ingredienten om weer te geven
        }
    
        if (ingredientKleuren.length === 1) {
            // 1 ingredient: simpele achtergrondkleur
            potElement.style.backgroundColor = ingredientKleuren[0];
            potElement.style.backgroundImage = 'none'; // Verwijder eventuele background image (gradient)
            return; // Stop hier
        }
    
        // Meer dan 1 ingredient: maak een linear-gradient achtergrond
        let gradientString = 'linear-gradient(to bottom'; // Start van de linear-gradient string
    
        const hoogtePerKleur = 100 / ingredientKleuren.length; // Bereken de hoogte per kleur in percentage
    
        for (let i = 0; i < ingredientKleuren.length; i++) {
            const kleur = ingredientKleuren[i];
            const startPercentage = i * hoogtePerKleur; // Startpositie van deze kleur in de gradient
            const endPercentage = (i + 1) * hoogtePerKleur; // Eindpositie van deze kleur
    
            gradientString += `, ${kleur} ${startPercentage}% ${endPercentage}%`; // Voeg kleurstop toe aan de gradient string
        }
    
        gradientString += ')'; // Sluit de linear-gradient string af
    
        potElement.style.backgroundImage = gradientString; // Stel de backgroundImage in met de dynamische gradient
        potElement.style.backgroundColor = 'transparent'; //  Zorg ervoor dat backgroundColor niet in de weg zit van de gradient (zet op transparent)
    }
});