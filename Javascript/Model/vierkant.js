class Vierkant {
    constructor() {
        
    }

    addDropListener(event) {
        event.preventDefault();

        const ingredientId = event.dataTransfer.getData('text/plain');
        if (ingredientId) {
            const ingredientElementOrigineel = document.querySelector(`.ingrediënt[data-ingredient-id="${ingredientId}"]`);

            if (ingredientElementOrigineel) {
                if (this.vierkantElement.children.length > 0) {
                    return null;
                }
                
                return ingredientElementOrigineel;
            }
        }
    }

    addClickListener() {
        const thisElementOrigineel = this.vierkantElement.querySelector('.ingrediënt');

        if (thisElementOrigineel) {
            let ingredientAchtergrond = thisElementOrigineel.style.backgroundColor;
            let rgbValues = ingredientAchtergrond.match(/\d+/g);

            if (rgbValues) {
                let r = parseInt(rgbValues[0]);
                let g = parseInt(rgbValues[1]);
                let b = parseInt(rgbValues[2]);

                const hslColor = rgbToHsl(r, g, b);
                const triadicHslColors = getTriadicColorsHsl(hslColor);
                const triadicRgbColors = triadicHslColors.map(hsl => hslToRgb(hsl.h, hsl.s, hsl.l));

                return [ingredientAchtergrond, triadicRgbColors, triadicHslColors];
            }
        }
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
        h = s = 0;
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

    return { h: h * 360, s: s * 100, l: l * 100 }; 
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

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function getTriadicColorsHsl(hslColor) {
    const h = hslColor.h;
    const s = hslColor.s;
    const l = hslColor.l;

    const triadicColor1Hsl = { h: (h + 120) % 360, s: s, l: l };
    const triadicColor2Hsl = { h: (h - 120 + 360) % 360, s: s, l: l };

    return [triadicColor1Hsl, triadicColor2Hsl];
}

export default Vierkant;