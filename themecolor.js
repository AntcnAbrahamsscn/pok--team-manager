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
const nameContainer = document.querySelector(".name-container")
const reservesH4 = document.querySelector("#reserves")
const teamStats = document.querySelector(".team-stats")
const menuItem = document.querySelector(".menu-item")
const searchPokemons = document.querySelector("#search-pokemons")
const searchPokemonPage = document.querySelector(".search-pokemons-page")


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
    showTeamManagerPage();
});

function createTeamNameTag() {
    const teamTag = document.createElement("h4");
    teamTag.classList.add(`theme-${currentTheme}`);
    teamTag.innerText = teamNameInput.value;
    nameContainer.append(teamTag);
}

function hideFirstPage() {
    firstPageContainer.classList.add("display-none");
}

function showSecondPage () {
    searchPokemonPage.style.display = "block"
}

function showTeamManagerPage() {
    teamManagerPage.style.display = "block";
}

// Hamburger
const menuContainer = document.querySelector('.menu-container');
const pokemonPageContainer = document.getElementById('pokemon-page-container')
// circleMenu.addEventListener('click', toggleMenu);

// function toggleMenu() {
//     menuContainer.classList.toggle('show-menu');
//     pokemonPageContainer.classList.toggle('hide-page')
//     searchPokemons.classList.toggle("hide")

// }

// Toggle function that handles both pages
function toggleMenu(page) {
    const menuContainer = document.querySelector('.menu-container');
    const pokemonPageContainer = document.getElementById('pokemon-page-container');
    const searchPokemonPage = document.querySelector('.search-pokemons-page');

    // Toggle show-menu class on menu container
    menuContainer.classList.toggle('show-menu');

    // Toggle hide-page class on respective pages
    pokemonPageContainer.classList.toggle('hide-page', page === 'team-manager');
    searchPokemonPage.classList.toggle('hide-page', page === 'search-pokemons');
}

// Event listeners for toggle buttons
teamMenuBtn.addEventListener('click', () => toggleMenu('team-manager'));
searchMenuBtn.addEventListener('click', () => toggleMenu('search-pokemons'));

// function toggleMenu() {
//     menuContainer.classList.toggle('show-menu');
//     pokemonPageContainer.classList.toggle('hide-page');
//     searchPokemonPage.classList.toggle('hide');
// }

// const teamMenuBtn = document.getElementById('teamMenuBtn');
// teamMenuBtn.addEventListener('click', toggleMenu);

// const searchMenuBtn = document.getElementById('searchMenuBtn');
// searchMenuBtn.addEventListener('click', toggleMenu);

//  Byta vy till all pokemons
document.getElementById('all-pokemons-link').addEventListener('click', function() {
    console.log('All pokemons link clicked!');
    teamManagerPage.style.display = "none"
    hideFirstPage()
    showSecondPage()
});