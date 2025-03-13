document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "7e75deaaf7";

    const invloedenUl = document.getElementById("invloedenLijst");
    const temperatuurInput = document.getElementById("temperatuur");
    const weerstypeSelect = document.getElementById("weerstype");

    const locatieSelect = document.getElementById("Locatie");
    
    let locatie = locatieSelect.value;
    const encodedLocatie = encodeURIComponent(locatie);

    const apiUrl = `https://weerlive.nl/api/weerlive_api_v2.php?key=${apiKey}&locatie=${encodedLocatie}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.liveweer) {
            const weer = data.liveweer[0];
            temperatuurInput.value = weer.temp;
            temperatuurInput.dispatchEvent(new Event('change'));

            weerstypeSelect.value = bepaalWeertype(weer.samenv);
            weerstypeSelect.dispatchEvent(new Event('change'));

            console.log(`Temperatuur: ${weer.temp}°C`);
            console.log(`Weertype: ${weer.samenv}`);
        } else {
            console.error("Geen weerdata ontvangen.");
        }
    })
    .catch(error => console.error("Fout bij ophalen weerdata:", error));

    locatieSelect.addEventListener('change', () => {
        let locatie = locatieSelect.value;
        const encodedLocatie = encodeURIComponent(locatie);

        const apiUrl = `https://weerlive.nl/api/weerlive_api_v2.php?key=${apiKey}&locatie=${encodedLocatie}`;;

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.liveweer) {
                const weer = data.liveweer[0];
                temperatuurInput.value = weer.temp;
            } else {
                console.error("Geen weerdata ontvangen.");
            }
        })
        .catch(error => console.error("Fout bij ophalen weerdata:", error));

    });

    function bepaalWeertype(weerSamenvatting) {
        if (weerSamenvatting.toLowerCase().includes("regen")) {
            return "regen";
        } else if (weerSamenvatting.toLowerCase().includes("sneeuw")) {
            return "sneeuw";
        } else {
            return "zonnig";
        }
    }
});