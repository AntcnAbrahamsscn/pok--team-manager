export { fetchPokemonData, handleSearch, applyTypeColor };
import { addToTeam } from "./myteam.js";

// Variabler för search all sidan
const pokemonAllContainer = document.querySelector(".pokemon-container");
const maxResults = 6;

async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const data = await response.json();
        createPokemonElement(data);
    } catch (err) {
        console.log(`Error fetching data for ${pokemonName}`, err);
    }
}

document
    .querySelector("#pokemon-search-all-input")
    .addEventListener("input", handleSearch);

async function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    let displayedResults = 0;

    pokemonAllContainer.innerHTML = "";

    if (searchTerm.trim() === "") {
        return;
    }

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=1000`
        );
        const data = await response.json();

        const matchingPokemon = data.results.filter((pokemon) =>
            pokemon.name.includes(searchTerm)
        );

        if (matchingPokemon.length === 0) {
            console.log("no matching Poekmon found");
        }

        for (const pokemon of matchingPokemon) {
            if (displayedResults >= maxResults) {
                break;
            }

            await fetchPokemonData(pokemon.name);
            displayedResults++;
        }
    } catch (err) {
        console.log("error fetching Pokemon list", err);
    }
}

// Funktion som skapar div element med data från API:et
function createPokemonElement(data) {
    const pokemonContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    const infoContainer = document.createElement("div");
    const nameElement = document.createElement("h5");
    const abilitiesElement = document.createElement("p");
    const typesElement = document.createElement("p");
    const buttonContainer = document.createElement("div");
    const buttonElement = document.createElement("button");

    // Ger elementen innehåll beroende på värdet från API
    imgElement.src = data.sprites.other["official-artwork"].front_default;
    imgElement.alt = data.name;
    nameElement.textContent = data.name;
    abilitiesElement.textContent =
        "abilities: " +
        data.abilities.map((ability) => ability.ability.name).join(", ");
    typesElement.textContent =
        "type: " + data.types.map((type) => type.type.name).join(", ");
    buttonElement.textContent = "add to team";

    // Sparar types för bakgrundsfärg
    const pokemonTypes = data.types.map((type) => type.type.name);
    console.log(pokemonTypes);
    applyTypeColor(pokemonContainer, pokemonTypes);

    // Lägger till CSS-styling
    pokemonContainer.classList.add("pokemon-box-container");
    imgElement.classList.add("pokemon-img");
    infoContainer.classList.add("pokemon-info");
    nameElement.classList.add("pokemon-name");
    abilitiesElement.classList.add("pokemon-abilities");
    typesElement.classList.add("pokemon-types");
    buttonElement.classList.add("button-pokemon-style");
    buttonContainer.classList.add("buttons-search-all-container");

    // Lägger till elementen
    pokemonContainer.appendChild(imgElement);
    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(abilitiesElement);
    infoContainer.appendChild(typesElement);
    buttonContainer.appendChild(buttonElement);
    pokemonContainer.appendChild(infoContainer);
    pokemonContainer.appendChild(buttonContainer);
    pokemonAllContainer.appendChild(pokemonContainer);

    // Kallar på funktionen som lägger till pokemon i en array
    buttonElement.addEventListener("click", function () {
        addToTeam(data);
    });
}

// Funktion som ändrar bakgrund beroende på vilken type pokemonen är
function applyTypeColor(pokemonContainer, types) {
    if (types.includes("electric")) {
        pokemonContainer.classList.add("theme-yellow");
    } else if (types.includes("fire")) {
        pokemonContainer.classList.add("theme-red");
    } else if (types.includes("water") || types.includes("ice")) {
        pokemonContainer.classList.add("theme-blue");
    } else if (types.includes("grass")) {
        pokemonContainer.classList.add("theme-green");
    } else if (
        types.includes("rock") ||
        types.includes("dark") ||
        types.includes("ghost")
    ) {
        pokemonContainer.classList.add("theme-gray");
    } else if (types.includes("pshycic") || types.includes("fairy")) {
        pokemonContainer.classList.add("theme-purple");
    } else if (types.includes("poison")) {
        pokemonContainer.classList.add("theme-poison");
    } else if (
        types.includes("normal") ||
        types.includes("ground") ||
        types.includes("dragon")
    ) {
        pokemonContainer.classList.add("theme-normal");
    } else if (types.includes("fighting")) {
        pokemonContainer.classList.add("theme-fighting");
    } else if (types.includes("bug")) {
        pokemonContainer.classList.add("theme-bug");
    }
}
