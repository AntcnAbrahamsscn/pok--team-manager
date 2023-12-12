const pokemonSearchInput = document.querySelector("#pokemon-search-input");
const pokemonSearchButton = document.querySelector("#pokemon-search-button");

// Remove the click event listener on the input field
// pokemonSearchInput.addEventListener("click", (event) => {
//     event.preventDefault();
// });

pokemonSearchButton.addEventListener("click", (event) => {
    event.preventDefault();  // Prevent form submission or other default actions
    console.log(pokemonSearchInput.value);
});