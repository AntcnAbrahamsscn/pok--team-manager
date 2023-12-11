const redButton = document.querySelector("#red-button")
const yellowButton = document.querySelector("#yellow-button")
const blueButton = document.querySelector("#blue-button")
const colorSectionContainer = document.querySelector(".color-selection-container")
const pokemonImgFP = document.querySelector("#pokemon-image-fp")
const h1Fp = document.querySelector("#h1-fp")
const h2Fp = document.querySelector("#h2-fp")
const startButton = document.querySelector(".start-button")
const firstPageContainer = document.querySelector(".first-page-flex-container")
const searchField = document.querySelector(".search")
const teamManagerPage = document.querySelector("#team-manager-page")



redButton.addEventListener("click", () => {
    colorSectionContainer.classList.add("background-color-red");
    colorSectionContainer.classList.remove("background-color-yellow");
    colorSectionContainer.classList.remove("background-color-blue");
    h1Fp.classList.add("background-color-red");
    h1Fp.classList.remove("background-color-yellow");
    h1Fp.classList.remove("background-color-blue");
    h2Fp.classList.add("background-color-red");
    h2Fp.classList.remove("background-color-yellow");
    h2Fp.classList.remove("background-color-blue");
    pokemonImgFP.src = "./assets/img/pokemon-red.png";
});

yellowButton.addEventListener("click", () => {
    colorSectionContainer.classList.add("background-color-yellow");
    colorSectionContainer.classList.remove("background-color-red");
    colorSectionContainer.classList.remove("background-color-blue");
    h1Fp.classList.add("background-color-yellow");
    h1Fp.classList.remove("background-color-blue");
    h1Fp.classList.remove("background-color-red");
    h2Fp.classList.add("background-color-yellow");
    h2Fp.classList.remove("background-color-blue");
    h2Fp.classList.remove("background-color-red");
    pokemonImgFP.src = "./assets/img/pokemon-yellow.png"; 
});

blueButton.addEventListener("click", () => {
    colorSectionContainer.classList.add("background-color-blue");
    colorSectionContainer.classList.remove("background-color-yellow");
    colorSectionContainer.classList.remove("background-color-red");
    h1Fp.classList.add("background-color-blue");
    h1Fp.classList.remove("background-color-red");
    h1Fp.classList.remove("background-color-yellow");
    h2Fp.classList.add("background-color-blue");
    h2Fp.classList.remove("background-color-red");
    h2Fp.classList.remove("background-color-yellow");
    pokemonImgFP.src = "./assets/img/pokemon-blue.png";
});

startButton.addEventListener("click", ()=> {
    firstPageContainer.classList.add("display-none")
    // searchField.style.display = "flex"
    teamManagerPage.style.display = "block"
})


