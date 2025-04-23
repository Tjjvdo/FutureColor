class Ingredient {
    constructor(mengtijd, mengsnelheid, kleur, structuur) {
        this.id = Date.now();
        this.mengtijd = mengtijd;
        this.mengsnelheid = mengsnelheid;
        this.kleur = kleur;
        this.structuur = structuur;
    }
}

export default Ingredient;