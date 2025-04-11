class WeerView{
    constructor(){
        this.invloedenUl = document.getElementById("invloedenLijst");
        this.temperatuurInput = document.getElementById("temperatuur");
        this.weerstypeSelect = document.getElementById("weerstype");
    }

    voegTemperatuurEffectenLijstToe(tempValue){
        this.temperatuurInput.value = tempValue;

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

        let liElementen = this.invloedenUl.getElementsByTagName('li');

        this.verwijderWeersInvloeden(liElementen, "temperatuursinvloed");

        if(erIsInvloed){
            this.invloedenUl.insertBefore(invloedText, this.invloedenUl.children[0]);
        }
    }

    voegWeerstypeEffectenLijstToe(weertype){
        let liElementen = this.invloedenUl.getElementsByTagName('li');

        let invloedText = document.createElement("li");
        invloedText.setAttribute("id", "weerstypeInvloed");
        let erIsInvloed = false;

        this.verwijderWeersInvloeden(liElementen, "weerstypeInvloed");

        if(weertype === "regen" || weertype === "sneeuw"){
            invloedText.textContent= "Alle mengtijden zijn 10% langer omdat het " + weertype + "t!";
            erIsInvloed = true;
        }

        if(erIsInvloed){
            this.invloedenUl.appendChild(invloedText, this.invloedenUl.children[0]);
        }
    }

    verwijderWeersInvloeden(liElementen, liId){
        if (liElementen.length > 0) {
            Array.from(liElementen).forEach((li) => {
                if(li.id && li.id === liId){
                    li.remove();
                }
            });
        }
    }
}

export default WeerView;