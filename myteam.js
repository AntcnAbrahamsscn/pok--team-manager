import { fetchPokemonData, handleSearch, applyTypeColor } from "./pokemon.js";
// import { generateUniqueId } from "./pokemon.js";

export { addToTeam, uniqueIdCounter, renderTeam, renderReserves, myTeam, myReserves };
const teamPokemonContainer = document.querySelector(".team-pokemons-container");
const reservesPokemonContainer = document.querySelector(
    ".reserves-pokemons-container"
);

const lineUpContainer = document.querySelector('.line-up-container');


const myTeam = [];
const myTeamLimit = 3;
const myReserves = [];

// Nickname input
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
// const nicknameInput = document.createElement("input");
nicknameInput.classList.add("nickname-input");

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
    const id = data.id;
    moveUpInTeam(data.id, index);
});

moveDownButton.addEventListener("click", function () {
    const id = data.id;
    moveDownInTeam(data.id, index);
});

buttonsContainer.appendChild(removeButton);
buttonsContainer.appendChild(moveToReservesButton);
buttonsContainer.appendChild(moveUpButton);
buttonsContainer.appendChild(moveDownButton); // Add moveDownButton to the container
// pokemonInfoContainer.appendChild(moveDownButton) // Remove this line
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
function moveUpInTeam(id) {
    const index = myTeam.findIndex((pokemon) => pokemon.id === id);

    if (index > 0) {
        const movedPokemon = myTeam.splice(index, 1)[0];
        myTeam.splice(index - 1, 0, movedPokemon);

        console.log(`Moved ${movedPokemon.name} up in team.`);
        console.log('Updated myTeam:', myTeam);

        renderTeam();
        renderReserves();
    }
}

function moveDownInTeam(id) {
    const index = myTeam.findIndex((pokemon) => pokemon.id === id);

    if (index !== -1 && index < myTeam.length - 1) {
        const movedPokemon = myTeam.splice(index, 1)[0];
        myTeam.splice(index + 1, 0, movedPokemon);

        console.log(`Moved ${movedPokemon.name} down in team.`);
        console.log('Updated myTeam:', myTeam);

        renderTeam();
    }
}

// Renderar myTeam med hjälp av for each som loopar igenom listan och kallar på funktionen som skapar pokemon containern.
function renderTeam() {
    teamPokemonContainer.innerHTML = "";
    lineUpContainer.innerHTML = ""; 

    myTeam.forEach((pokemon, index) => {
        console.log(`Unique ID for ${pokemon.name} in myTeam:`, pokemon.id); 
        const teamPokemonElement = createTeamPokemonElement(pokemon, index);
        teamPokemonContainer.appendChild(teamPokemonElement);
    });

    const lineUpMessage = document.createElement("h5")
    lineUpMessage.style.textAlign = "center"
    if (myTeam.length === myTeamLimit) {
        lineUpMessage.textContent = "line up complete";
    } else if (myTeam.length === 2) {
        lineUpMessage.textContent = "add one more pokemon and your team is ready";
    } else if (myTeam.length === 1) {
        lineUpMessage.textContent = "add two more pokemon and your team is ready";
    }else  {
        lineUpMessage.textContent = "add three pokemons to fill your team";
    }
    lineUpContainer.append(lineUpMessage)
}

// Lägger till pokemon i myTeam arrayen. Om den är full används pop för att ta bort sista i listan och flytta den till reserves.
let uniqueIdCounter = 0;

function addToTeam(pokemon) {
    myTeam.push(pokemon);

    if (myTeam.length > myTeamLimit) {
        const reservePokemon = myTeam.pop();
        myReserves.push(reservePokemon);
    }
    uniqueIdCounter++;
    renderReserves();
    renderTeam();
    
}
// function generateUniqueId() {
//     return new Date().getTime();
// }

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
renderTeam();
