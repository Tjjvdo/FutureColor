class TestGrid {
    constructor(gridGrote) {
        this.vierkantjes = [];

        for (let i = 0; i < gridGrote * gridGrote; i++) {
            const vierkantje = document.createElement('div');
            vierkantje.classList.add('kleur-vierkantje');
            this.vierkantjes.push(vierkantje);
        }
    }

    getElementen() {
        return this.vierkantjes;
    }
}

export default TestGrid;