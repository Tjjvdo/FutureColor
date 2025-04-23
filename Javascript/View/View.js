class View{
    constructor(){
        this.MengHal1Knop = document.getElementById('MengHal1');
        this.MengHal2Knop = document.getElementById('MengHal2');
        this.KleurenTestKnop = document.getElementById('KleurenTest');
        this.Hal1 = document.getElementById('hal-1');
        this.Hal2 = document.getElementById('hal-2');
        this.KleurenTest = document.getElementById('kleurentest-pagina');
        
        this.errorModal = document.getElementById('errorModal');
        this.errorMessageElement = document.getElementById('errorMessage');
        this.closeButton = document.querySelector('.close-button');

        this.closeButton.addEventListener('click', this.closeModal.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
    }

    showError(message) {
        this.errorMessageElement.textContent = message;
        this.errorModal.style.display = "block";
    }

    closeModal() {
        this.errorModal.style.display = "none";
    }

    outsideClick(event) {
        if (event.target == this.errorModal) {
            this.closeModal();
        }
    }

    ToonMengHal1(){
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

    ToonMengHal2(){
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

    ToonKleurenTest(){
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
}

export default View;