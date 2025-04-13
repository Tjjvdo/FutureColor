import View from '../View/View.js';
import IngredientView from '../View/IngredientView.js';
import PotView from '../View/PotView.js';
import MengMachinesView from '../View/MengMachinesView.js';
import TestGridView from '../View/TestGridView.js';
import WeerView from '../View/WeerView.js';

import WeatherAPI from '../Model/WeatherAPI.js';
import Ingredient from '../Model/ingredient.js';
import Pot from '../Model/pot.js';
import Mengmachine from '../Model/mengmachine.js';
import Vierkant from '../Model/vierkant.js';

class Controller {
    constructor() {
        // Views
        this.view = new View();
        this.ingredientView = new IngredientView();
        this.potView = new PotView();
        this.mengMachinesView = new MengMachinesView();
        this.testGridView = new TestGridView();
        this.weerView = new WeerView();

        // Weather API
        this.weatherAPI = new WeatherAPI(this);

        // Navigatie
        this.MengHal1Knop = document.getElementById('MengHal1');
        this.MengHal2Knop = document.getElementById('MengHal2');
        this.KleurenTestKnop = document.getElementById('KleurenTest');

        this.MengHal1Knop.addEventListener('click', () => {
            this.view.ToonMengHal1();
        });

        this.MengHal2Knop.addEventListener('click', () => {
            this.view.ToonMengHal2();
        });

        this.KleurenTestKnop.addEventListener('click', () => {
            this.view.ToonKleurenTest();
        });

        // Ingrediënten, potten en mengmachines knoppen
        this.nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
        this.ingredientToevoegenKnop = document.getElementById('ingredient-toevoegen-knop');
        this.annuleerIngredientKnop = document.getElementById('annuleer-ingredient-knop');
        this.nieuwePotKnopHal1 = document.getElementById('nieuwe-pot-knop-hal-1');
        this.nieuwePotKnopHal2 = document.getElementById('nieuwe-pot-knop-hal-2');
        this.nieuweMengmachineKnopHal1 = document.getElementById('nieuwe-mengmachine-knop-hal-1');
        this.nieuweMengmachineKnopHal2 = document.getElementById('nieuwe-mengmachine-knop-hal-2');
        this.gemengdePottenHal1 = document.getElementById('gemengde-potten-hal-1');
        this.gemengdePottenHal2 = document.getElementById('gemengde-potten-hal-2');
        this.nieuweKleurenTestGridKnop = document.getElementById('nieuw-kleuren-test-grid-knop');
        this.gridGrootteInput = document.getElementById('grid-grootte-input');

        // Ingredienten
        this.nieuwIngredientKnop.addEventListener('click', () => {
            this.ingredientView.ToonNieuwIngredientForm();
        });

        this.annuleerIngredientKnop.addEventListener('click', () => {
            this.ingredientView.VerbergIngredientForm();
        });

        this.ingredientToevoegenKnop.addEventListener('click', () => {
            this.ingredientView.ResetErrors();

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

            if (this.valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur)) {
                return;
            }

            const kleur = { type: 'rgb', rood, groen, blauw };
            const nieuwIngredient = new Ingredient(mengtijd, mengsnelheid, kleur, structuur);

            this.ingredientView.NieuwIngredientToevoegenAanIngredientenLijst(nieuwIngredient);
        });

        // Potten
        this.nieuwePotKnopHal1.addEventListener('click', () => {
            const pot = new Pot();

            this.potView.MaakNieuwePotHal1(pot, this);
        });

        this.nieuwePotKnopHal2.addEventListener('click', () => {
            const pot = new Pot();

            this.potView.MaakNieuwePotHal2(pot, this);
        });

        // Mengmachines
        this.nieuweMengmachineKnopHal1.addEventListener('click', () => {
            const machine = new Mengmachine(this.gemengdePottenHal1);

            this.mengMachinesView.MaakNieuweMengmachineHal1(machine, this);
        });

        this.nieuweMengmachineKnopHal2.addEventListener('click', () => {
            const machine = new Mengmachine(this.gemengdePottenHal2);

            this.mengMachinesView.MaakNieuweMengmachineHal2(machine, this);
        });

        // Test grid
        this.nieuweKleurenTestGridKnop.addEventListener('click', () => {
            const gridGrote = parseInt(this.gridGrootteInput.value);
            const vierkantjes = [];
            for (let i = 0; i < gridGrote * gridGrote; i++) {
                let vierkant = new Vierkant();
                vierkantjes.push(vierkant);
            }
            this.testGridView.MaakTestGrid(vierkantjes, gridGrote, this);
        });

        // Weer & status
        this.temperatuurInput = document.getElementById("temperatuur");
        this.weerstypeSelect = document.getElementById("weerstype");

        this.temperatuurInput.addEventListener('change', () => {
            let tempValue = parseFloat(this.temperatuurInput.value);

            if (tempValue < -30) {
                tempValue = -30;
            } else if (tempValue > 60) {
                tempValue = 60;
            }

            this.weerView.voegTemperatuurEffectenLijstToe(tempValue);
        });

        this.weerstypeSelect.addEventListener('change', () => {
            let weertype = this.weerstypeSelect.value;

            this.weerView.voegWeerstypeEffectenLijstToe(weertype);
        });
    }

    // Validatie functie
    valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur) {
        let heeftFouten = false;
        let foutmelding = "De volgende velden zijn verplicht en moeten correct ingevuld zijn:\n";

        if (isNaN(mengtijd) || mengtijd <= 0) {
            heeftFouten = true;
            foutmelding += "- Mengtijd (moet een getal groter dan 0 zijn)\n";
            this.ingredientView.MarkeerFoutiefVeld(mengtijdInput);
        }

        if (isNaN(mengsnelheid) || mengsnelheid <= 0) {
            heeftFouten = true;
            foutmelding += "- Mengsnelheid (moet een getal groter dan 0 zijn)\n";
            this.ingredientView.MarkeerFoutiefVeld(mengsnelheidInput);
        }

        if (isNaN(rood) || rood < 0 || rood > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Rood (moet een getal tussen 0 en 255 zijn)\n";
            this.ingredientView.MarkeerFoutiefVeld(rgbRoodInput);
        }

        if (isNaN(groen) || groen < 0 || groen > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Groen (moet een getal tussen 0 en 255 zijn)\n";
            this.ingredientView.MarkeerFoutiefVeld(rgbGroenInput);
        }

        if (isNaN(blauw) || blauw < 0 || blauw > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Blauw (moet een getal tussen 0 en 255 zijn)\n";
            this.ingredientView.MarkeerFoutiefVeld(rgbBlauwInput);
        }

        if (!structuur) {
            heeftFouten = true;
            foutmelding += "- Structuur (selecteer een structuur)\n";
            this.ingredientView.MarkeerFoutiefVeld(structuurSelect);
        }

        if (heeftFouten) {
            return true;
        }
    }

    // Pot functies
    isDezelfdeMengSnelheidPot(pot, ingredientChildren, ingredientElementOrigineel) {
        return pot.isDezelfdeMengSnelheid(ingredientChildren, ingredientElementOrigineel);
    }

    // Mengmachine functies
    handleMixClick(machine) {
        // check of hij niet al aan het mixen is, anders bugt hij
        const mixerStatus = machine.mengmachineElement.dataset.mixerStatus;
        // check of je mag gaan mixen
        if (mixerStatus !== 'mixen' && !this.weatherAPI.max1Machine() || machine.getAantalActieveMachines() < 1) {
            const result = machine.handleMixClick();

            // geeft anders error als je geen pot in de machine hebt
            if (result) {
                const [nieuwIngredient, potElementOrigineel, gemengdePottenHal] = result;
                const gemengdeIngredient = new Ingredient(nieuwIngredient.mengtijd, nieuwIngredient.mengsnelheid, nieuwIngredient.kleur, nieuwIngredient.structuur);

                // start animatie in de view
                this.mengMachinesView.startAnimatie(machine, 3 / nieuwIngredient.mengsnelheid);

                // bereken de mengtijd
                let mengtijd = nieuwIngredient.mengtijd * this.weatherAPI.getTijdMultiplier();

                // stel deze functie uit voor de mengtijd
                setTimeout(() => {
                    const ingredientElement = this.ingredientView.NieuwIngredientToevoegenAanGemengdeLijst(gemengdeIngredient);
                    this.potView.VerplaatsPotNaarGemengdeHal(ingredientElement, potElementOrigineel, gemengdePottenHal);
                    machine.resetStatus();
                    
                    // stop animatie in de view
                    this.mengMachinesView.stopAnimatie(machine);
                }, mengtijd);
            }
        }
    }

    handleMixDragOver(machine, event) {
        machine.handleDragOver(event);
    }

    handleMixDrop(machine, event) {
        machine.handleDrop(event, this);
    }

    // Testgrid functies
    handleVierkantDrop(vierkantje, event) {
        const ingredientElementOrigineel = vierkantje.addDropListener(event);

        if (ingredientElementOrigineel) {
            this.testGridView.cloneKleur(vierkantje, ingredientElementOrigineel)
        }
    }

    handleVierkantClick(vierkantje) {
        const [ingredientAchtergrond, triadicRgbColors, triadicHslColors] = vierkantje.addClickListener();
        this.testGridView.showTriadicColorsPopup(vierkantje, ingredientAchtergrond, triadicRgbColors, triadicHslColors);
    }

    handleError(error) {
        this.view.showError(error);
    }
}

export default Controller;
