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
} // ----------- ----------- RENDERIZADO DE GIFS SEARCH ----------- ------------- 


var inputSearch = document.getElementById('form');
inputSearch.addEventListener('submit', function (event) {
  event.preventDefault();
});
inputSearch.addEventListener('submit', renderGifs); // inputSearch.addEventListener('submit', renderButtonVerMas)

function renderGifs() {
  var userSearch, response, gifsResponse, gifs;
  return regeneratorRuntime.async(function renderGifs$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userSearch = document.getElementById('input-search').value; // console.log(userSearch)

          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(_api_key.API_KEY, "&q=").concat(userSearch, "&limit=12&offset=$0&rating=g&lang=en")));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          gifsResponse = _context.sent;
          gifs = gifsResponse.data; // console.log(gifs.data)
          // let gif = gifs.data[0].images.original.url
          // console.log(gif)

          gifs.forEach(function (element) {
            // console.log(gif.images.original.url)
            var renderGifs = document.getElementById('render-gifs');
            var url = element.images.original.url;
            var img = document.createElement('img');
            var divContenerImg = document.createElement('div');
            img.setAttribute('src', "".concat(url));
            img.setAttribute('class', 'main-render-img');
            divContenerImg.appendChild(img);
            renderGifs.appendChild(divContenerImg);
          });
          renderButtonVerMas();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
} // renderizado del botono "VER MAS" una vez que se preciona "ENTER" para buscar


function renderButtonVerMas() {
  var renderButtonMas = document.querySelector('#div-button');
  var buttonVerMas = document.createElement('button');
  var textButton = document.createTextNode('ver mas');
  buttonVerMas.appendChild(textButton);
  buttonVerMas.setAttribute('class', 'button-ver-mas-class'); // buttonVerMas.setAttribute('id', 'button-ver-mas-id' )

  renderButtonMas.appendChild(buttonVerMas);
  buttonVerMas.addEventListener('click', render12GIfMas);
} // funcion que permite ver 12 gif mas


var offset = 0;

function render12GIfMas() {
  var userSearch, response, jsonResponse, responseData;
  return regeneratorRuntime.async(function render12GIfMas$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          offset += 12;
          userSearch = document.getElementById('input-search').value;
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(_api_key.API_KEY, "&q=").concat(userSearch, "&limit=12&offset=").concat(offset, "&rating=g&lang=en")));

        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          jsonResponse = _context2.sent;
          // console.log(jsonResponse)
          responseData = jsonResponse.data; // console.log(responseData)

          responseData.forEach(function (element) {
            var getId = document.getElementById('render-gifs');
            var url = element.images.original.url;
            var img = document.createElement('img');
            var divContenerImg = document.createElement('div');
            img.setAttribute('src', "".concat(url));
            img.setAttribute('class', 'main-render-img');
            divContenerImg.appendChild(img);
            getId.appendChild(divContenerImg);
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
} // ----------- ----------- RENDERIZADO DE GIFS TRENDINGS ----------- ------------- 


function renderTrends() {
  var response, responseJson, gifsTrends;
  return regeneratorRuntime.async(function renderTrends$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/trending?api_key=BpPaoUualXmjHhjGeOHKGBmKzx12PtYV&limit=3&rating=g"));

        case 2:
          response = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          responseJson = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(responseJson.data);

        case 8:
          gifsTrends = _context3.sent;
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
          return _context3.stop();
      }
    }
  });
}

renderTrends();