// scrips do Slide Principal
var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
    pagination: {
      el: ".slide-hero .main-area .area-explore .swiper-pagination",
    },
  });

const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseCard = document.querySelector('.js-close-details-pokemon');
const countPokemons = document.getElementById('js-count-pokemons');

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
   card.setAttribute('code-pokemon', code);
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

  let codePokemon = this.getAttribute('code-pokemon');
  let imagePokemon = this.querySelector('.thumb-img');
  let iconTypePokemon = this.querySelector('.info .icon img');
  let namePokemon = this.querySelector('.info .text h3');
  let codeNamePokemon = this.querySelector('.info .text span');
  
  const modalDetails = document.getElementById('js-modal-details');
  const imgPokemonModal = document.getElementById('js-image-pokemon-modal');
  const iconTypePokemonModal = document.getElementById('js-image-type-modal');
  const namePokemonModal = document.getElementById('js-name-pokemon-modal');
  const codePokemonModal = document.getElementById('js-code-pokemon-modal');
  const heightPokemonModal = document.getElementById('js-height-pokemon');
  const weightPokemonModal = document.getElementById('js-weight-pokemon');
  const mainAbilitiesPokemonModal = document.getElementById('js-main-abilities');


  modalDetails.setAttribute('type-pokemon-modal', this.classList[2]);
  imgPokemonModal.setAttribute('src', imagePokemon.getAttribute('src'));
  iconTypePokemonModal.setAttribute('src', iconTypePokemon.getAttribute('src'));
  namePokemonModal.textContent = namePokemon.textContent;
  codePokemonModal.textContent = codeNamePokemon.textContent;
  
  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
  })
  .then(response => {
    let data = response.data;

    let infoPokemon = {
      mainAbilities: primeiraLetraMaiuscula(data.abilities[0].ability.name),
      types: data.types,
      weight: data.weight,
      height: data.height,
      abilities: data.abilities,
      stats: data.stats,
      urlType: data.types[0].type.url
    }

    function listingTypesPokemon() {
      const areaTypesModal = document.getElementById('js-types-pokemon');

      let arrayTypes = infoPokemon.types;
      
      areaTypesModal.innerHTML = '';

      arrayTypes.forEach(itemType => {
        let itemList = document.createElement('li');
        areaTypesModal.appendChild(itemList);

        let spanList = document.createElement('span');
        spanList.classList = `tag-type ${itemType.type.name}`
        spanList.textContent = primeiraLetraMaiuscula(itemType.type.name);
        itemList.appendChild(spanList); 
      })
    }

    function listingWeaknessesPokemon() {
      const areaWeak = document.getElementById('js-area-weak');
      areaWeak.innerHTML = '';

      axios({
        method: 'GET',
        url: `${infoPokemon.urlType}`
      })
      .then(response => {
        let weaknesses = response.data.damage_relations.double_damage_from;
        
        weaknesses.forEach(itemType => {
          let itemListWeak = document.createElement('li');
          areaWeak.appendChild(itemListWeak);
  
          let spanList = document.createElement('span');
          spanList.classList = `tag-type ${itemType.name}`
          spanList.textContent = primeiraLetraMaiuscula(itemType.name);
          itemListWeak.appendChild(spanList); 
        })
      })
    }

    heightPokemonModal.textContent = `${infoPokemon.height / 10}m`;
    weightPokemonModal.textContent = `${infoPokemon.weight / 10}kg`;
    mainAbilitiesPokemonModal.textContent = infoPokemon.mainAbilities;

    const statsHp = document.getElementById('js-stats-hp');
    const statsAtk = document.getElementById('js-stats-atk');
    const statsDef = document.getElementById('js-stats-def');
    const statsSpAtk = document.getElementById('js-stats-sp-atk');
    const statsSpDef = document.getElementById('js-stats-sp-def');
    const statsSpd = document.getElementById('js-stats-spd');

    statsHp.style.width = `${infoPokemon.stats[0].base_stat}%`
    statsAtk.style.width = `${infoPokemon.stats[1].base_stat}%`
    statsDef.style.width = `${infoPokemon.stats[2].base_stat}%`
    statsSpAtk.style.width = `${infoPokemon.stats[3].base_stat}%`
    statsSpDef.style.width = `${infoPokemon.stats[4].base_stat}%`
    statsSpd.style.width = `${infoPokemon.stats[5].base_stat}%`

    listingTypesPokemon();
    listingWeaknessesPokemon();
  })
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

// Button tipos de pokemons

const areaTypes = document.getElementById('js-type-area');
const areaTypesMobile = document.querySelector('.dropdown-select');

axios({
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/type'
})
.then(response => {
  const {results} = response.data;

  results.forEach((type, index) => {
    if(index < 18) {
      let itemType = document.createElement('li');
      areaTypes.appendChild(itemType);

      let buttonType = document.createElement('button');
      buttonType.classList = `type-filter ${type.name}`;
      buttonType.setAttribute('code-type', index + 1);
      itemType.appendChild(buttonType);

      let iconType = document.createElement('div');
      iconType.classList = 'icon';
      buttonType.appendChild(iconType);

      let imgType = document.createElement('img');
      imgType.setAttribute('src', `img/icon-types/${type.name}.svg`);
      iconType.appendChild(imgType);

      let textType = document.createElement('span');
      textType.innerText = primeiraLetraMaiuscula(type.name);
      buttonType.appendChild(textType);

      // Preencimento Select Type Mobile

      let itemTypeMobile = document.createElement('li');
      areaTypesMobile.appendChild(itemTypeMobile);

      let buttonTypeMobile = document.createElement('button');
      buttonTypeMobile.classList = `type-filter ${type.name}`;
      buttonTypeMobile.setAttribute('code-type', index + 1);
      itemTypeMobile.appendChild(buttonTypeMobile); 
      
      let iconTypeMobile = document.createElement('div');
      iconTypeMobile.classList = 'icon';
      buttonTypeMobile.appendChild(iconTypeMobile);

      let imgTypeMobile = document.createElement('img');
      imgTypeMobile.setAttribute('src', `img/icon-types/${type.name}.svg`);
      iconTypeMobile.appendChild(imgTypeMobile);

      let textTypeMobile = document.createElement('span');
      textTypeMobile.innerText = primeiraLetraMaiuscula(type.name);
      buttonTypeMobile.appendChild(textTypeMobile);

      const allTypes = document.querySelectorAll('.type-filter');
      allTypes.forEach(btn => {
        btn.addEventListener('click', filterByType);
      })

    }
  })
})

// Load More Pokemons

const btnLoadMore = document.getElementById('js-btn-load-more');
let countPaginationPokemons = 10; 

function showMorePokemons() {
    listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPaginationPokemons}`);
    countPaginationPokemons = countPaginationPokemons + 9;
}
btnLoadMore.addEventListener('click', showMorePokemons);

// Filtrar Pokemons por tipo

function filterByType() {
  let idPokemon = this.getAttribute('code-type');
  const areaPokemons = document.getElementById('js-list-pokemons');
  const btnLoadMore = document.getElementById('js-btn-load-more');
  const countPokemonsType = document.getElementById('js-count-pokemons');
  const allTypes = document.querySelectorAll('.type-filter');
  
  areaPokemons.innerHTML = "";
  btnLoadMore.style.display = "none";

  const sectionPokemons = document.querySelector('.all-info-pokemons');
  const topSection = sectionPokemons.offsetTop;

  window.scrollTo({
    top: topSection + 288,
    behavior: 'smooth'
  })



  allTypes.forEach(type => {
    type.classList.remove('active');
  })

  this.classList.add('active');

  if(idPokemon){

    axios({
      method: 'GET',
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`
    })
    .then(response => {
      const {pokemon} = response.data;
  
      countPokemonsType.textContent = pokemon.length;
      
      
      pokemon.forEach(pok => {
        const {url} = pok.pokemon;
  
        axios({
          method: 'GET',
          url: `${url}`
        })
        .then(response => {
          const { name, id, sprites, types } = response.data;
          
          const infoCard = {
            nome: name,
            code: id,
            image: sprites.other.dream_world.front_default,
            type: types[0].type.name
  
          }
          if (infoCard.image) {
          createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image);
          }  
          const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
          cardPokemon.forEach(card => {
            card.addEventListener('click', openDetailsPokemon)
          })
        })
      })
    })
  } else {
    areaPokemons.innerHTML = "";
    listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
    btnLoadMore.style.display = "block";
  }

 
}

// Buscar Pokemons

const btnSearch = document.getElementById('js-btn-search');
const inputSearch = document.getElementById('js-input-search');

btnSearch.addEventListener('click', searchPokemon);

inputSearch.addEventListener('keyup', (e) => {
  if(e.code === 'Enter') {
    searchPokemon();
  }
})

function searchPokemon() {
  let valueInput = inputSearch.value.toLowerCase(); 
  const typeFilter = document.querySelectorAll('.type-filter');

  typeFilter.forEach(type => {
    type.classList.remove('active');
  })
  
  axios( {
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`
  })
  .then(response => {
    areaPokemons.innerHTML = '';
    btnLoadMore.style.display = 'none';
    countPokemons.textContent = 1;

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
  .catch((error) => {
    if(error.response) {
      areaPokemons.innerHTML = '';
      btnLoadMore.style.display = 'none';
      countPokemons.textContent = 0;
      alert('Não foi encontrado nenhum Pokemon');
    }
  })
  
}