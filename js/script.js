const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;
let allPokemonNames = []; // Guardar os nomes todos

const fetchAllPokemonNames = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
  const data = await response.json()
  allPokemonNames = data.results.map(pokemon => pokemon.name)
}

fetchAllPokemonNames();

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    return data;
  }
}

const renderPokemon = async (pokemon) => {
  pokemonImage.style.display = 'block'
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) { 
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found :c'
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // renderPokemon(input.value.toLowerCase());
  const searchTerm = input.value.toLowerCase()
  const matchedPokemon = allPokemonNames.filter(name => name.includes(searchTerm))

  if (matchedPokemon.length > 0) {
    renderPokemon(matchedPokemon[0]);
  } else {
    renderPokemon(searchTerm)
  }
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)

