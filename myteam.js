import { fetchPokemonData, handleSearch, applyTypeColor } from "./pokemon.js";

export {
    addToTeam,
    uniqueIdCounter,
    renderTeam,
    renderReserves,
    myTeam,
    myReserves,
};
const teamPokemonContainer = document.querySelector(".team-pokemons-container");
const reservesPokemonContainer = document.querySelector(
    ".reserves-pokemons-container"
);

const lineUpContainer = document.querySelector(".line-up-container");
const myTeam = [];
const myTeamLimit = 3;
const myReserves = [];

// Nickname input för att inte störa inputen på search all page
let isUpdatingNickname = false;

// Skapar pokemon-boxen
function createTeamPokemonElement(data, index) {
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
    nicknameInput.classList.add("nickname-input");

    nicknameInput.addEventListener("input", function () {
        if (!isUpdatingNickname) {
            const newNickname = nicknameInput.value.trim();
            updateNickname(data, newNickname);
            nicknameParagraph.textContent = newNickname
                ? "Nickname: " + newNickname
                : "";
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

    // Tabort-knapp oå
    removeButton.addEventListener("click", function () {
        removeFromTeam(data);
    });

    // Flytta till reserver-knapp
    pokemonInfoContainer.appendChild(removeButton);
    moveToReservesButton.addEventListener("click", function () {
        moveToReserves(data);
    });

    // Flyttar upp
    moveUpButton.addEventListener("click", function () {
        moveUpInTeam(index);
    });
    // Flyttar ner
    moveDownButton.addEventListener("click", function () {
        moveDownInTeam(index);
    });

    buttonsContainer.appendChild(removeButton);
    buttonsContainer.appendChild(moveToReservesButton);
    buttonsContainer.appendChild(moveUpButton);
    buttonsContainer.appendChild(moveDownButton); 
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
        const indexInReserves = myReserves.indexOf(data);
        moveUpInReserves(indexInReserves);
    });
    
    moveDownInReservesButton.addEventListener("click", function () {
        const indexInReserves = myReserves.indexOf(data);
        moveDownInReserves(indexInReserves);
    });

    moveUpInReservesButton.classList.add("button-pokemon-style", "move-up-button");
    moveDownInReservesButton.classList.add("button-pokemon-style", "move-down-button");

    buttonsReservesContainer.appendChild(kickFromReservesButton);
    buttonsReservesContainer.appendChild(moveUpInReservesButton);
    buttonsReservesContainer.appendChild(moveDownInReservesButton);
    pokemonContainer.appendChild(buttonsReservesContainer);

    return pokemonContainer;
}
// Funktion som tar bort pokemon från laget, utan att lägga den i reserver
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
// Funktion som flyttar pokemon från laget till reserver (myReserves.push(movedPokemon))
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
        }

        renderTeam();
        renderReserves();
    }
}
// FLyttar pokemonen upp i laget
function moveUpInTeam(index) {
    if (index > 0) {
        const movedPokemon = myTeam.splice(index, 1)[0];
        myTeam.splice(index - 1, 0, movedPokemon);

        console.log(`Moved ${movedPokemon.name} up in team.`);
        console.log("Updated myTeam:", myTeam);

        renderTeam();
        renderReserves();
    }
}

// Flyttar pokemon ner i laget
function moveDownInTeam(index) {
    if (index !== -1 && index < myTeam.length - 1) {
        const movedPokemon = myTeam.splice(index, 1)[0];
        myTeam.splice(index + 1, 0, movedPokemon);

        console.log(`Moved ${movedPokemon.name} down in team.`);
        console.log("Updated myTeam:", myTeam);

        renderTeam();
        renderReserves();
    }
}
// Identifierar knappen som trycks, för att undvika att flytta andra element
reservesPokemonContainer.addEventListener("click", function (event) {
    const target = event.target;
    const pokemonElement = target.closest(".pokemon-box-container");

    if (!pokemonElement) {
        return; 
    }

    const indexInReserves = Array.from(reservesPokemonContainer.children).indexOf(pokemonElement);

    if (target.classList.contains("move-up-button")) {
        moveUpInReserves(indexInReserves);
    } else if (target.classList.contains("move-down-button")) {
        moveDownInReserves(indexInReserves);
    } else if (target.classList.contains("kick-from-reserves-button")) {
        kickFromReserves(myReserves[indexInReserves]);
    }
});

// Renderar myTeam med hjälp av for each som loopar igenom listan och kallar på funktionen som skapar pokemon containern.
function renderTeam() {
    teamPokemonContainer.innerHTML = "";
    lineUpContainer.innerHTML = "";

    myTeam.forEach((pokemon, index) => {
        console.log(`Unique ID for ${pokemon.name} in myTeam:`, pokemon.id);
        const teamPokemonElement = createTeamPokemonElement(pokemon, index);
        teamPokemonContainer.appendChild(teamPokemonElement);
    });
    // När laget renderas räknar denna om laget är fullt eller inte.
    const lineUpMessage = document.createElement("h5");
    lineUpMessage.style.textAlign = "center";
    if (myTeam.length === myTeamLimit) {
        lineUpMessage.textContent = "line up is complete";
    } else if (myTeam.length === 2) {
        lineUpMessage.textContent =
            "add one more pokemon and your team is ready";
    } else if (myTeam.length === 1) {
        lineUpMessage.textContent =
            "add two more pokemon and your team is ready";
    } else {
        lineUpMessage.textContent = "add three pokemons to fill your team";
    }
    lineUpContainer.append(lineUpMessage);
}

// Lägger till pokemon i myTeam arrayen. Om den är full används pop för att ta bort sista i listan och flytta den till reserves.
let uniqueIdCounter = 0;

function addToTeam(pokemon) {
    const copiedPokemon = JSON.parse(JSON.stringify(pokemon));
    myTeam.push(copiedPokemon);

    if (myTeam.length > myTeamLimit) {
        const reservePokemon = myTeam.pop();
        myReserves.push(reservePokemon);
    }

    uniqueIdCounter++;
    renderReserves();
    renderTeam();
}

// Renderar reserv arrayen
function renderReserves() {
    reservesPokemonContainer.innerHTML = "";
    myReserves.forEach((pokemon, index) => {
        const reservePokemonElement = createReservePokemonElement(pokemon, index);
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
function moveUpInReserves(index) {
    console.log("Attempting to move up in reserves at index:", index);
    if (index > 0 && index < myReserves.length) {
        const movedPokemon = JSON.parse(JSON.stringify(myReserves[index]));

        myReserves.splice(index, 1);
        myReserves.splice(index - 1, 0, movedPokemon);

        console.log(`Moved ${movedPokemon.name} up in reserves.`);
        console.log("Updated myReserves:", myReserves);

        renderReserves();
    }
}

// Move down in reserves
function moveDownInReserves(index) {
    console.log("Attempting to move down in reserves at index:", index);
    if (index >= 0 && index < myReserves.length - 1) {
        const movedPokemon = JSON.parse(JSON.stringify(myReserves[index]));

        myReserves.splice(index, 1);
        myReserves.splice(index + 1, 0, movedPokemon);

        console.log(`Moved ${movedPokemon.name} down in reserves.`);
        console.log("Updated myReserves:", myReserves);

        renderReserves();
    }
}

// Uppdaterar sidan vid laddning
renderTeam();
renderReserves();
