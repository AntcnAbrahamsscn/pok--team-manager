import { fetchPokemonData, handleSearch, applyTypeColor } from "./pokemon.js";
export { addToTeam };
const teamPokemonContainer = document.querySelector(".team-pokemons-container");
const reservesPokemonContainer = document.querySelector(
    ".reserves-pokemons-container"
);

const myTeam = [];
const myTeamLimit = 3;
const myReserves = [];

// Nickname input
let isUpdatingNickname = false;

// Skapar pokemon-boxen
function createTeamPokemonElement(data) {
    const pokemonContainer = document.createElement("div");
    const pokemonInfoContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    const nameElement = document.createElement("h5");
    const nicknameParagraph = document.createElement("p");
    const nicknameInput = document.createElement("input");
    const abilitiesElement = document.createElement("p");
    const typesElement = document.createElement("p");
    const buttonsContainer = document.createElement("div");
    const removeButton = document.createElement("button");
    const moveToReservesButton = document.createElement("button");
    const moveUpButton = document.createElement("button");
    const moveDownButton = document.createElement("button");

    imgElement.src = data.sprites.other["official-artwork"].front_default;
    imgElement.alt = data.name;
    nameElement.textContent = data.name;
    abilitiesElement.textContent =
        "abilities: " +
        data.abilities.map((ability) => ability.ability.name).join(", ");
    typesElement.textContent =
        "type: " + data.types.map((type) => type.type.name).join(", ");
    removeButton.textContent = "remove from team";
    moveToReservesButton.textContent = "move to reserves";
    moveUpButton.textContent = "move up";
    moveDownButton.textContent = "move down";
    nicknameInput.placeholder = "enter nickname";
    let nickname = "";

    pokemonContainer.classList.add("pokemon-box-container");
    imgElement.classList.add("pokemon-img");
    nameElement.classList.add("pokemon-name");
    pokemonInfoContainer.classList.add("pokemon-info");
    abilitiesElement.classList.add("pokemon-abilities");
    typesElement.classList.add("pokemon-types");
    nicknameInput.classList.add("nickname-input");
    removeButton.classList.add("button-pokemon-style");
    moveDownButton.classList.add("button-pokemon-style");
    moveToReservesButton.classList.add("button-pokemon-style");
    moveUpButton.classList.add("button-pokemon-style");
    buttonsContainer.classList.add("buttons-container");

    // Nickname
    nicknameParagraph.textContent = "Nickname: " + (data.nickname || "");

    nicknameInput.addEventListener("input", function () {
        if (!isUpdatingNickname) {
            const newNickname = nicknameInput.value.trim(); 
            updateNickname(data, newNickname);
            nicknameParagraph.textContent = newNickname ? "Nickname: " + newNickname : "";
        }
    });

    pokemonContainer.appendChild(imgElement);
    pokemonInfoContainer.appendChild(nameElement);
    pokemonInfoContainer.appendChild(nicknameParagraph);
    pokemonInfoContainer.appendChild(nicknameInput);
    pokemonInfoContainer.appendChild(abilitiesElement);
    pokemonInfoContainer.appendChild(typesElement);
    pokemonContainer.appendChild(pokemonInfoContainer);

    const pokemonTypes = data.types.map((type) => type.type.name);
    console.log(pokemonTypes);
    applyTypeColor(pokemonContainer, pokemonTypes);

    // Tabort-knapp
    removeButton.addEventListener("click", function () {
        removeFromTeam(data);
    });

    // Flytta till reserver-knapp
    pokemonInfoContainer.appendChild(removeButton);
    moveToReservesButton.addEventListener("click", function () {
        moveToReserves(data);
    });
    // pokemonInfoContainer.appendChild(moveToReservesButton);

    // Flyttar upp
    moveUpButton.addEventListener("click", function () {
        moveUpInTeam(data);
    });
    // pokemonInfoContainer.appendChild(moveUpButton);

    // Flyttar ner
    moveDownButton.addEventListener("click", function () {
        moveDownInTeam(data);
    });

    buttonsContainer.appendChild(removeButton);
    buttonsContainer.appendChild(moveToReservesButton);
    buttonsContainer.appendChild(moveUpButton);
    buttonsContainer.appendChild(moveDownButton);
    // pokemonInfoContainer.appendChild(moveDownButton)
    pokemonContainer.appendChild(buttonsContainer);

    return pokemonContainer;
}

function updateNickname(pokemon, newNickname) {
    pokemon.nickname = newNickname;

    const indexInTeam = myTeam.indexOf(pokemon);

    if (indexInTeam !== -1) {
        myTeam[indexInTeam].nickname = newNickname;
        console.log(`Updated nickname for ${pokemon.name} to "${newNickname}"`);
    } else {
        console.log(`${pokemon.name} not found in the team`);
    }
}

function createReservePokemonElement(data) {
    const pokemonContainer = document.createElement("div");
    const pokemonInfoContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    const nameElement = document.createElement("h5");
    const abilitiesElement = document.createElement("p");
    const typesElement = document.createElement("p");
    const buttonsReservesContainer = document.createElement("div");
    const kickFromReservesButton = document.createElement("button");
    const moveUpInReservesButton = document.createElement("button");
    const moveDownInReservesButton = document.createElement("button");

    imgElement.src = data.sprites.other["official-artwork"].front_default;
    imgElement.alt = data.name;
    nameElement.textContent = data.name;
    abilitiesElement.textContent =
        "Abilities: " +
        data.abilities.map((ability) => ability.ability.name).join(", ");
    typesElement.textContent =
        "Type: " + data.types.map((type) => type.type.name).join(", ");
    kickFromReservesButton.textContent = "kick";
    moveUpInReservesButton.textContent = "move up";
    moveDownInReservesButton.textContent = "move down";

    pokemonContainer.classList.add("pokemon-box-container");
    imgElement.classList.add("pokemon-img");
    nameElement.classList.add("pokemon-name");
    pokemonInfoContainer.classList.add("pokemon-info");
    abilitiesElement.classList.add("pokemon-abilities");
    typesElement.classList.add("pokemon-types");
    kickFromReservesButton.classList.add("button-pokemon-style");
    moveUpInReservesButton.classList.add("button-pokemon-style");
    moveDownInReservesButton.classList.add("button-pokemon-style");
    buttonsReservesContainer.classList.add("buttons-reserves-container");

    pokemonContainer.appendChild(imgElement);
    pokemonInfoContainer.appendChild(nameElement);
    pokemonInfoContainer.appendChild(abilitiesElement);
    pokemonInfoContainer.appendChild(typesElement);
    pokemonContainer.appendChild(pokemonInfoContainer);

    const pokemonTypes = data.types.map((type) => type.type.name);
    console.log(pokemonTypes);
    applyTypeColor(pokemonContainer, pokemonTypes);

    kickFromReservesButton.addEventListener("click", function () {
        kickFromReserves(data);
    });
    
    moveUpInReservesButton.addEventListener("click", function () {
        moveUpInReserves(data);
    });
    
    moveDownInReservesButton.addEventListener("click", function () {
        moveDownInReserves(data);
    });
    buttonsReservesContainer.appendChild(kickFromReservesButton);
    buttonsReservesContainer.appendChild(moveUpInReservesButton);
    buttonsReservesContainer.appendChild(moveDownInReservesButton);
    pokemonContainer.appendChild(buttonsReservesContainer);

    return pokemonContainer;
}

function removeFromTeam(pokemon) {
    const index = myTeam.indexOf(pokemon);
    if (index !== -1) {
        myTeam.splice(index, 1);

        if (myReserves.length > 0) {
            const promotedPokemon = myReserves.shift();
            myTeam.push(promotedPokemon);
            renderReserves();
        }

        renderTeam();
    }
}

function moveToReserves(pokemon) {
    const indexInTeam = myTeam.indexOf(pokemon);

    if (indexInTeam !== -1) {
        const movedPokemon = myTeam.splice(indexInTeam, 1)[0];
        myReserves.push(movedPokemon);

        if (myTeam.length < myTeamLimit) {
            const newTeamMember = myReserves.shift();
            if (newTeamMember) {
                myTeam.push(newTeamMember);
            }
            // Shift för att ta bort den reservern som ligger högst upp sen pushas den upp till myTeam.
        }

        renderTeam();
        renderReserves();
    }
}
// FLyttar pokemonen upp
function moveUpInTeam(pokemon) {
    const indexInTeam = myTeam.indexOf(pokemon);

    if (indexInTeam > 0) {
        const movedPokemon = myTeam.splice(indexInTeam, 1)[0];
        myTeam.splice(indexInTeam - 1, 0, movedPokemon);

        renderTeam();
        renderReserves();
    }
}
// FLyttar pokemonen ner
function moveDownInTeam(pokemon) {
    const indexInTeam = myTeam.indexOf(pokemon);

    if (indexInTeam !== -1 && indexInTeam < myTeam.length - 1) {
        const movedPokemon = myTeam.splice(indexInTeam, 1)[0];
        myTeam.splice(indexInTeam + 1, 0, movedPokemon);

        renderTeam();
    }
}

// Renderar myTeam med hjälp av for each som loopar igenom listan och kallar på funktionen som skapar pokemon containern.
function renderTeam() {
    teamPokemonContainer.innerHTML = "";
    myTeam.forEach((pokemon) => {
        const teamPokemonElement = createTeamPokemonElement(pokemon);
        teamPokemonContainer.appendChild(teamPokemonElement);
    });
}

// Lägger till pokemon i myTeam arrayen. Om den är full används pop för att ta bort sista i listan och flytta den till reserves.
function addToTeam(pokemon) {
    myTeam.push(pokemon);

    if (myTeam.length > myTeamLimit) {
        const reservePokemon = myTeam.pop();
        myReserves.push(reservePokemon);
    }

    renderReserves();
    renderTeam();
}

function renderReserves() {
    reservesPokemonContainer.innerHTML = "";
    myReserves.forEach((pokemon) => {
        const reservePokemonElement = createReservePokemonElement(pokemon);
        reservesPokemonContainer.appendChild(reservePokemonElement);
    });
}

// Kickar från reserves
function kickFromReserves(pokemon) {
    const indexInReserves = myReserves.indexOf(pokemon);
    if (indexInReserves !== -1) {
        myReserves.splice(indexInReserves, 1);
        renderReserves();
    }
}

// Flyttar upp reserver
function moveUpInReserves(pokemon) {
    const indexInReserves = myReserves.indexOf(pokemon);

    if (indexInReserves > 0) {
        const movedPokemon = myReserves.splice(indexInReserves, 1)[0];
        myReserves.splice(indexInReserves - 1, 0, movedPokemon);

        renderReserves();
    }
}

// Flyttar ner reserver
function moveDownInReserves(pokemon) {
    const indexInReserves = myReserves.indexOf(pokemon);

    if (indexInReserves !== -1 && indexInReserves < myReserves.length - 1) {
        const movedPokemon = myReserves.splice(indexInReserves, 1)[0];
        myReserves.splice(indexInReserves + 1, 0, movedPokemon);

        renderReserves();
    }
}
