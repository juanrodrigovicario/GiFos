"use strict";

var _api_key = require("./api_key.js");

var bottoModoNocturno = document.getElementById('bottom-modo-nocturno');
bottoModoNocturno.addEventListener('click', toggleRender); // bottoModoNocturno.addEventListener('click', function(){
//     if(bottoModoNocturno.innerHTML==='MODO DIURNO'){
//         bottoModoNocturno.innerHTML='MODO NOCTURNO'
//     }else{
//         bottoModoNocturno.innerHTML='MODO DIURNO'
//     }
// })

function toggleRender() {
  document.getElementById('menu-line-hover').classList.toggle('trending-dark');
  document.getElementById('body').classList.toggle('dark');
  document.getElementById('boton-prueba').classList.toggle('anchor-dark');
  document.getElementById('boton-prueba1').classList.toggle('anchor-dark');
  document.getElementById('boton-prueba2').classList.toggle('anchor-dark'); // document.querySelectorAll('.anchor').classList.toggle('anchor-dark')

  document.getElementById('input-search').classList.toggle('dark');
  document.getElementById('trending-section').classList.toggle('trending-dark');
} // ----------- ----------- AUTOCOMPLETADO DE BUSQUEDA ----------- ------------- 
// ----------- ----------- AUTOCOMPLETADO DE BUSQUEDA ----------- ------------- 


var letrasAutocompletado = document.getElementById('input-search');
letrasAutocompletado.addEventListener('keyup', autocompletado); // letrasAutocompletado.addEventListener('key', function(){
//     console.log(letrasAutocompletado.value)
// })

function autocompletado() {
  var letras, res, resJason, suggestions, cuadroBusqueda, divConteiner;
  return regeneratorRuntime.async(function autocompletado$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          letras = letrasAutocompletado.value;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/search/tags?api_key=".concat(_api_key.API_KEY, "&q=").concat(letras)));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json());

        case 6:
          resJason = _context.sent;
          suggestions = resJason.data;
          cuadroBusqueda = document.getElementById('cuadro-de-busqueda');
          divConteiner = document.getElementById('suggestions');
          divConteiner.innerHTML = '';
          suggestions.forEach(function (word) {
            var divsSuggestion = document.createElement('div');
            var suggestion = document.createTextNode("".concat(word.name));
            divsSuggestion.appendChild(suggestion);
            divsSuggestion.setAttribute('class', 'suggestion');
            divConteiner.appendChild(divsSuggestion);
            divConteiner.setAttribute('class', 'suggestions');
            cuadroBusqueda.appendChild(divConteiner);
            divsSuggestion.addEventListener('click', renderGifs);
            divsSuggestion.addEventListener('click', delateSuggestios);
            divsSuggestion.addEventListener('click', function () {
              // console.log(word.name)
              var title = document.getElementById('main-title');
              var p = document.getElementById('main-p');
              p.innerHTML = '';
              title.innerHTML = "".concat(word.name.toUpperCase());
              title.style.fontSize = '35px';
            });
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
} // ----------- ----------- ELIMINA AUTOSUGERENCIA DEL BUSCADOR  ----------- ------------- 
// ----------- ----------- ELIMINA AUTOSUGERENCIA DEL BUSCADOR  ----------- ------------- 


function delateSuggestios() {
  var divConteiner = document.getElementById('suggestions');
  divConteiner.innerHTML = '';
} // ----------- ----------- RENDERIZADO DE GIFS - SEARCH ----------- ------------- 
// ----------- ----------- RENDERIZADO DE GIFS - SEARCH ----------- ------------- 


var inputSearch = document.getElementById('form');
inputSearch.addEventListener('submit', function (event) {
  event.preventDefault();
});
inputSearch.addEventListener('submit', renderGifs); // let userSearch = document.getElementById('input-search').value
// inputSearch.addEventListener('submit', renderNameSearch(userSearch))
// inputSearch.addEventListener('submit', renderButtonVerMas)

function renderGifs() {
  var userSearch, response, gifsResponse, gifs, renderGifs, renderButtonMas;
  return regeneratorRuntime.async(function renderGifs$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userSearch = document.getElementById('input-search').value; // console.log(userSearch)

          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(_api_key.API_KEY, "&q=").concat(userSearch, "&limit=12&offset=$0&rating=g&lang=en")));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          gifsResponse = _context2.sent;
          gifs = gifsResponse.data; // console.log(gifs.data)
          // let gif = gifs.data[0].images.original.url
          // console.log(gif)

          renderGifs = document.getElementById('render-gifs');
          renderGifs.innerHTML = '';
          gifs.forEach(function (element) {
            var url = element.images.original.url;
            var gifTitle = element.title;
            var userName = element.username;
            var idGif = element.id;
            var divConteiner = document.createElement('div');
            var img = document.createElement('img');
            divConteiner.setAttribute('class', 'main-render-img');
            img.setAttribute('src', "".concat(url));
            img.setAttribute('class', 'img');
            img.setAttribute('alt', 'esperando cargar GIF');
            divConteiner.appendChild(img);
            renderGifs.appendChild(divConteiner);
            var divViolet = document.createElement('div');
            var divComand = document.createElement('div');
            var divLikedGif = document.createElement('div');
            var downloadGif = document.createElement('div');
            var expandGif = document.createElement('div');
            var divInfoGif = document.createElement('div');
            var divUserGif = document.createElement('div');
            var divTitleGif = document.createElement('div');
            var textUserGif = document.createTextNode("".concat(userName));
            var textTitleGif = document.createTextNode("".concat(gifTitle));
            divViolet.setAttribute('class', 'violet');
            divComand.setAttribute('class', 'comand-gif');
            divLikedGif.setAttribute('class', 'liked-gif');

            if (localStorage.hasOwnProperty("".concat(idGif))) {
              divLikedGif.setAttribute('class', 'favorite-gif');
            }

            downloadGif.setAttribute('class', 'download-gif');
            expandGif.setAttribute('class', 'expand-gif');
            divInfoGif.setAttribute('class', 'info-gif');
            divUserGif.setAttribute('class', 'user-gif');
            divTitleGif.setAttribute('class', 'titulo-gif');
            divUserGif.appendChild(textUserGif);
            divTitleGif.appendChild(textTitleGif);
            divInfoGif.appendChild(divTitleGif);
            divInfoGif.appendChild(divUserGif);
            divComand.appendChild(divLikedGif);
            divComand.appendChild(downloadGif);
            divComand.appendChild(expandGif);
            divConteiner.appendChild(divViolet);
            divConteiner.appendChild(divComand);
            divConteiner.appendChild(divInfoGif);
            divLikedGif.addEventListener('click', function () {
              if (localStorage.hasOwnProperty(idGif) != false) {
                divLikedGif.classList.toggle('favorite-gif');
                divLikedGif.classList.toggle('liked-gif');
                localStorage.removeItem("".concat(idGif));
                console.log(localStorage);
              } else {
                console.log('no la tinen');
                divLikedGif.classList.toggle('favorite-gif');
                divLikedGif.classList.toggle('liked-gif');
                localStorage.setItem("".concat(idGif), JSON.stringify(element));
                console.log(localStorage);
              }
            });
          });
          renderNameSearch(userSearch);
          delateSuggestios();
          renderButtonMas = document.querySelector('#div-button');
          renderButtonMas.innerHTML = '';
          renderButtonVerMas();

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
} // ----------- ----------- CLICK PARA GUARDAR EN LOCAL STORAGE ----------- ------------- 
// ----------- ----------- CLICK PARA GUARDAR EN LOCAL STORAGE ----------- ------------- 
// function saveLocalStorage(){
//     console.log(this.element)
// }
// ------ RENDERIZA EL NOMBRE DE "LA BUSQEUDA" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------
// ------ RENDERIZA EL NOMBRE DE "LA BUSQEUDA" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------


function renderNameSearch(userSearch) {
  var title = document.getElementById('main-title');
  var p = document.getElementById('main-p');
  p.innerHTML = '';
  title.innerHTML = "".concat(userSearch.toUpperCase());
  title.style.fontSize = '35px';
} // ------ RENDERIZA BOTON "VER MAS" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------
// ------ RENDERIZA BOTON "VER MAS" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------


function renderButtonVerMas() {
  var renderButtonMas = document.querySelector('#div-button');
  var buttonVerMas = document.createElement('button');
  var textButton = document.createTextNode('ver mas');
  buttonVerMas.appendChild(textButton);
  buttonVerMas.setAttribute('class', 'button-ver-mas-class'); // buttonVerMas.setAttribute('id', 'button-ver-mas-id' )

  renderButtonMas.appendChild(buttonVerMas);
  buttonVerMas.addEventListener('click', render12GIfMas);
} // ----------- ------------- FUNCION QUE PERMITE VER 12 GIFS MAS ----------- -------------
// ----------- ------------- FUNCION QUE PERMITE VER 12 GIFS MAS ----------- -------------


var offset = 0;

function render12GIfMas() {
  var userSearch, response, jsonResponse, responseData;
  return regeneratorRuntime.async(function render12GIfMas$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          offset += 12;
          userSearch = document.getElementById('input-search').value;
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(_api_key.API_KEY, "&q=").concat(userSearch, "&limit=12&offset=").concat(offset, "&rating=g&lang=en")));

        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          jsonResponse = _context3.sent;
          // console.log(jsonResponse)
          responseData = jsonResponse.data; // console.log(responseData)

          responseData.forEach(function (element) {
            // const getId = document.getElementById('render-gifs')
            // const url = element.images.original.url
            // const img = document.createElement('img')
            // const divContenerImg = document.createElement('div')
            // img.setAttribute('src',`${url}`)
            // img.setAttribute('class', 'main-render-img')
            // divContenerImg.appendChild(img)
            // getId.appendChild(divContenerImg)
            var renderGifs = document.getElementById('render-gifs');
            var url = element.images.original.url;
            var divConteiner = document.createElement('div');
            var img = document.createElement('img');
            divConteiner.setAttribute('class', 'main-render-img');
            img.setAttribute('src', "".concat(url));
            img.setAttribute('class', 'img');
            img.setAttribute('alt', 'esperando cargar GIF');
            divConteiner.appendChild(img);
            renderGifs.appendChild(divConteiner);
            var divViolet = document.createElement('div');
            var divComand = document.createElement('div');
            var divLikedGif = document.createElement('div');
            var downloadGif = document.createElement('div');
            var expandGif = document.createElement('div');
            var divInfoGif = document.createElement('div');
            var divUserGif = document.createElement('div');
            var divTitleGif = document.createElement('div');
            var textUserGif = document.createTextNode('`${}`');
            var textTitleGif = document.createTextNode('`${}`');
            divViolet.setAttribute('class', 'violet');
            divComand.setAttribute('class', 'comand-gif');
            divLikedGif.setAttribute('class', 'liked-gif');
            downloadGif.setAttribute('class', 'download-gif');
            expandGif.setAttribute('class', 'expand-gif');
            divInfoGif.setAttribute('class', 'info-gif');
            divUserGif.setAttribute('class', 'user-gif');
            divTitleGif.setAttribute('class', 'titulo-gif');
            divUserGif.appendChild(textUserGif);
            divTitleGif.appendChild(textTitleGif);
            divInfoGif.appendChild(divUserGif);
            divInfoGif.appendChild(divTitleGif);
            divComand.appendChild(divLikedGif);
            divComand.appendChild(downloadGif);
            divComand.appendChild(expandGif);
            divConteiner.appendChild(divViolet);
            divConteiner.appendChild(divComand);
            divConteiner.appendChild(divInfoGif);
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
} // ----------- ----------- RENDERIZADO DE GIFS TRENDINGS ----------- ------------- 
// ----------- ----------- RENDERIZADO DE GIFS TRENDINGS ----------- ------------- 


function renderTrends() {
  var response, responseJson, gifsTrends;
  return regeneratorRuntime.async(function renderTrends$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/trending?api_key=BpPaoUualXmjHhjGeOHKGBmKzx12PtYV"));

        case 2:
          response = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          responseJson = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(responseJson.data);

        case 8:
          gifsTrends = _context4.sent;
          // console.log(gifsTrends)
          gifsTrends.forEach(function (gif) {
            var containerTrends = document.getElementById('container-trends');
            var url = gif.images.original.url;
            var img = document.createElement('img');
            var divContainerTrends = document.createElement('div');
            img.setAttribute('src', "".concat(url));
            img.setAttribute('class', 'render-gif');
            containerTrends.setAttribute('class', 'container-trends');
            divContainerTrends.appendChild(img);
            containerTrends.appendChild(divContainerTrends);
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
}

renderTrends(); // ----------- ----------- SLIDER DE GIFS TRENDINGS ----------- ------------- 
// ----------- ----------- SLIDER DE GIFS TRENDINGS ----------- ------------- 

var contenedorSlider = document.getElementById('container-trends');
var flechaIzquierda = document.getElementById('flecha-izquierda');
var flechaDerecha = document.getElementById('flecha-derecha');
var sliderWidth = contenedorSlider.offsetWidth;
var sliderWidthInit = sliderWidth - 1071; // console.log(sliderWidth)

flechaDerecha.addEventListener('click', function () {
  contenedorSlider.scrollLeft = sliderWidthInit += 357;
});
flechaIzquierda.addEventListener('click', function () {
  contenedorSlider.scrollLeft = sliderWidthInit -= 357;
}); // ----------- ----------- FAVORITE SECCTION ----------- ------------- 
// ----------- ----------- FAVORITE SECCTION ----------- ------------- 

var favoriteButton = document.getElementById('boton-prueba1');
favoriteButton.addEventListener('click', function () {
  var sectionSerch = document.getElementById('section-serch');
  var sectionMain = document.getElementById('main');
  var favorite = document.getElementById('favorite');
  sectionSerch.style.display = "none";
  sectionMain.style.display = "none";
  favorite.style.display = "flex";
  var renderGifsFavorites = document.getElementById('render-gifs-favorite');
  renderGifsFavorites.innerHTML = "";
  showFavoritesGifs();
}); // ----------- ----------- RENDERIZADO DE GIFS FAVORITOS ----------- ------------- 
// ----------- ----------- RENDERIZADO DE GIFS FAVORITOS ----------- ------------- 

function showFavoritesGifs() {
  // console.log(localStorage)
  var sinGifsFavoritos = document.getElementById('sin-gifs-favoritos');
  var showStorage = localStorage;

  if (localStorage.length === 0) {
    sinGifsFavoritos.style.display = 'block';
  } else {
    sinGifsFavoritos.style.display = 'none'; // console.log(showStorage)

    Object.keys(showStorage).forEach(function (gif) {
      var gifJson = JSON.parse(localStorage.getItem(gif)); // console.log(gifJson)

      var url = gifJson.images.original.url;
      var gifTitle = gifJson.title;
      var userName = gifJson.username;
      var idGif = gifJson.id; // console.log(url)
      // console.log(gifTitle)
      // console.log(userName)

      var renderGifs = document.getElementById('render-gifs-favorite');
      var divConteiner = document.createElement('div');
      var img = document.createElement('img');
      divConteiner.setAttribute('class', 'favorite-render-img');
      img.setAttribute('src', "".concat(url));
      img.setAttribute('class', 'img-favorite');
      img.setAttribute('alt', 'esperando cargar GIF');
      divConteiner.appendChild(img);
      renderGifs.appendChild(divConteiner);
      var divViolet = document.createElement('div');
      var divComand = document.createElement('div');
      var divLikedGif = document.createElement('div');
      var downloadGif = document.createElement('div');
      var expandGif = document.createElement('div');
      var divInfoGif = document.createElement('div');
      var divUserGif = document.createElement('div');
      var divTitleGif = document.createElement('div');
      var textUserGif = document.createTextNode("".concat(userName));
      var textTitleGif = document.createTextNode("".concat(gifTitle));
      divViolet.setAttribute('class', 'violet-favorite');
      divComand.setAttribute('class', 'comand-gif-favorite');
      divLikedGif.setAttribute('class', 'liked-gif-favorite');
      downloadGif.setAttribute('class', 'download-gif-favorite');
      expandGif.setAttribute('class', 'expand-gif-favorite');
      divInfoGif.setAttribute('class', 'info-gif-favorite');
      divUserGif.setAttribute('class', 'user-gif-favorite');
      divTitleGif.setAttribute('class', 'titulo-gif-favorite');
      divUserGif.appendChild(textUserGif);
      divTitleGif.appendChild(textTitleGif);
      divInfoGif.appendChild(divTitleGif);
      divInfoGif.appendChild(divUserGif);
      divComand.appendChild(divLikedGif);
      divComand.appendChild(downloadGif);
      divComand.appendChild(expandGif);
      divConteiner.appendChild(divViolet);
      divConteiner.appendChild(divComand);
      divConteiner.appendChild(divInfoGif);

      if (localStorage.hasOwnProperty("".concat(idGif))) {
        divLikedGif.setAttribute('class', 'favorite-gif');
      }
    });
  }
} // ----------- ----------- REINICIO DE PAGINA ----------- ------------- 
// ----------- ----------- REINICIO DE PAGINA----------- ------------- 


var logo = document.getElementById('logo-desktop');
logo.addEventListener('click', function () {
  var sectionSerch = document.getElementById('section-serch');
  var sectionMain = document.getElementById('main');
  var favorite = document.getElementById('favorite');
  sectionSerch.style.display = "flex";
  sectionMain.style.display = "flex";
  favorite.style.display = "none";
});