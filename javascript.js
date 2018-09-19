document.addEventListener("DOMContentLoaded", hentJson);
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");


let dest = document.querySelector(".data-container"),
    retter,
    kategoriFilter = "alle";

//Indlæser json fil, lægger retterne i arrayet//
async function hentJson() {
    let jsonData = await fetch("json/menu.json");
    retter = await jsonData.json();

    //console.log(retter);

    visRetter();
}

//Ved klik på .menu-item kaldes funktionen filtering

document.querySelectorAll(".menu-item").forEach(knap => {
    //console.log(knap);
    knap.addEventListener("click", filtering)

});

// filterer kategorierne så de bliver opdelt alt efter deres kategori i json filen
function filtering() {

    kategoriFilter = this.getAttribute("data-kategori");
    //console.log(kategoriFilter);
    visRetter();



}

//viser alle retter i array ved at klone nedestående data, eventlisener på billederne således at single.html kaldes hvis der klikkes på billedet

function visRetter() {
    let temp = document.querySelector(".retter-template");
    let modtager = document.querySelector(".main-container");
    modtager.textContent = "";
    document.querySelector("header h3").textContent = kategoriFilter;
    retter.forEach(ret => {
        console.log(ret.kategori, kategoriFilter);
        if (ret.kategori == kategoriFilter || kategoriFilter == "alle") {

            console.log(ret.kategori, kategoriFilter);
            let klon = temp.cloneNode(true).content;
            klon.querySelector(".data-navn").textContent = ret.navn;
            klon.querySelector(".data-billede").src = "imgs/" + ret.billede + ".jpg";
            klon.querySelector(".data-billede").addEventListener("click", () => {
                visModal(ret);
            });
            klon.querySelector(".data-billede").alt = "billede" + ret.navn;
            klon.querySelector(".data-billede").addEventListener("click", () => {
                window.location.href = "single.html?id=" + ret.id;
            });


            modtager.appendChild(klon);
        }
    });
}




// MODAL VINDUE
// function visModal(retter) {
//     let modal = document.querySelector("#modal");
//     modal.classList.add("vis");
//     modal.querySelector(".modal-navn").textContent = retter.navn;
//     modal.querySelector(".modal-billede").src = "imgs/" + retter.billede + ".jpg";
//     modal.querySelector(".modal-billede").alt = "Foto af" + retter.navn;
//     modal.querySelector(".modal-langbeskrivelse").textContent = retter.langbeskrivelse;
//     modal.querySelector("button").addEventListener("click", skjulModal);
//
// }
//
// function skjulModal() {
//     //window.scrollTo(0);
//     modal.classList.remove("vis");
//
// }


// STICKY NAV - gør at navbar ikke rykker sig når brugeren scroller ned langs siden
window.onscroll = function () {
    StickyNav()
};


let navbar = document.getElementById("navbar");


let sticky = navbar.offsetTop;

function StickyNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
};
