const startButton = document.querySelector(".start-button")
const firstPageContainer = document.querySelector(".first-page-flex-container")
const circleMenu = document.querySelector(".circle-menu")
const teamNameInput = document.querySelector(".team-name-input")
const teamName = document.querySelector(".team-name")
const themeButtons = document.querySelectorAll('.theme-btn');
const h1Fp = document.querySelector('.h1-fp');
const h2Fp = document.querySelector(".h2-fp");
const colorSelectionContainer = document.querySelector(".color-selection-container");
const nameContainer = document.querySelector(".name-container")
const reservesH4 = document.querySelector("#reserves")
const teamStats = document.querySelector(".team-stats")
const menuItem = document.querySelector(".menu-item")
const searchTeamPokemons = document.querySelector("#search-team-pokemons")
const searchAllPokemons = document.querySelector("#search-all-pokemons")
const hamburgerMenuBtn = document.querySelector("#hamburger-menu-btn")
const navFlexContainer = document.querySelector(".nav-flex-container")
// Hamburger
const menuContainer = document.querySelector('.menu-container');
const teamPokemonPage = document.querySelector('.team-manager-page');
const searchPokemonPage = document.querySelector('.search-pokemons-page');
const inputVisability = document.querySelector('#input-visability')


// Funktion som styr vilken bild som visas på förstasidan.
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

// Ändrar tema beroende på vilken knapp man trycker på.
let currentTheme;

themeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const theme = this.dataset.theme;
        h1Fp.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        h1Fp.classList.add(`theme-${theme}`);
        h2Fp.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        h2Fp.classList.add(`theme-${theme}`);
        colorSelectionContainer.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        colorSelectionContainer.classList.add(`theme-${theme}`);
        circleMenu.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        circleMenu.classList.add(`theme-${theme}`)
        reservesH4.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        reservesH4.classList.add(`theme-${theme}`)
        teamStats.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        teamStats.classList.add(`theme-${theme}`)
        document.querySelectorAll('.menu-container a.menu-item').forEach(item => {
            item.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        });
        document.querySelectorAll('.menu-container a.menu-item').forEach(item => {
            item.classList.add(`theme-${theme}`);
        });

        currentTheme = theme;
        changePokemonImg(theme)
    });
});

// Startknapp
startButton.addEventListener("click", (event) => {
    event.preventDefault();
    teamNameInput.value = teamNameInput.querySelector(".search-input").value;
    createTeamNameTag();
    hideFirstPage();
    showTeamPokemonPage();
    showNavBarTeamPage()
    showNavbar()
});

function showNavBarTeamPage() {
    searchTeamPokemons.style.display = "flex"
    circleMenu.style.display = "flex"
}

function hideNavbar() {
    navFlexContainer.style.display = "none"
}

function showNavbar() {
    navFlexContainer.style.display = "flex"
}
function showNavBarAllPage() {

}

function createTeamNameTag() {
    const teamTag = document.createElement("h4");
    teamTag.classList.add(`theme-${currentTheme}`);
    teamTag.innerText = teamNameInput.value;
    nameContainer.append(teamTag);
}

function showFirstPage() {
    firstPageContainer.classList.add("display-flex")
}

function hideFirstPage() {
    firstPageContainer.classList.add("display-none");
}

function showSecondPage () {
    searchPokemonPage.classList.add("display-block")
}
function hideSecondPage () {
    searchPokemonPage.classList.remove = "display-block"
}
function showTeamPokemonPage() {
    teamPokemonPage.classList.add("display-block");
}

// Hamburger
function toggleMenu() {
    menuContainer.classList.toggle('show-menu');
    teamPokemonPage.classList.toggle('display-none');
    searchPokemonPage.classList.toggle('display-none');
    inputVisability.classList.toggle('display-none')
}
hamburgerMenuBtn.addEventListener('click', toggleMenu);


//  Byta vyer
document.getElementById('all-pokemons-link').addEventListener('click', function() {
    console.log('All pokemons link clicked!');
    teamPokemonPage.classList.remove("display-block")
    hideFirstPage()
    showSecondPage()
    toggleMenu()
});

document.getElementById('team-pokemons-link').addEventListener('click', function() {
    console.log('Team pokemons link clicked!');
    teamPokemonPage.classList.add("display-block")
    searchPokemonPage.classList.remove("display-block")
    hideFirstPage()
    hideSecondPage()
    toggleMenu()
});


