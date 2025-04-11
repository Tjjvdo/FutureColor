const apiKey = "7e75deaaf7";

const temperatuurInput = document.getElementById("temperatuur");
const weerstypeSelect = document.getElementById("weerstype");

const locatieSelect = document.getElementById("Locatie");

let locatie = locatieSelect.value;
const encodedLocatie = encodeURIComponent(locatie);

const apiUrl = `https://weerlive.nl/api/weerlive_api_v2.php?key=${apiKey}&locatie=${encodedLocatie}`;

class WeatherAPI {
    constructor() {
    
        this.updateWeer(apiUrl);

        this.addEventListeners();
    }

    addEventListeners(){
        this.addLocatieSelectListener();
    }

    addLocatieSelectListener(){
        locatieSelect.addEventListener('change', () => {
            locatie = locatieSelect.value;
            const encodedLocatie = encodeURIComponent(locatie);
    
            const apiUrl = `https://weerlive.nl/api/weerlive_api_v2.php?key=${apiKey}&locatie=${encodedLocatie}`;
    
            this.updateWeer(apiUrl);
    
        });
    }

    updateWeer(apiUrl){
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
                console.error("Geen weerdata ontvangen.");
            }
        })
        .catch(error => console.error("Fout bij ophalen weerdata:", error));
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
}

export default WeatherAPI;