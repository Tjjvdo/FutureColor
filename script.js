document.addEventListener('DOMContentLoaded', () => {
    const nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
    const ingredientFormulier = document.getElementById('ingredient-formulier');
    const ingredientToevoegenKnop = document.getElementById('ingredient-toevoegen-knop');
    const annuleerIngredientKnop = document.getElementById('annuleer-ingredient-knop');
    const ingredientenLijstContainer = document.getElementById('ingredienten-lijst');
    const kleurTypeSelect = document.getElementById('kleur-type');
    const rgbInputsDiv = document.getElementById('kleur-rgb-inputs');
    const hslInputsDiv = document.getElementById('kleur-hsl-inputs');

    // Event listener voor "Nieuw Ingrediënt Maken" knop
    nieuwIngredientKnop.addEventListener('click', () => {
        ingredientFormulier.style.display = 'block'; // Toon formulier
        nieuwIngredientKnop.style.display = 'none'; // Verberg de "Nieuw Ingrediënt Maken" knop
    });

    // Event listener voor "Annuleren" knop
    annuleerIngredientKnop.addEventListener('click', () => {
        ingredientFormulier.style.display = 'none'; // Verberg formulier
        nieuwIngredientKnop.style.display = 'block'; // Toon de "Nieuw Ingrediënt Maken" knop
    });

    // Event listener voor kleur type selectie
    kleurTypeSelect.addEventListener('change', () => {
        if (kleurTypeSelect.value === 'rgb') {
            rgbInputsDiv.style.display = 'block';
            hslInputsDiv.style.display = 'none';
        } else if (kleurTypeSelect.value === 'hsl') {
            rgbInputsDiv.style.display = 'none';
            hslInputsDiv.style.display = 'block';
        }
    });


    // Event listener voor "Ingrediënt Toevoegen" knop
    ingredientToevoegenKnop.addEventListener('click', () => {
        // 1. Lees de waarden uit het formulier
        const mengtijd = parseInt(document.getElementById('mengtijd').value);
        const mengsnelheid = parseInt(document.getElementById('mengsnelheid').value);
        const kleurType = document.getElementById('kleur-type').value;
        let kleur = {};
        if (kleurType === 'rgb') {
            kleur = {
                type: 'rgb',
                rood: parseInt(document.getElementById('rgb-rood').value),
                groen: parseInt(document.getElementById('rgb-groen').value),
                blauw: parseInt(document.getElementById('rgb-blauw').value)
            };
        } else if (kleurType === 'hsl') {
            kleur = {
                type: 'hsl',
                hue: parseInt(document.getElementById('hsl-hue').value),
                saturation: parseInt(document.getElementById('hsl-saturation').value),
                lightness: parseInt(document.getElementById('hsl-lightness').value)
            };
        }
        const structuur = document.getElementById('structuur').value;

        // 2. Maak een ingrediënt object
        const nieuwIngredient = {
            mengtijd: mengtijd,
            mengsnelheid: mengsnelheid,
            kleur: kleur,
            structuur: structuur
        };

        // 3. Maak een visuele representatie van het ingrediënt
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingrediënt-voorbeeld'); // Hergebruik styling van CSS
        ingredientElement.title = `Mengtijd: ${mengtijd}ms, Mengsnelheid: ${mengsnelheid}, Structuur: ${structuur}`; // Tooltip

        // Stel de achtergrondkleur in op basis van RGB of HSL
        if (nieuwIngredient.kleur.type === 'rgb') {
            ingredientElement.style.backgroundColor = `rgb(${nieuwIngredient.kleur.rood}, ${nieuwIngredient.kleur.groen}, ${nieuwIngredient.kleur.blauw})`;
        } else if (nieuwIngredient.kleur.type === 'hsl') {
            ingredientElement.style.backgroundColor = `hsl(${nieuwIngredient.kleur.hue}, ${nieuwIngredient.kleur.saturation}%, ${nieuwIngredient.kleur.lightness}%)`;
        }

        // Voeg eventueel structuur visueel toe (voorbeeld met randen)
        if (nieuwIngredient.structuur === 'korrel') {
            ingredientElement.style.borderStyle = 'dotted';
        } else if (nieuwIngredient.structuur === 'grove-korrel') {
            ingredientElement.style.borderStyle = 'dashed';
            ingredientElement.style.borderWidth = '2px';
        } else if (nieuwIngredient.structuur === 'slijmerig') {
            ingredientElement.style.borderRadius = '50%'; // Maak cirkelvormig voor "slijmerig"
        }


        // 4. Voeg de visuele representatie toe aan de lijst
        ingredientenLijstContainer.appendChild(ingredientElement);

        // 5. Reset en verberg het formulier, toon "Nieuw Ingrediënt Maken" knop weer
        ingredientFormulier.reset(); // Reset formulier velden
        ingredientFormulier.style.display = 'none';
        nieuwIngredientKnop.style.display = 'block';
    });
});