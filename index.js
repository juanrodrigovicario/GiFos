import {API_KEY} from "./api_key.js"


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

const letrasAutocompletado = document.getElementById('input-search')
letrasAutocompletado.addEventListener('submit', autocompletado)

async function autocompletado(){
    let res = await fetch (`api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${letrasAutocompletado.value}`)
    let resJson = res.json()
    console.log(resJson)
    let datos = resJson.data
    console.log(datos)
}


// ----------- ----------- RENDERIZADO DE GIFS SEARCH ----------- ------------- 

const inputSearch = document.getElementById('form');
inputSearch.addEventListener('submit',function(event){
    event.preventDefault()
})

inputSearch.addEventListener('submit', renderGifs)
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
    gifs.forEach(function(element){
        // console.log(gif.images.original.url)
        const renderGifs = document.getElementById('render-gifs')
        const url = element.images.original.url
        const img = document.createElement('img')
        const divContenerImg = document.createElement('div')

        img.setAttribute('src', `${url}`)
        img.setAttribute('class', 'main-render-img')
        divContenerImg.appendChild(img)
        renderGifs.appendChild(divContenerImg)

    })
    renderButtonVerMas()
}

// renderizado del botono "VER MAS" una vez que se preciona "ENTER" para buscar
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

// funcion que permite ver 12 gif mas
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
        const getId = document.getElementById('render-gifs')
        const url = element.images.original.url
        const img = document.createElement('img')
        const divContenerImg = document.createElement('div')

        img.setAttribute('src',`${url}`)
        img.setAttribute('class', 'main-render-img')
        divContenerImg.appendChild(img)
        getId.appendChild(divContenerImg)
    })

}

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

const contenedorSlider = document.getElementById('container-trends')
const flechaIzquierda = document.getElementById('flecha-izquierda')
const flechaDerecha = document.getElementById('flecha-derecha')

let sliderWidth = contenedorSlider.offsetWidth
// console.log(sliderWidth)
flechaDerecha.addEventListener('click', () =>{
    contenedorSlider.scrollLeft = sliderWidth += 357;
}
)

flechaIzquierda.addEventListener('click', () =>{
    contenedorSlider.scrollLeft = sliderWidth -= 357;
}
)