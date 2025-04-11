class Pot {
    constructor() {
        this.potId = Date.now();
        this.potStatus = 'in-hal';
    }

    isDezelfdeMengSnelheid(ingredientChildren, ingredientElementOrigineel) {
        if (ingredientChildren.length > 0) {
            let titleText = ingredientChildren[0].title;
            let titleParts = titleText.split(',').map(part => part.trim());

            let mengsnelheid = parseInt(titleParts[1].split(': ')[1]);

            let nieuwIngredientTitleText = ingredientElementOrigineel.title;
            let nieuwIngredientTitleParts = nieuwIngredientTitleText.split(',').map(part => part.trim());

            let nieuwIngredientmengsnelheid = parseInt(nieuwIngredientTitleParts[1].split(': ')[1]);

            if (mengsnelheid === nieuwIngredientmengsnelheid) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}

export default Pot;