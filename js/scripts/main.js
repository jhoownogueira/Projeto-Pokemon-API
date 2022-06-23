// scrips do Slide Principal
var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
    pagination: {
      el: ".slide-hero .main-area .area-explore .swiper-pagination",
    },
  });

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseCard = document.querySelector('.js-close-details-pokemon');

cardPokemon.forEach(card => {
card.addEventListener('click', openDetailsPokemon);
});

btnCloseCard.addEventListener('click', closeDetailsPokemon);

const btnDropdownSelect = document.querySelector('.js-open-select-custom');

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active');
})


const areaPokemons = document.getElementById('js-list-pokemons');

function primeiraLetraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCardPokemon(code, type, nome, imagePok) {
  let card = document.createElement('button');
   card.classList = `card-pokemon js-open-details-pokemon ${type}`;
   areaPokemons.appendChild(card);

   let image = document.createElement('div');
   image.classList = 'image';
   card.appendChild(image);

   let imageSrc = document.createElement('img');
   imageSrc.className = 'thumb-img';
   imageSrc.setAttribute('src', imagePok);
   image.appendChild(imageSrc);

   let infoCardPokemon = document.createElement('div');
   infoCardPokemon.classList = 'info';
   card.appendChild(infoCardPokemon);

   let infoTextPokemon = document.createElement('div');
   infoTextPokemon.classList = 'text';
   infoCardPokemon.appendChild(infoTextPokemon);

   let infoCodePokemon = document.createElement('span');
   infoCodePokemon.innerText = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}`: `#${code}`;
   infoTextPokemon.appendChild(infoCodePokemon);

   let infoNamePokemon = document.createElement('h3');
   infoNamePokemon.innerText = primeiraLetraMaiuscula(nome);
   infoTextPokemon.appendChild(infoNamePokemon);

   let areaIcon = document.createElement('div');
   areaIcon.classList = 'icon';
   infoCardPokemon.appendChild(areaIcon);

   let imageType = document.createElement('img');
   imageType.setAttribute('src', `img/icon-types/${type}.svg`);
   areaIcon.appendChild(imageType);

   
}

function listingPokemons(urlApi) {
  axios({
    method: 'GET',
    url: urlApi,
  })
  .then((response) => {
    const countPokemons = document.getElementById('js-count-pokemons');

    const { results, next, count } = response.data;

    countPokemons.innerText = count;

    results.forEach(pokemon => {
      let urlApiDetails = pokemon.url;

      axios({
        method: 'GET',
        url: `${urlApiDetails}`
      })
      .then(response => {
        const { name, id, sprites, types } = response.data;
        
        const infoCard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name

        }
        createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);

        const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
        cardPokemon.forEach(card => {
          card.addEventListener('click', openDetailsPokemon)
        })

      })
    })
  })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');


function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}
