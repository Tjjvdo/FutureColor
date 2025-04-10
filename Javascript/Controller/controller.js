import View from '../View/View.js';
import IngredientView from '../View/IngredientView.js';

import WeatherAPI from '../Model/WeatherAPI.js';
import Ingredient from '../Model/ingredient.js';
import Pot from '../Model/pot.js';
import Mengmachine from '../Model/mengmachine.js';
import TestGrid from '../Model/testgrid.js';

document.addEventListener('DOMContentLoaded', () => {
    // Views
    const view = new View();
    const ingredientView = new IngredientView();

    // Weather API
    const weatherAPI = new WeatherAPI();
    
    // Navigatie
    const MengHal1Knop = document.getElementById('MengHal1');
    const MengHal2Knop = document.getElementById('MengHal2');
    const KleurenTestKnop = document.getElementById('KleurenTest');

    MengHal1Knop.addEventListener('click', () => {
        view.ToonMengHal1();
    });

    MengHal2Knop.addEventListener('click', () => {
        view.ToonMengHal2();
    });

    KleurenTestKnop.addEventListener('click', () => {
        view.ToonKleurenTest();
    });

    // Ingrediënten, potten en mengmachines + respectievelijke knoppen
    const nieuwIngredientKnop = document.getElementById('nieuw-ingredient-knop');
    const ingredientToevoegenKnop = document.getElementById('ingredient-toevoegen-knop');
    const annuleerIngredientKnop = document.getElementById('annuleer-ingredient-knop');
    const nieuwePotKnopHal1 = document.getElementById('nieuwe-pot-knop-hal-1');
    const pottenHal1Container = document.getElementById('potten-hal-1');
    const nieuwePotKnopHal2 = document.getElementById('nieuwe-pot-knop-hal-2');
    const pottenHal2Container = document.getElementById('potten-hal-2');
    const nieuweMengmachineKnopHal1 = document.getElementById('nieuwe-mengmachine-knop-hal-1');
    const mengmachinesHal1Container = document.getElementById('mengmachines-hal-1');
    const nieuweMengmachineKnopHal2 = document.getElementById('nieuwe-mengmachine-knop-hal-2');
    const mengmachinesHal2Container = document.getElementById('mengmachines-hal-2');
    const gemengdePottenHal1 = document.getElementById('gemengde-potten-hal-1');
    const gemengdePottenHal2 = document.getElementById('gemengde-potten-hal-2');
    const nieuweKleurenTestGridKnop = document.getElementById('nieuw-kleuren-test-grid-knop');
    const kleurenGridContainer = document.getElementById('kleur-grid');
    const gridGrootteInput = document.getElementById('grid-grootte-input');


    // Ingredienten
    nieuwIngredientKnop.addEventListener('click', () => {
        ingredientView.ToonNieuwIngredientForm();
    });

    annuleerIngredientKnop.addEventListener('click', () => {
        ingredientView.VerbergIngredientForm();
    });

    ingredientToevoegenKnop.addEventListener('click', () => {
        ingredientView.ResetErrors();

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

        if (valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur)) {
            return;
        }

        const kleur = { type: 'rgb', rood, groen, blauw };
        const nieuwIngredient = new Ingredient(mengtijd, mengsnelheid, kleur, structuur);

        ingredientView.NieuwIngredientToevoegen(nieuwIngredient);
    });

    function valideerVelden(mengtijdInput, mengsnelheidInput, rgbRoodInput, rgbGroenInput, rgbBlauwInput, rood, groen, blauw, mengtijd, mengsnelheid, structuur) {
        let heeftFouten = false;
        let foutmelding = "De volgende velden zijn verplicht en moeten correct ingevuld zijn:\n";

        if (isNaN(mengtijd) || mengtijd <= 0) {
            heeftFouten = true;
            foutmelding += "- Mengtijd (moet een getal groter dan 0 zijn)\n";
            ingredientView.MarkeerFoutiefVeld(mengtijdInput);
        }

        if (isNaN(mengsnelheid) || mengsnelheid <= 0) {
            heeftFouten = true;
            foutmelding += "- Mengsnelheid (moet een getal groter dan 0 zijn)\n";
            ingredientView.MarkeerFoutiefVeld(mengsnelheidInput);
        }

        if (isNaN(rood) || rood < 0 || rood > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Rood (moet een getal tussen 0 en 255 zijn)\n";
            ingredientView.MarkeerFoutiefVeld(rgbRoodInput);
        }

        if (isNaN(groen) || groen < 0 || groen > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Groen (moet een getal tussen 0 en 255 zijn)\n";
            ingredientView.MarkeerFoutiefVeld(rgbGroenInput);
        }

        if (isNaN(blauw) || blauw < 0 || blauw > 255) {
            heeftFouten = true;
            foutmelding += "- RGB Blauw (moet een getal tussen 0 en 255 zijn)\n";
            ingredientView.MarkeerFoutiefVeld(rgbBlauwInput);
        }

        if (!structuur) {
            heeftFouten = true;
            foutmelding += "- Structuur (selecteer een structuur)\n";
            ingredientView.MarkeerFoutiefVeld(structuurSelect);
        }

        if (heeftFouten) {
            return true;
        }
    }

    // Potten
    nieuwePotKnopHal1.addEventListener('click', () => {
        const pot = new Pot();
        const potElement = pot.getElement();

        pottenHal1Container.appendChild(potElement);
    });

    nieuwePotKnopHal2.addEventListener('click', () => {
        const pot = new Pot();
        const potElement = pot.getElement();

        pottenHal2Container.appendChild(potElement);
    });

    // Mengmachines
    nieuweMengmachineKnopHal1.addEventListener('click', () => {
        const machine = new Mengmachine(gemengdePottenHal1);
        const machineContainer = machine.getElement();

        mengmachinesHal1Container.appendChild(machineContainer);
    });

    nieuweMengmachineKnopHal2.addEventListener('click', () => {
        const machine = new Mengmachine(gemengdePottenHal2);
        const machineContainer = machine.getElement();

        mengmachinesHal2Container.appendChild(machineContainer);
    });

    // Test grid
    nieuweKleurenTestGridKnop.addEventListener('click', () => {
        const gridGrote = parseInt(gridGrootteInput.value);
        const vierkantBreedte = 85;

        const testGrid = new TestGrid(gridGrote);
        let testGridVierkantjes = testGrid.getElementen();

        kleurenGridContainer.innerHTML = '';
        testGridVierkantjes.forEach(vierkantje => {
            kleurenGridContainer.appendChild(vierkantje);
        });

        kleurenGridContainer.style.maxWidth = `${gridGrote * vierkantBreedte}px`;
    });

    // Weer & status
    const invloedenUl = document.getElementById("invloedenLijst");
    const temperatuurInput = document.getElementById("temperatuur");
    const weerstypeSelect = document.getElementById("weerstype");

    temperatuurInput.addEventListener('change', () => {
        let tempValue = parseFloat(temperatuurInput.value);

        if(tempValue < -30){
            temperatuurInput.value = -30
            tempValue = -30;
        }else if(tempValue > 60){
            temperatuurInput.value = 60;
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

        let liElementen = invloedenUl.getElementsByTagName('li');

        verwijderWeersInvloeden(liElementen, "temperatuursinvloed");

        if(erIsInvloed){
            invloedenUl.insertBefore(invloedText, invloedenUl.children[0]);
        }
    });

    weerstypeSelect.addEventListener('change', () => {
        let weertype = weerstypeSelect.value;

        let liElementen = invloedenUl.getElementsByTagName('li');

        let invloedText = document.createElement("li");
        invloedText.setAttribute("id", "weerstypeInvloed");
        let erIsInvloed = false;

        verwijderWeersInvloeden(liElementen, "weerstypeInvloed");

        if(weertype === "regen" || weertype === "sneeuw"){
            invloedText.textContent= "Alle mengtijden zijn 10% langer omdat het " + weertype + "t!";
            erIsInvloed = true;
        }

        if(erIsInvloed){
            invloedenUl.appendChild(invloedText, invloedenUl.children[0]);
        }
    });

    function verwijderWeersInvloeden(liElementen, liId){
        if (liElementen.length > 0) {
            Array.from(liElementen).forEach((li) => {
                if(li.id && li.id === liId){
                    li.remove();
                }
            });
        }
    }
});