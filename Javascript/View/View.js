class View{
    constructor(){
        this.MengHal1Knop = document.getElementById('MengHal1');
        this.MengHal2Knop = document.getElementById('MengHal2');
        this.KleurenTestKnop = document.getElementById('KleurenTest');
        this.Hal1 = document.getElementById('hal-1');
        this.Hal2 = document.getElementById('hal-2');
        this.KleurenTest = document.getElementById('kleurentest-pagina');
        
        this.nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
        this.ingredientFormulier = document.getElementById('ingredient-formulier');
    }

    ShowMengHal1(){
        this.MengHal1Knop.classList.add('active');
        this.Hal1.classList.add('active');

        if (this.MengHal2Knop.classList.contains('active')) {
            this.MengHal2Knop.classList.remove('active');
        }
        if (this.Hal2.classList.contains('active')) {
            this.Hal2.classList.remove('active');
        }

        if (this.KleurenTestKnop.classList.contains('active')) {
            this.KleurenTestKnop.classList.remove('active');
        }
        if (this.KleurenTest.classList.contains('active')) {
            this.KleurenTest.classList.remove('active');
        }
    }

    ShowMengHal2(){
        this.MengHal2Knop.classList.add('active');
        this.Hal2.classList.add('active');

        if (this.MengHal1Knop.classList.contains('active')) {
            this.MengHal1Knop.classList.remove('active');
        }
        if (this.Hal1.classList.contains('active')) {
            this.Hal1.classList.remove('active');
        }

        if (this.KleurenTestKnop.classList.contains('active')) {
            this.KleurenTestKnop.classList.remove('active');
        }
        if (this.KleurenTest.classList.contains('active')) {
            this.KleurenTest.classList.remove('active');
        }
    }

    ShowKleurenTest(){
        this.KleurenTestKnop.classList.add('active');
        this.KleurenTest.classList.add('active');

        if (this.MengHal1Knop.classList.contains('active')) {
            this.MengHal1Knop.classList.remove('active');
        }
        if (this.Hal1.classList.contains('active')) {
            this.Hal1.classList.remove('active');
        }

        if (this.MengHal2Knop.classList.contains('active')) {
            this.MengHal2Knop.classList.remove('active');
        }
        if (this.Hal2.classList.contains('active')) {
            this.Hal2.classList.remove('active');
        }
    }

    ShowNewIngredientForm(){
        this.ingredientFormulier.style.display = 'block';
        this.nieuwIngredientKnop.style.display = 'none';
    }
}

export default View;