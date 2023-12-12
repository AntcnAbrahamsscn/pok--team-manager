const pokemonSearchInput = document.querySelector("#pokemon-search-input");
const pokemonSearchButton = document.querySelector("#pokemon-search-button");

pokemonSearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(pokemonSearchInput.value);
});