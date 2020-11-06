import {API_KEY} from "./api_key.js"

// ----------- ----------- CAMBIO DE NOCTURNO A DIURNO ----------- ------------- 
// ----------- ----------- CAMBIO DE NOCTURNO A DIURNO ----------- ------------- 

let bottoModoNocturno = document.getElementById('bottom-modo-nocturno');
bottoModoNocturno.addEventListener('click', toggleRender)
// bottoModoNocturno.addEventListener('click', function(){
//     if(bottoModoNocturno.innerHTML==='MODO DIURNO'){
//         bottoModoNocturno.innerHTML='MODO NOCTURNO'
//     }else{
//         bottoModoNocturno.innerHTML='MODO DIURNO'
//     }
// })

function toggleRender(){
    document.getElementById('menu-line-hover').classList.toggle('trending-dark')
    document.getElementById('body').classList.toggle('dark')
    document.getElementById('boton-prueba').classList.toggle('anchor-dark')
    document.getElementById('boton-prueba1').classList.toggle('anchor-dark')
    document.getElementById('boton-prueba2').classList.toggle('anchor-dark')
    // document.querySelectorAll('.anchor').classList.toggle('anchor-dark')
    document.getElementById('input-search').classList.toggle('dark')
    document.getElementById('trending-section').classList.toggle('trending-dark')
    
}

// ----------- ----------- AUTOCOMPLETADO DE BUSQUEDA ----------- ------------- 
// ----------- ----------- AUTOCOMPLETADO DE BUSQUEDA ----------- ------------- 

const letrasAutocompletado = document.getElementById('input-search')
letrasAutocompletado.addEventListener('keyup', autocompletado)

// letrasAutocompletado.addEventListener('key', function(){
//     console.log(letrasAutocompletado.value)
// })

async function autocompletado(){
    let letras =  letrasAutocompletado.value;
    let res = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${letras}`);
    let resJason = await res.json()
    let suggestions = resJason.data
    const cuadroBusqueda = document.getElementById('cuadro-de-busqueda')
    const divConteiner = document.getElementById('suggestions')
    divConteiner.innerHTML = '';
    
    suggestions.forEach( word => {
        const divsSuggestion = document.createElement('div')
        const suggestion = document.createTextNode(`${word.name}`)

        divsSuggestion.appendChild(suggestion)
        divsSuggestion.setAttribute('class', 'suggestion')
        divConteiner.appendChild(divsSuggestion)
        divConteiner.setAttribute('class', 'suggestions')
        cuadroBusqueda.appendChild(divConteiner)

        divsSuggestion.addEventListener('click', renderGifs)
        divsSuggestion.addEventListener('click', delateSuggestios)
        divsSuggestion.addEventListener('click', function(){
            // console.log(word.name)
            const title = document.getElementById('main-title')
            const p = document.getElementById('main-p')
            p.innerHTML = '';
            title.innerHTML =`${word.name.toUpperCase()}`;
            title.style.fontSize = '35px';
        })
    })

}

// ----------- ----------- ELIMINA AUTOSUGERENCIA DEL BUSCADOR  ----------- ------------- 
// ----------- ----------- ELIMINA AUTOSUGERENCIA DEL BUSCADOR  ----------- ------------- 

function delateSuggestios(){
    const divConteiner = document.getElementById('suggestions')
    divConteiner.innerHTML = '';
}

// ----------- ----------- RENDERIZADO DE GIFS - SEARCH ----------- ------------- 
// ----------- ----------- RENDERIZADO DE GIFS - SEARCH ----------- ------------- 

const inputSearch = document.getElementById('form');
inputSearch.addEventListener('submit',function(event){
    event.preventDefault()
})

inputSearch.addEventListener('submit', renderGifs)
// let userSearch = document.getElementById('input-search').value
// inputSearch.addEventListener('submit', renderNameSearch(userSearch))
// inputSearch.addEventListener('submit', renderButtonVerMas)

async function renderGifs(){
    let userSearch = document.getElementById('input-search').value
    // console.log(userSearch)
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${userSearch}&limit=12&offset=$0&rating=g&lang=en`)
    let gifsResponse = await response.json()
    let gifs = gifsResponse.data
    // console.log(gifs.data)
    // let gif = gifs.data[0].images.original.url
    // console.log(gif)
    const renderGifs = document.getElementById('render-gifs')
    renderGifs.innerHTML = '';

    gifs.forEach(function(element){
        const url = element.images.original.url

        const divConteiner = document.createElement('div')
        const img = document.createElement('img')

        divConteiner.setAttribute('class', 'main-render-img')
        img.setAttribute('src', `${url}`)
        img.setAttribute('class', 'img')
        img.setAttribute('alt', 'esperando cargar GIF')

        divConteiner.appendChild(img)
        renderGifs.appendChild(divConteiner)

        // ------ AL PASAR EL "MOUSEOVER" DE "IMG" MUESTRAS EL FONDO VIOLETA + CARACT. ---------
        // ------ AL PASAR EL "MOUSEOVER" DE "IMG" MUESTRAS EL FONDO VIOLETA + CARACT. ---------

        
        img.addEventListener('mouseover', showComands)
        img.addEventListener('mouseout', hideComands)

        function showComands(){
            const divViolet = document.createElement('div')
            const divComand = document.createElement('div')
            const divLikedGif = document.createElement('div')
            const downloadGif = document.createElement('div')
            const expandGif = document.createElement('div')
            const divInfoGif = document.createElement('div')
            const divUserGif = document.createElement('div')
            const divTitleGif = document.createElement('div')
            const textUserGif = document.createTextNode('user')
            const textTitleGif = document.createTextNode('title')
            
            divViolet.setAttribute('class', 'violet')
            divComand.setAttribute('class', 'comand-gif')
            divLikedGif.setAttribute('class', 'liked-gif')
            downloadGif.setAttribute('class', 'download-gif')
            expandGif.setAttribute('class', 'expand-gif')
            divInfoGif.setAttribute('class', 'info-gif')
            divUserGif.setAttribute('class', 'user-gif')
            divTitleGif.setAttribute('class', 'titulo-gif')

            divUserGif.appendChild(textUserGif)
            divTitleGif.appendChild(textTitleGif)
            divInfoGif.appendChild(divTitleGif)
            divInfoGif.appendChild(divUserGif)
            divComand.appendChild(divLikedGif)
            divComand.appendChild(downloadGif)
            divComand.appendChild(expandGif)

            divConteiner.appendChild(divViolet)
            divConteiner.appendChild(divComand)
            divConteiner.appendChild(divInfoGif)
        }

        function hideComands(){
            const divViolet = document.querySelector('.violet')
            divViolet.style.display="none";
        }
    })

    renderNameSearch(userSearch)
    delateSuggestios()
    const renderButtonMas = document.querySelector('#div-button')
    renderButtonMas.innerHTML = '';
    renderButtonVerMas()
}

// ------ RENDERIZA EL NOMBRE DE "LA BUSQEUDA" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------
// ------ RENDERIZA EL NOMBRE DE "LA BUSQEUDA" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------

function renderNameSearch(userSearch){
    const title = document.getElementById('main-title')
    const p = document.getElementById('main-p')
    p.innerHTML = '';
    title.innerHTML =`${userSearch.toUpperCase()}`;
    title.style.fontSize = '35px';
}

// ------ RENDERIZA BOTON "VER MAS" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------
// ------ RENDERIZA BOTON "VER MAS" AL PRECIONARSE "ENTER" PARA BUSCAR  ---------

function renderButtonVerMas(){
    const renderButtonMas = document.querySelector('#div-button')
    let buttonVerMas = document.createElement('button')
    const textButton = document.createTextNode('ver mas')

    buttonVerMas.appendChild(textButton)
    buttonVerMas.setAttribute('class', 'button-ver-mas-class')
    // buttonVerMas.setAttribute('id', 'button-ver-mas-id' )
    renderButtonMas.appendChild(buttonVerMas)

    buttonVerMas.addEventListener('click',  render12GIfMas)
}

// ----------- ------------- FUNCION QUE PERMITE VER 12 GIFS MAS ----------- -------------
// ----------- ------------- FUNCION QUE PERMITE VER 12 GIFS MAS ----------- -------------

let offset = 0;
    async function render12GIfMas(){
    offset+=12
    let userSearch = document.getElementById('input-search').value
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${userSearch}&limit=12&offset=${offset}&rating=g&lang=en`)
    const jsonResponse = await response.json()
    // console.log(jsonResponse)
    const responseData = jsonResponse.data
    // console.log(responseData)
    responseData.forEach(function(element){
        // const getId = document.getElementById('render-gifs')
        // const url = element.images.original.url
        // const img = document.createElement('img')
        // const divContenerImg = document.createElement('div')

        // img.setAttribute('src',`${url}`)
        // img.setAttribute('class', 'main-render-img')
        // divContenerImg.appendChild(img)
        // getId.appendChild(divContenerImg)
        const renderGifs = document.getElementById('render-gifs')

        const url = element.images.original.url

        const divConteiner = document.createElement('div')
        const img = document.createElement('img')

        divConteiner.setAttribute('class', 'main-render-img')
        img.setAttribute('src', `${url}`)
        img.setAttribute('class', 'img')
        img.setAttribute('alt', 'esperando cargar GIF')

        divConteiner.appendChild(img)
        renderGifs.appendChild(divConteiner)

        img.addEventListener('mouseover', showComands)
        img.removeEventListener('mouseout', showComands)
        function showComands(){

            const divViolet = document.createElement('div')
            const divComand = document.createElement('div')
            const divLikedGif = document.createElement('div')
            const downloadGif = document.createElement('div')
            const expandGif = document.createElement('div')
            const divInfoGif = document.createElement('div')
            const divUserGif = document.createElement('div')
            const divTitleGif = document.createElement('div')
            const textUserGif = document.createTextNode('user')
            const textTitleGif = document.createTextNode('title')
            
            divViolet.setAttribute('class', 'violet')
            divComand.setAttribute('class', 'comand-gif')
            divLikedGif.setAttribute('class', 'liked-gif')
            downloadGif.setAttribute('class', 'download-gif')
            expandGif.setAttribute('class', 'expand-gif')
            divInfoGif.setAttribute('class', 'info-gif')
            divUserGif.setAttribute('class', 'user-gif')
            divTitleGif.setAttribute('class', 'titulo-gif')

            divUserGif.appendChild(textUserGif)
            divTitleGif.appendChild(textTitleGif)
            divInfoGif.appendChild(divTitleGif)
            divInfoGif.appendChild(divUserGif)
            divComand.appendChild(divLikedGif)
            divComand.appendChild(downloadGif)
            divComand.appendChild(expandGif)

            divConteiner.appendChild(divViolet)
            divConteiner.appendChild(divComand)
            divConteiner.appendChild(divInfoGif)
        }
    })

}

// ----------- ----------- RENDERIZADO DE GIFS TRENDINGS ----------- ------------- 
// ----------- ----------- RENDERIZADO DE GIFS TRENDINGS ----------- ------------- 

async function renderTrends(){
    let response = await fetch (`https://api.giphy.com/v1/gifs/trending?api_key=BpPaoUualXmjHhjGeOHKGBmKzx12PtYV`)
    let responseJson = await response.json()
    let gifsTrends = await responseJson.data
    // console.log(gifsTrends)
    gifsTrends.forEach((gif) => {
        const containerTrends = document.getElementById('container-trends')
        const url = gif.images.original.url
        const img = document.createElement('img')
        const divContainerTrends = document.createElement('div')

        img.setAttribute('src',`${url}`)
        img.setAttribute('class', 'render-gif')
        containerTrends.setAttribute('class', 'container-trends')

        divContainerTrends.appendChild(img)
        containerTrends.appendChild(divContainerTrends)
    }
    )

}
renderTrends()

// ----------- ----------- SLIDER DE GIFS TRENDINGS ----------- ------------- 
// ----------- ----------- SLIDER DE GIFS TRENDINGS ----------- ------------- 

const contenedorSlider = document.getElementById('container-trends')
const flechaIzquierda = document.getElementById('flecha-izquierda')
const flechaDerecha = document.getElementById('flecha-derecha')

let sliderWidth = contenedorSlider.offsetWidth
let sliderWidthInit = sliderWidth - 1071;
// console.log(sliderWidth)
flechaDerecha.addEventListener('click', () =>{
    contenedorSlider.scrollLeft = sliderWidthInit += 357;
}
)

flechaIzquierda.addEventListener('click', () =>{
    contenedorSlider.scrollLeft = sliderWidthInit -= 357;
}
)