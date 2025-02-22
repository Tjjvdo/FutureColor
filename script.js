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

        valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, structuurInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur);

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

    function valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, structuurInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur){
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
            alert(foutmelding);
            return;
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
    
        console.log(ingredientData.structuur);
        console.log(ingredientData.mengsnelheid);
        console.log(ingredientData.mengtijd);

        if (ingredientData.structuur === 'korrel') {
            ingredientElement.style.borderStyle = 'dotted';
        } else if (ingredientData.structuur === 'grove-korrel') {
            ingredientElement.style.borderStyle = 'dashed';
            ingredientElement.style.borderWidth = '2px';
        } else if (ingredientData.structuur === 'slijmerig') {
            ingredientElement.style.borderRadius = '50%';
            console.log("Hij komt in Slijmerig");
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

        potElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        potElement.addEventListener('drop', (event) => {
            event.preventDefault();
            // **Nieuwe code: Haal nu het ingredient ID op uit de dataTransfer - START**
            const ingredientId = event.dataTransfer.getData('text/plain'); // Haal het ingredient ID op uit de dataTransfer
            // **Nieuwe code: Haal nu het ingredient ID op uit de dataTransfer - EINDE**

            if (ingredientId) { // Controleer of er een ingredientId is meegegeven (voor de zekerheid)
                // **Nieuwe code: Zoek het ORIGINELE ingredient element op basis van het ingredientId en data-attribuut - START**
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt-voorbeeld[data-ingredient-id="${ingredientId}"]`); // Zoek ingredient element met de matching data-ingredient-id
                // **Nieuwe code: Zoek het ORIGINELE ingredient element op basis van het ingredientId en data-attribuut - EINDE**

                if (ingredientElementOrigineel) {
                    // **Gebruik nu weer Klonen en voeg de KLOON toe aan de pot - START**
                    const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true); // Kloon het ingredient element
                    potElement.appendChild(ingredientElementKloon); // Voeg de KLOON toe aan de pot
                    alert(`Ingredient met ID ${ingredientId} gekloond en in pot gedropt!`); // Update test alert met ID
                    // **Gebruik nu weer Klonen en voeg de KLOON toe aan de pot - EINDE**

                } else {
                    alert(`Fout: Origineel ingredient element met ID ${ingredientId} NIET gevonden!`);
                }

            } else {
                alert('Fout: Geen ingredient ID ontvangen in dataTransfer!'); // Foutmelding als er geen ID is
            }
        });

        pottenHal1Container.appendChild(potElement);
    });

    nieuwePotKnopHal2.addEventListener('click', () => {
        const potElement = document.createElement('div');
        potElement.classList.add('pot-voorbeeld');
        potElement.title = `Lege pot`;

        pottenHal2Container.appendChild(potElement);
    });
});