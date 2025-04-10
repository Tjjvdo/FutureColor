class IngredientView{
    constructor(){        
        this.nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
        this.ingredientFormulier = document.getElementById('ingredient-formulier');
        this.ingredientenLijstContainer = document.getElementById('ingredienten-lijst');
        
    }

    ToonNieuwIngredientForm(){
        this.ingredientFormulier.style.display = 'block';
        this.nieuwIngredientKnop.style.display = 'none';
    }

    VerbergIngredientForm(){
        this.ingredientFormulier.style.display = 'none';
        this.nieuwIngredientKnop.style.display = 'block';
    }

    NieuwIngredientToevoegen(ingredient){
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingrediënt');
        ingredientElement.title = `Mengtijd: ${ingredient.mengtijd}ms, Mengsnelheid: ${ingredient.mengsnelheid}, Structuur: ${ingredient.structuur}`;
        ingredientElement.style.backgroundColor = `rgb(${ingredient.kleur.rood}, ${ingredient.kleur.groen}, ${ingredient.kleur.blauw})`;

        // Pas styling aan op basis van structuur
        switch (ingredient.structuur) {
            case 'korrel':
                ingredientElement.style.borderStyle = 'dotted';
                break;
            case 'grove-korrel':
                ingredientElement.style.borderStyle = 'dashed';
                ingredientElement.style.borderWidth = '2px';
                break;
            case 'slijmerig':
                ingredientElement.style.borderRadius = '50%';
                break;
        }

        ingredientElement.dataset.ingredientId = ingredient.id;
        ingredientElement.draggable = true;

        this.ingredientenLijstContainer.appendChild(ingredientElement);

        ingredientElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', ingredient.id);
        });

        this.ingredientFormulier.reset();
        this.ingredientFormulier.style.display = 'none';
        this.nieuwIngredientKnop.style.display = 'block';
    }

    MarkeerFoutiefVeld(field){
        field.classList.add('fout-veld');
    }

    ResetErrors(){
        const foutieveVelden = document.querySelectorAll('.fout-veld');
        foutieveVelden.forEach(veld => {
            veld.classList.remove('fout-veld');
        });
    }
}

export default IngredientView;