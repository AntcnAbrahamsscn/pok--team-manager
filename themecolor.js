// const redButton = document.querySelector("#red-button")
// const yellowButton = document.querySelector("#yellow-button")
// const blueButton = document.querySelector("#blue-button")
// const colorSectionContainer = document.querySelector(".color-selection-container")
// const pokemonImgFP = document.querySelector("#pokemon-image-fp")
// const h1Fp = document.querySelector("#h1-fp")
// const h2Fp = document.querySelector("#h2-fp")
const startButton = document.querySelector(".start-button")
const firstPageContainer = document.querySelector(".first-page-flex-container")
const teamManagerPage = document.querySelector("#team-manager-page")
const circleMenu = document.querySelector(".circle-menu")
const teamNameInput = document.querySelector(".team-name-input")
const teamName = document.querySelector(".team-name")

const themeButtons = document.querySelectorAll('.theme-btn');
    const h1Fp = document.querySelector('.h1-fp');
    const h2Fp = document.querySelector(".h2-fp");
    const colorSelectionContainer = document.querySelector(".color-selection-container");

function changePokemonImg(theme) {
    const pokemonImage = document.getElementById('pokemon-image-fp');
    if (theme === 'red') {
        pokemonImage.src = './assets/img/pokemon-red.png';
    } else if (theme === 'blue') {
        pokemonImage.src = './assets/img/pokemon-blue.png';
    } else if (theme === 'yellow') {
        pokemonImage.src = './assets/img/pokemon-yellow.png';
    }
}

themeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const theme = this.dataset.theme;
        h1Fp.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        h1Fp.classList.add(`theme-${theme}`);
        h2Fp.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        h2Fp.classList.add(`theme-${theme}`);
        colorSelectionContainer.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        colorSelectionContainer.classList.add(`theme-${theme}`);
        changePokemonImg(theme)
    });
});




startButton.addEventListener("click", (event)=> {
    event.preventDefault();
    teamNameInput.value = teamNameInput.querySelector(".search-input").value;
    createTeamNameTag();
    firstPageContainer.classList.add("display-none");
    teamManagerPage.style.display = "block";
})

function createTeamNameTag() {
    const teamTag = document.createElement("h4")
    teamTag.innerText = teamNameInput.value
    teamManagerPage.append(teamTag)
}


