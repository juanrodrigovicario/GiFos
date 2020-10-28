"use strict";

var _pueba = require("./pueba2.js");

var form = document.getElementById('form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
});
form.addEventListener('submit', function () {
  var search = document.getElementById('form-serch').value;
  renderGif(search);
  console.log(search);
  console.log(_pueba.API_KEY);
});

function renderGif(search) {
  var response, gifs, dataGifs;
  return regeneratorRuntime.async(function renderGif$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat(_pueba.API_KEY, "&q=").concat(search, "&limit=12")));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          gifs = _context.sent;
          console.log(gifs);
          dataGifs = gifs.data;
          console.log(dataGifs);
          dataGifs.forEach(function (element) {
            render(element);
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function render(element) {
  var div = document.getElementById('render-gif');
  var url = element.images.original.url;
  console.log(url);
  var imagen = document.createElement('img');
  imagen.setAttribute('src', "".concat(url));
  div.appendChild(imagen);
}

function renderTopics() {
  var response, responseJson;
  return regeneratorRuntime.async(function renderTopics$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          response = fetch("https://api.giphy.com/v1/gifs/trending?api_key=BpPaoUualXmjHhjGeOHKGBmKzx12PtYV&limit=25&rating=g");
          _context2.next = 3;
          return regeneratorRuntime.awrap(response.json());

        case 3:
          responseJson = _context2.sent;
          console.log(responseJson);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

renderTopics(); // const button = document.getElementById('button')
// button.addEventListener('click',function(){
//     let search = document.getElementById('search').value
//     renderGif(search)
//     console.log(search)
//     console.log(API_KEY)
// })
// async function renderGif(search){
//     let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=12`)
//     // console.log(response)
//     let gifs = await response.json()
//     console.log(gifs)
//     const dataGifs = gifs.data;
//     console.log(dataGifs)
//     dataGifs.forEach((element) => {
//         render(element)
//     });
// }
// function render(element){
//     const div = document.getElementById('render-gif')
//     const url = element.images.original.url
//     console.log(url)
//     const imagen = document.createElement('img')
//     imagen.setAttribute('src', `${url}`)
//     div.appendChild(imagen)
// }