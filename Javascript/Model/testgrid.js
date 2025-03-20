class TestGrid {
    constructor(gridGrote) {
        this.vierkantjes = [];

        for (let i = 0; i < gridGrote * gridGrote; i++) {
            const vierkantje = document.createElement('div');
            vierkantje.classList.add('kleur-vierkantje');
            this.addEventListeners(vierkantje);
            this.vierkantjes.push(vierkantje);
        }
    }

    addEventListeners(vierkantje) {
        this.addDragoverListener(vierkantje);
        this.addDropListener(vierkantje);
        this.addClickListener(vierkantje);
    }

    addDragoverListener(vierkantje) {
        vierkantje.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
    }

    addDropListener(vierkantje) {
        vierkantje.addEventListener('drop', (event) => {
            event.preventDefault();

            const ingredientId = event.dataTransfer.getData('text/plain');

            if (ingredientId) {
                const ingredientElementOrigineel = document.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

                if (ingredientElementOrigineel) {
                    if (vierkantje.children.length > 0) {
                        return;
                    }

                    const ingredientElementKloon = ingredientElementOrigineel.cloneNode(true);
                    ingredientElementKloon.style.boxSizing = "";
                    vierkantje.appendChild(ingredientElementKloon);

                    ingredientElementKloon.draggable = false;
                }
            }
        });
    }

    addClickListener(vierkantje) {
        vierkantje.addEventListener('click', () => {
            const vierkantjeElementOrigineel = vierkantje.querySelector('.ingrediënt');

            if (vierkantjeElementOrigineel) {
                let ingredientAchtergrond = vierkantjeElementOrigineel.style.backgroundColor;
                let rgbValues = ingredientAchtergrond.match(/\d+/g);

                if (rgbValues) {
                    let r = parseInt(rgbValues[0]);
                    let g = parseInt(rgbValues[1]);
                    let b = parseInt(rgbValues[2]);

                    const hslColor = rgbToHsl(r, g, b);
                    const triadicHslColors = getTriadicColorsHsl(hslColor);
                    const triadicRgbColors = triadicHslColors.map(hsl => hslToRgb(hsl.h, hsl.s, hsl.l));

                    this.showTriadicColorsPopup(vierkantje, ingredientAchtergrond, triadicRgbColors, triadicHslColors);
                }
            }
        });
    }

    showTriadicColorsPopup(clickedVierkantje, originalRgb, triadicRgbColors, triadicHslColors) {
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('triadic-popup');
        popupContainer.style.position = 'absolute';
        popupContainer.style.left = `${clickedVierkantje.offsetLeft + clickedVierkantje.offsetWidth + 10}px`;
        popupContainer.style.top = `${clickedVierkantje.offsetTop - 15}px`;


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

        // bij wegkliken verdwijnt de pop-up
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

    getElementen() {
        return this.vierkantjes;
    }
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 }; // Return HSL in degrees, percentage
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }; // Return RGB in 0-255 range
}

function getTriadicColorsHsl(hslColor) {
    const h = hslColor.h;
    const s = hslColor.s;
    const l = hslColor.l;

    const triadicColor1Hsl = { h: (h + 120) % 360, s: s, l: l };
    const triadicColor2Hsl = { h: (h - 120 + 360) % 360, s: s, l: l };

    return [triadicColor1Hsl, triadicColor2Hsl];
}

export default TestGrid;