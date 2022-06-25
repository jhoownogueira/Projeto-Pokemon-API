"use strict";var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .main-area .area-explore .swiper-pagination"}}),cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),btnCloseCard=document.querySelector(".js-close-details-pokemon"),btnDropdownSelect=(cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),btnCloseCard.addEventListener("click",closeDetailsPokemon),document.querySelector(".js-open-select-custom")),areaPokemons=(btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")}),document.getElementById("js-list-pokemons"));function primeiraLetraMaiuscula(e){return e.charAt(0).toUpperCase()+e.slice(1)}function createCardPokemon(e,t,n,o){var a=document.createElement("button"),i=(a.classList="card-pokemon js-open-details-pokemon ".concat(t),areaPokemons.appendChild(a),document.createElement("div")),c=(i.classList="image",a.appendChild(i),document.createElement("img")),o=(c.className="thumb-img",c.setAttribute("src",o),i.appendChild(c),document.createElement("div")),i=(o.classList="info",a.appendChild(o),document.createElement("div")),c=(i.classList="text",o.appendChild(i),document.createElement("span")),a=(c.innerText=(e<10?"#00":e<100?"#0":"#").concat(e),i.appendChild(c),document.createElement("h3")),e=(a.innerText=primeiraLetraMaiuscula(n),i.appendChild(a),document.createElement("div")),c=(e.classList="icon",o.appendChild(e),document.createElement("img"));c.setAttribute("src","img/icon-types/".concat(t,".svg")),e.appendChild(c)}function listingPokemons(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),e=e.data,n=e.results,e=(e.next,e.count);t.innerText=e,n.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,t=e.name,n=e.id,o=e.sprites,e=e.types,t={nome:t,code:n,image:o.other.dream_world.front_default,type:e[0].type.name};createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})})}function openDetailsPokemon(){document.documentElement.classList.add("open-modal")}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0");var areaTypes=document.getElementById("js-type-area"),areaTypesMobile=document.querySelector(".dropdown-select"),btnLoadMore=(axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var n,o,a;t<18&&(o=document.createElement("li"),areaTypes.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),o.appendChild(n),(o=document.createElement("div")).classList="icon",n.appendChild(o),(a=document.createElement("img")).setAttribute("src","img/icon-types/".concat(e.name,".svg")),o.appendChild(a),(o=document.createElement("span")).innerText=primeiraLetraMaiuscula(e.name),n.appendChild(o),a=document.createElement("li"),areaTypesMobile.appendChild(a),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),a.appendChild(n),(o=document.createElement("div")).classList="icon",n.appendChild(o),(t=document.createElement("img")).setAttribute("src","img/icon-types/".concat(e.name,".svg")),o.appendChild(t),(a=document.createElement("span")).innerText=primeiraLetraMaiuscula(e.name),n.appendChild(a),document.querySelectorAll(".type-filter").forEach(function(e){e.addEventListener("click",filterByType)}))})}),document.getElementById("js-btn-load-more")),countPaginationPokemons=10;function showMorePokemons(){listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPaginationPokemons)),countPaginationPokemons+=9}function filterByType(){var e=this.getAttribute("code-type"),t=document.getElementById("js-list-pokemons"),n=document.getElementById("js-btn-load-more"),o=document.getElementById("js-count-pokemons"),a=document.querySelectorAll(".type-filter");t.innerHTML="",n.style.display="none";var i=document.querySelector(".all-info-pokemons").offsetTop;window.scrollTo({top:i+288,behavior:"smooth"}),a.forEach(function(e){e.classList.remove("active")}),this.classList.add("active"),e?axios({method:"GET",url:"https://pokeapi.co/api/v2/type/".concat(e)}).then(function(e){e=e.data.pokemon;o.textContent=e.length,e.forEach(function(e){e=e.pokemon.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,t=e.name,n=e.id,o=e.sprites,e=e.types,t={nome:t,code:n,image:o.other.dream_world.front_default,type:e[0].type.name};t.image&&createCardPokemon(t.code,t.type,t.nome,t.image),document.querySelectorAll(".js-open-details-pokemon").forEach(function(e){e.addEventListener("click",openDetailsPokemon)})})})}):(t.innerHTML="",listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),n.style.display="block")}btnLoadMore.addEventListener("click",showMorePokemons);