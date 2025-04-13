class MengMachinesView{
    constructor(){
        this.mengmachinesHal1Container = document.getElementById('mengmachines-hal-1');
        this.mengmachinesHal2Container = document.getElementById('mengmachines-hal-2');
    }

    MaakNieuweMengmachineHal1(machine, controller) {
        const machineElement = this.MaakNieuweMachine(machine, controller);
        
        this.mengmachinesHal1Container.appendChild(machineElement);
    }

    MaakNieuweMengmachineHal2(machine, controller) {
        const machineElement = this.MaakNieuweMachine(machine, controller);
        
        this.mengmachinesHal2Container.appendChild(machineElement);
    }

    MaakNieuweMachine(machine, controller){
        machine.machineContainer = document.createElement('div');
        machine.machineContainer.classList.add('machine-container');

        machine.mengmachineElement = document.createElement('div');
        machine.mengmachineElement.classList.add('mengmachine');
        machine.mengmachineElement.title = `Lege mengmachine`;
        machine.mengmachineElement.dataset.mixerStatus = 'idle';

        machine.machineContainer.appendChild(machine.mengmachineElement);

        machine.mixKnop = document.createElement('button');
        machine.mixKnop.textContent = 'Mix!';
        machine.mixKnop.classList.add('mix-knop');
        machine.machineContainer.appendChild(machine.mixKnop);

        this.addEventListeners(machine, controller);

        return machine.machineContainer
    }

    addEventListeners(machine, controller) {
        machine.mixKnop.addEventListener('click', () => controller.handleMixClick(machine));
        machine.mengmachineElement.addEventListener('dragover', (event) => controller.handleMixDragOver(machine, event));
        machine.mengmachineElement.addEventListener('drop', (event) => controller.handleMixDrop(machine, event));
    }

    startAnimatie(machine, draaisnelheidInSeconden) {
        // zo draaien ze met verschillende snelheden
        machine.mengmachineElement.style.animation = `draai ${draaisnelheidInSeconden}s linear infinite`;

        // Audio afspelen bij het starten van de animatie
        const startGeluid = new Audio('Geluiden/lawnmower-starting-sound.mp3');

        // zodat je alleen het gewilde stuk hebt
        startGeluid.currentTime = 0.2;
        startGeluid.play();

        // niet te lang door gaan
        setTimeout(() => {
            startGeluid.pause();
        }, 1000);
    }

    stopAnimatie(machine) {
        machine.mengmachineElement.style.animation = '';

        // Audio afspelen bij het stoppen van de animatie
        const stopGeluid = new Audio('Geluiden/cararriveandstop.mp3');

        // zodat je alleen het stoppen hoort
        stopGeluid.currentTime = 13.5;
        stopGeluid.play();
    }
}

export default MengMachinesView;