import {API_KEY} from "./pueba2.js"

const form = document.getElementById('form')
form.addEventListener('submit', function(event){
    event.preventDefault()

})


form.addEventListener('submit',function(){
    let search = document.getElementById('form-serch').value
    renderGif(search)
    console.log(search)
    console.log(API_KEY)
})

async function renderGif(search){
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=12`)
    // console.log(response)
    let gifs = await response.json()
    console.log(gifs)
    const dataGifs = gifs.data;
    console.log(dataGifs)
    dataGifs.forEach((element) => {
        render(element)
    });
}

function render(element){
    const div = document.getElementById('render-gif')
    const url = element.images.original.url
    console.log(url)
    const imagen = document.createElement('img')
    imagen.setAttribute('src', `${url}`)
    div.appendChild(imagen)
}
async function renderTopics(){
    let response = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=BpPaoUualXmjHhjGeOHKGBmKzx12PtYV&limit=25&rating=g`)
    let  responseJson= await response.json();
    console.log(responseJson)
}
renderTopics()
// const button = document.getElementById('button')

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