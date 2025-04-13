const apiKey = "7e75deaaf7";

const temperatuurInput = document.getElementById("temperatuur");
const weerstypeSelect = document.getElementById("weerstype");

const locatieSelect = document.getElementById("Locatie");

let locatie = locatieSelect.value;
const encodedLocatie = encodeURIComponent(locatie);

const apiUrl = `https://weerlive.nl/api/weerlive_api_v2.php?key=${apiKey}&locatie=${encodedLocatie}`;

class WeatherAPI {
    constructor(controller) {

        this.updateWeer(apiUrl, controller);

        this.addEventListeners(controller);
    }

    addEventListeners(controller) {
        this.addLocatieSelectListener(controller);
    }

    addLocatieSelectListener(controller) {
        locatieSelect.addEventListener('change', () => {
            locatie = locatieSelect.value;
            const encodedLocatie = encodeURIComponent(locatie);

            const apiUrl = `https://weerlive.nl/api/weerlive_api_v2.php?key=${apiKey}&locatie=${encodedLocatie}`;

            this.updateWeer(apiUrl, controller);
        });
    }

    updateWeer(apiUrl, controller) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.liveweer) {
                    const weer = data.liveweer[0];
                    temperatuurInput.value = weer.temp;
                    temperatuurInput.dispatchEvent(new Event('change'));

                    weerstypeSelect.value = this.bepaalWeertype(weer.samenv);
                    weerstypeSelect.dispatchEvent(new Event('change'));
                } else {
                    controller.handleError("Geen weerdata ontvangen.");
                }
            })
            .catch(error => controller.handleError(`Fout bij ophalen weerdata: ${error}`));
    }

    bepaalWeertype(weerSamenvatting) {
        if (weerSamenvatting.toLowerCase().includes("regen")) {
            return "regen";
        } else if (weerSamenvatting.toLowerCase().includes("sneeuw")) {
            return "sneeuw";
        } else {
            return "zonnig";
        }
    }

    getTijdMultiplier() {
        let multiplier = 1;

        if (temperatuurInput.value < 10) {
            multiplier += 0.15;
        }

        let weertype = weerstypeSelect.value;
        if (weertype === "regen" || weertype === "sneeuw") {
            multiplier += 0.1;
        }

        return multiplier;
    }

    max1Machine() {
        if (temperatuurInput.value > 35) {
            return true;
        } else {
            return false;
        }
    }
}

export default WeatherAPI;