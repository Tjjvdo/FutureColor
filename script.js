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

    // Event listener voor "Ingrediënt Toevoegen" knop
    ingredientToevoegenKnop.addEventListener('click', () => {
        // 1. Reset eventuele eerdere foutmeldingen (optioneel, maar netjes)
        resetFoutmeldingen();

        // 2. Lees de waarden uit het formulier
        const mengtijdInput = document.getElementById('mengtijd');
        const mengsnelheidInput = document.getElementById('mengsnelheid');
        const rgbRoodInput = document.getElementById('rgb-rood');
        const rgbGroenInput = document.getElementById('rgb-groen');
        const rgbBlauwInput = document.getElementById('rgb-blauw');
        const structuurSelect = document.getElementById('structuur');

        const mengtijd = parseInt(mengtijdInput.value);
        const mengsnelheid = parseInt(mengsnelheidInput.value);
        const rood = parseInt(rgbRoodInput.value);
        const groen = parseInt(rgbGroenInput.value);
        const blauw = parseInt(rgbBlauwInput.value);
        const structuur = structuurSelect.value;

        let heeftFouten = false;
        let foutmelding = "De volgende velden zijn verplicht en moeten correct ingevuld zijn:\n";

        // 3. Valideer de velden
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

        // 4. Maak een ingrediënt object (alleen als er GEEN fouten zijn)
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
            structuur: structuur
        };

        // 5. Maak een visuele representatie van het ingrediënt
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingrediënt-voorbeeld');
        ingredientElement.title = `Mengtijd: ${mengtijd}ms, Mengsnelheid: ${mengsnelheid}, Structuur: ${structuur}`;
        ingredientElement.style.backgroundColor = `rgb(${nieuwIngredient.kleur.rood}, ${nieuwIngredient.kleur.groen}, ${nieuwIngredient.kleur.blauw})`;

        if (nieuwIngredient.structuur === 'korrel') {
            ingredientElement.style.borderStyle = 'dotted';
        } else if (nieuwIngredient.structuur === 'grove-korrel') {
            ingredientElement.style.borderStyle = 'dashed';
            ingredientElement.style.borderWidth = '2px';
        } else if (nieuwIngredient.structuur === 'slijmerig') {
            ingredientElement.style.borderRadius = '50%';
        }

        ingredientenLijstContainer.appendChild(ingredientElement);

        ingredientFormulier.reset();
        ingredientFormulier.style.display = 'none';
        nieuwIngredientKnop.style.display = 'block';
    });

    function markeerFoutiefVeld(veld) {
        veld.classList.add('fout-veld');
    }

    function resetFoutmeldingen() {
        const foutieveVelden = document.querySelectorAll('.fout-veld');
        foutieveVelden.forEach(veld => {
            veld.classList.remove('fout-veld');
        });
    }

    nieuwePotKnopHal1.addEventListener('click', () => {
        const potElement = document.createElement('div');
        potElement.classList.add('pot-voorbeeld');
        potElement.title = `Lege pot`;

        pottenHal1Container.appendChild(potElement);
    });

    nieuwePotKnopHal2.addEventListener('click', () => {
        const potElement = document.createElement('div');
        potElement.classList.add('pot-voorbeeld');
        potElement.title = `Lege pot`;

        pottenHal2Container.appendChild(potElement);
    });
});