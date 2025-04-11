import View from '../View/View.js';
import IngredientView from '../View/IngredientView.js';
import PotView from '../View/PotView.js';
import MengMachinesView from '../View/MengMachinesView.js';

import WeatherAPI from '../Model/WeatherAPI.js';
import Ingredient from '../Model/ingredient.js';
import Pot from '../Model/pot.js';
import Mengmachine from '../Model/mengmachine.js';
import TestGrid from '../Model/testgrid.js';

class Controller{
    constructor(){
        // Views
        this.view = new View();
        this.ingredientView = new IngredientView();
        this.potView = new PotView();
        this.mengMachinesView = new MengMachinesView();

        // Weather API
        this.weatherAPI = new WeatherAPI();
        
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
        this.kleurenGridContainer = document.getElementById('kleur-grid');
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
            const machine = new Mengmachine(this.gemengdePottenHal1);
    
            this.mengMachinesView.MaakNieuweMengmachineHal2(machine, this);
        });

        // Test grid
        this.nieuweKleurenTestGridKnop.addEventListener('click', () => {
            const gridGrote = parseInt(this.gridGrootteInput.value);
            const vierkantBreedte = 85;

            const testGrid = new TestGrid(gridGrote);
            let testGridVierkantjes = testGrid.getElementen();

            this.kleurenGridContainer.innerHTML = '';
            testGridVierkantjes.forEach(vierkantje => {
                this.kleurenGridContainer.appendChild(vierkantje);
            });

            this.kleurenGridContainer.style.maxWidth = `${gridGrote * vierkantBreedte}px`;
        });

        // Weer & status
        this.invloedenUl = document.getElementById("invloedenLijst");
        this.temperatuurInput = document.getElementById("temperatuur");
        this.weerstypeSelect = document.getElementById("weerstype");

        this.temperatuurInput.addEventListener('change', () => {
            let tempValue = parseFloat(this.temperatuurInput.value);

            if(tempValue < -30){
                this.temperatuurInput.value = -30
                tempValue = -30;
            }else if(tempValue > 60){
                this.temperatuurInput.value = 60;
                tempValue = 60;
            }
            
            let invloedText = document.createElement("li");
            invloedText.setAttribute("id", "temperatuursinvloed");
            let erIsInvloed = false;
            
            if(tempValue > 35){
                invloedText.textContent= "Maximaal 1 mengmachine per hal mag draaien wegens hoge temperatuur!";
                erIsInvloed = true;
            }

            if(tempValue < 10){
                invloedText.textContent = "Alle mengtijden zijn 15% langer wegens lage temperatuur!";
                erIsInvloed = true;
            }

            let liElementen = this.invloedenUl.getElementsByTagName('li');

            this.verwijderWeersInvloeden(liElementen, "temperatuursinvloed");

            if(erIsInvloed){
                this.invloedenUl.insertBefore(invloedText, this.invloedenUl.children[0]);
            }
        });

        this.weerstypeSelect.addEventListener('change', () => {
            let weertype = this.weerstypeSelect.value;

            let liElementen = this.invloedenUl.getElementsByTagName('li');

            let invloedText = document.createElement("li");
            invloedText.setAttribute("id", "weerstypeInvloed");
            let erIsInvloed = false;

            this.verwijderWeersInvloeden(liElementen, "weerstypeInvloed");

            if(weertype === "regen" || weertype === "sneeuw"){
                invloedText.textContent= "Alle mengtijden zijn 10% langer omdat het " + weertype + "t!";
                erIsInvloed = true;
            }

            if(erIsInvloed){
                this.invloedenUl.appendChild(invloedText, this.invloedenUl.children[0]);
            }
        });
    }

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

    isDezelfdeMengSnelheidPot(pot, ingredientChildren, ingredientElementOrigineel){
        return pot.isDezelfdeMengSnelheid(ingredientChildren, ingredientElementOrigineel);
    }

    handleMixClick(machine){
        const [nieuwIngredient, potElementOrigineel, gemengdePottenHal] = machine.handleMixClick();
        const gemengdeIngredient = new Ingredient(nieuwIngredient.mengtijd, nieuwIngredient.mengsnelheid, nieuwIngredient.kleur, nieuwIngredient.structuur);

        const ingredientElement = this.ingredientView.NieuwIngredientToevoegenAanGemengdeLijst(gemengdeIngredient);

        this.potView.VerplaatsPotNaarGemengdeHal(ingredientElement, potElementOrigineel, gemengdePottenHal);
    }

    handleMixDragOver(machine, event){
        machine.handleDragOver(event);
    }

    handleMixDrop(machine, event){
        machine.handleDrop(event);
    }

    verwijderWeersInvloeden(liElementen, liId){
        if (liElementen.length > 0) {
            Array.from(liElementen).forEach((li) => {
                if(li.id && li.id === liId){
                    li.remove();
                }
            });
        }
    }
}

export default Controller;