


// pokemonSearchButton.addEventListener("click", async ()=> {
//     resultList.innerText = ""
//     const url = "https://api.adviceslip.com/advice"
//     const response = await fetch(url)
//     const data = await response.json()
//     console.log(JSON.stringify(data));
//     pResults.innerText = data.slip.advice
//     button.disabled = true
//     setTimeout(()=> {
//         button.disabled = false
//     } ,2000)
//     cookiesArray.push(data.slip)
//     cookiesArray.forEach(element => {
//         const li = document.createElement("li")
//         li.innerText = `id: ${element.id} advice: ${element.advice}`
//         resultList.appendChild(li) 
//     });
//     console.log(cookiesArray);
// })


// Example caching using localStorage

// pokemonSearchButton.addEventListener("click", async ()=> {
// const cacheKey = `pokemon_${pokemonName}`;
// const cachedData = localStorage.getItem(cacheKey);

// if (cachedData) {
//   // Use cached data
//   const data = JSON.parse(cachedData);
//   console.log('Data from cache:', data);
// } else {
//   // Make a new API request
//   fetch(apiUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Handle the data
//       console.log('Data from API:', data);

//       // Cache the data
//       localStorage.setItem(cacheKey, JSON.stringify(data));
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }})

const pokemonSearchButton = document.querySelector("#pokemon-search-button");
const wordArray = ["apple", "banana", "orange", "grape", "pear"];

function search(event) {
    event.preventDefault();
    const pokemonSearchInput = document.querySelector("#pokemon-search-input");
    const searchTerm = pokemonSearchInput.value.toLowerCase();
    
    const teamContainer = document.querySelector(".team-container")
    teamContainer.innerHTML = "";

  wordArray.forEach(word => {
    const lowerCaseWord = word.toLowerCase();

    if (lowerCaseWord.includes(searchTerm)) {
      const div = document.createElement("div");
      div.textContent = word;
      div.classList.add("pokemon-item")
      teamContainer.appendChild(div);
    }
  });
}

pokemonSearchButton.addEventListener("click", search);
// Lyssna på klickhändelsen på knappen