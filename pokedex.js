const pokedex = document.getElementById('pokedex');

const btnAnterior = document.querySelector(".btn-anterior");
const btnSiguiente = document.querySelector(".btn-siguiente");

let Button1 = 1;
let Button2 = 10;
btnAnterior.style.display = 'none'; 

////////////////////////////////////////////////////////////////////////////////

const pokemon = document.getElementById("pokemonName")
const search = document.getElementById("searchPokemon")
search.addEventListener("click", consultarPokemon)//isabel
function consultarPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value.toLowerCase()}`)
      .then(function (response) {
          response.json() // paso la respuesta a JSON
              .then(function (pokemon) {
                pintaPokemon(pokemon);
              })
      })
}

/* //// Los datos que tome de la API, los pongo en mis elementos HTML ////// */
const PokeNombre = document.querySelector(".title");
const PokeTipo = document.querySelector(".pokeTipo");
const pokeHabilidad = document.querySelector(".pokeHabilidad");
const pokeExperiencia = document.querySelector(".pokeExperiencia")
const pokeImagen = document.querySelector(".tarjeta-img");


function ponerDatosPokemon(pokemon2) {

  PokeNombre.textContent = pokemon2.name
  PokeTipo.textContent = pokemon2.types[0].type.name
  pokeHabilidad.textContent = pokemon2.abilities[0].ability.name
  pokeImagen.style.backgroundImage = `url(${pokemon.sprites.front_default})`;
  pokeExperiencia.textContent = pokemon2.base_experience

  console.log(pokemon2);
};

//////////////////////////////////////////////////////////////////////////////
btnSiguiente.addEventListener("click", () => {
  if (Button1 > 0){
      Button1 += 10;
      Button2 += 10;
      btnAnterior.style.display = 'block';
  }
  if(Button2 > 800){
      btnSiguiente.style.display = 'none';
      btnAnterior.style.display = 'block';
  }
  poke();
});

btnAnterior.addEventListener("click", () => {
  if (Button1 > 10){
      Button1 -= 10;
      Button2 -= 10;
      btnSiguiente.style.display = 'block';
  }
  if (Button1 < 10){
      btnSiguiente.style.display = 'block';
      btnAnterior.style.display = 'none';
  }
  poke();
});

const poke = () => {

  const grupo = [];

  for (let id = Button1; id <= Button2; id++) {
      getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
  function getPokemon(url) {
    grupo.push(
      fetch(url)
        .then((response) => response.json()));
    }


   
  Promise.all(grupo).then((pokemons) => {
    const pokemon = pokemons.map((result) => ({
        nombre: result.name,
        imagen: result.sprites.other['official-artwork'].front_default,
        tipo: result.types.map((type)=>type.type.name).join('  '+'   '),
        // weight: result.weight,
        id: result.id
      }));
      pintaPokemon(pokemon);
  });

 
};
const pintaPokemon = (pokemon) => {
  const Html = pokemon.map((pokemon1) =>
      `<li class="card">
          <img class="card-image" src="${pokemon1.imagen}"/>
          <h2 class="card-title">${pokemon1.id} - ${pokemon1.nombre}</h2>
          <p class="card-subtitle">Tipo: ${(pokemon1.tipo)}</p>
      </li>`).join('');
  pokedex.innerHTML = Html;
  
};
poke();





// const pokemon = results.map((result) => ({
//   name: result.name,
//   image: result.sprites['front_default'],
//   type: result.types.map((type) => type.type.name).join(', '),
//   id: result.id
