class Ingredient {
    constructor(mengtijd, mengsnelheid, kleur, structuur) {
        this.id = Date.now();
        this.mengtijd = mengtijd;
        this.mengsnelheid = mengsnelheid;
        this.kleur = kleur;
        this.structuur = structuur;
    }

    creëerElement() {
        const ingredientElement = document.createElement('div');
        ingredientElement.classList.add('ingrediënt');
        ingredientElement.title = `Mengtijd: ${this.mengtijd}ms, Mengsnelheid: ${this.mengsnelheid}, Structuur: ${this.structuur}`;
        ingredientElement.style.backgroundColor = `rgb(${this.kleur.rood}, ${this.kleur.groen}, ${this.kleur.blauw})`;

        // Pas styling aan op basis van structuur
        switch (this.structuur) {
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

        ingredientElement.dataset.ingredientId = this.id;
        ingredientElement.draggable = true;

        // Drag-and-drop functionaliteit
        ingredientElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', this.id);
        });

        return ingredientElement;
    }
}

export default Ingredient;