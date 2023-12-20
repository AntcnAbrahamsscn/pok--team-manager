// Variabler för första sidan
const startButton = document.querySelector(".start-button")
const firstPageContainer = document.querySelector(".first-page-flex-container")
const themeButtons = document.querySelectorAll('.theme-btn');
const h1Fp = document.querySelector('.h1-fp');
const h2Fp = document.querySelector(".h2-fp");
const colorSelectionContainer = document.querySelector(".color-selection-container");

// Variabler för team manager sidan
const nameContainer = document.querySelector(".name-container")
const reservesH4 = document.querySelector(".reserves")
const lineUpContainer = document.querySelector(".line-up-container")
const searchTeamPokemons = document.querySelector("#search-team-pokemons")

// Variabler för search all sidan
const searchAllPokemons = document.querySelector("#search-all-pokemons")
const searchPokemonPage = document.querySelector('.search-pokemons-page');

// Hamburger / Nav / Input
const menuContainer = document.querySelector('.menu-container');
const teamPokemonPage = document.querySelector('.team-manager-page');
const inputVisability = document.querySelector('#input-visability')
const circleMenu = document.querySelector(".circle-menu")
const teamNameInput = document.querySelector(".team-name-input")
const teamName = document.querySelector(".team-name")
const hamburgerMenuBtn = document.querySelector("#hamburger-menu-btn")
const navFlexContainer = document.querySelector(".nav-flex-container")


// Byter bild beroende på vilket tema
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

// Byter tema beroende vilken knapp man trycker på
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
        document.querySelectorAll('.reserves').forEach(reserve => {
            reserve.classList.add(`theme-${theme}`);
        });
        lineUpContainer.classList.remove('theme-red', 'theme-blue', 'theme-yellow');
        lineUpContainer.classList.add(`theme-${theme}`)
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
    firstPageContainer.classList.add("display-none");
    teamPokemonPage.classList.add("display-block");
    showNavBarTeamPage()
    navFlexContainer.style.display = "flex"    
});

// Visar navbar på team manager sidan
function showNavBarTeamPage() {
    searchTeamPokemons.style.display = "flex"
    searchAllPokemons.style.display = "none"
    circleMenu.style.display = "flex"
}

// Skapar namntaggen beroende på vilket namn man skrev in i input på första sidan
function createTeamNameTag() {
    const teamTag = document.createElement("h4");
    teamTag.classList.add(`theme-${currentTheme}`);
    teamTag.innerText = teamNameInput.value;
    nameContainer.append(teamTag);
}

// Hamburgerr menu
function toggleMenu() {
    menuContainer.classList.toggle('show-menu');
    teamPokemonPage.classList.toggle('display-none');
    searchPokemonPage.classList.toggle('display-none');
    inputVisability.classList.toggle('display-none')
    hamburgerMenuBtn.classList.toggle("cross")
    // circleMenu.classList.toggle("cross")
}

hamburgerMenuBtn.addEventListener('click', toggleMenu);


//  Byter vyer
document.getElementById('all-pokemons-link').addEventListener('click', function() {
    console.log('All pokemons link clicked!');
    teamPokemonPage.classList.remove("display-block")
    searchPokemonPage.classList.add("display-block")
    firstPageContainer.classList.add("display-none");
    searchTeamPokemons.style.display = "none"
    searchAllPokemons.style.display = "flex"
    toggleMenu()
});

document.getElementById('team-pokemons-link').addEventListener('click', function() {
    console.log('Team pokemons link clicked!');
    teamPokemonPage.classList.add("display-block")
    searchPokemonPage.classList.remove("display-block")
    firstPageContainer.classList.add("display-none");
    searchPokemonPage.classList.remove("display-block")
    searchTeamPokemons.style.display = "flex"
    searchAllPokemons.style.display = "none"
    toggleMenu()
});


