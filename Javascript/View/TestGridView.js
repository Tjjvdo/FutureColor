class TestGridView{
    constructor(){
        this.kleurenGridContainer = document.getElementById('kleur-grid');
    }

    MaakTestGrid(vierkantjes, gridGrote, controller){
        const vierkantBreedte = 85;

        this.kleurenGridContainer.innerHTML = '';
        vierkantjes.forEach(vierkantje => {
            vierkantje.vierkantElement = document.createElement('div');
            vierkantje.vierkantElement.classList.add('kleur-vierkantje');
            this.addEventListeners(vierkantje, controller);
            this.kleurenGridContainer.appendChild(vierkantje.vierkantElement);
        });

        this.kleurenGridContainer.style.maxWidth = `${gridGrote * vierkantBreedte}px`;
    }

    addEventListeners(vierkantje, controller) {
        this.addDragoverListener(vierkantje);
        this.addDropListener(vierkantje, controller);
        this.addClickListener(vierkantje, controller);
    }

    addDragoverListener(vierkantje) {
        vierkantje.vierkantElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
    }

    addDropListener(vierkantje, controller) {
        vierkantje.vierkantElement.addEventListener('drop', (event) => controller.handleVierkantDrop(vierkantje, event));
    }

    addClickListener(vierkantje, controller){
        vierkantje.vierkantElement.addEventListener('click', () => controller.handleVierkantClick(vierkantje));
    }

    cloneKleur(vierkantje, ingredientElementOrigineel){
        const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true);
        ingredientElementKloon.style.boxSizing = "";
        vierkantje.vierkantElement.appendChild(ingredientElementKloon);

        ingredientElementKloon.draggable = false;
    }

    showTriadicColorsPopup(clickedthis, originalRgb, triadicRgbColors, triadicHslColors) {
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('triadic-popup');
        popupContainer.style.position = 'absolute';

        popupContainer.style.left = `${clickedthis.vierkantElement.offsetLeft + clickedthis.vierkantElement.offsetWidth + 10}px`;
        popupContainer.style.top = `${clickedthis.vierkantElement.offsetTop - 15}px`;

        const originalColorDiv = document.createElement('div');
        originalColorDiv.classList.add('triadic-color-box');
        originalColorDiv.style.backgroundColor = originalRgb;
        popupContainer.appendChild(originalColorDiv);

        triadicRgbColors.forEach((rgbColor, index) => {
            const triadicColorDiv = document.createElement('div');
            triadicColorDiv.classList.add('triadic-color-box');
            triadicColorDiv.style.backgroundColor = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
            popupContainer.appendChild(triadicColorDiv);

            const hslCodePara = document.createElement('p');
            const hslCode = triadicHslColors[index];
            hslCodePara.textContent = `HSL: ${hslCode.h.toFixed(0)}°, ${hslCode.s.toFixed(0)}%, ${hslCode.l.toFixed(0)}%`;
            hslCodePara.classList.add('triadic-color-code');
            triadicColorDiv.appendChild(hslCodePara);
        });

        const kleurentestPagina = document.getElementById('kleurentest-pagina');
        kleurentestPagina.appendChild(popupContainer);

        const removePopupListener = (event) => {
            if (!popupContainer.contains(event.target)) {
                popupContainer.remove();
                document.removeEventListener('click', removePopupListener);
            }
        };
        setTimeout(() => {
            document.addEventListener('click', removePopupListener);
        }, 0);
    }
}

export default TestGridView;