let pokemonNome = document.querySelector(".nome")
let pokemonNumero = document.querySelector(".numero")
let pokemonImg = document.querySelector(".pokemon")
let form = document.querySelector(".form")
let input = document.querySelector(".pesquisar")
let proxBotao = document.querySelector(".btn-ant")
let depBotao = document.querySelector(".btn-dep")
let procurarPokemon = 1

let fetchPokemon = async (pokemon) => {
	let APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

	if (APIResponse.status == 200) {
		let data = await APIResponse.json()
		return data;
	}
}

let renderPokemon = async (pokemon) => {
	pokemonNome.innerHTML = "Loading..."
	pokemonNumero.innerHTML = ""
	let data = await fetchPokemon(pokemon)

	if (data) {
		pokemonImg.style.display = "block"
		pokemonNome.innerHTML = data.name
		pokemonNumero.innerHTML = data.id
		pokemonImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
		input.value = ""
		procurarPokemon = data.id
	} else {
		pokemonImg.style.display = "none"
		pokemonNome.innerHTML = "Not Found... :("
		pokemonNumero.innerHTML = ""
	}
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(input.value.toLowerCase())
})

proxBotao.addEventListener("click", (event) => {
	if (procurarPokemon > 1) {
		procurarPokemon -= 1
		renderPokemon(procurarPokemon)
	}
})

depBotao.addEventListener("click", (event) => {
	procurarPokemon += 1;
	renderPokemon(procurarPokemon)
})

renderPokemon(procurarPokemon)