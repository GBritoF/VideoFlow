const containerVideos = document.querySelector(".videos__container");

async function converteApi() {
    const api = await fetch('http://localhost:3000/videos')
    const apiConvertida = await api.json()
    try {

        apiConvertida.forEach((video)=> {
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class="descricao-video">
                            <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                            <p class="titulo-canal">${video.descricao}</p>
                            <p class="categoria" hidden>${video.categoria}</p>  
                         </div>
                      
                </li>
                `;
        })
    } catch (error) {
        containerVideos.innerHTML = `
        <p> Houve um erro ao carregar os Videos: ${error} </p>
        `
    }
}
converteApi()

const barraDePesquisa = document.querySelector(".pesquisar__input")

barraDePesquisa.addEventListener("input", () =>{
    const videos = document.querySelectorAll(".videos__item")

    if(barraDePesquisa.value != "") {
        for(let video of videos){
            let titulo =  video.querySelector(".titulo-video").textContent.toLowerCase()
            let valorFiltro = barraDePesquisa.value.toLowerCase()

            if(!titulo.includes(valorFiltro)) {
                video.style.display = "none"
            } else {
                video.style.display = "block"
            }
        }
    } else {
        video.style.display = "block"
    }
})

const botaoCategoria = document.querySelectorAll(".superior__item")

botaoCategoria.forEach((categoria) => {
    let nomeCategoria = categoria.getAttribute("name")
    categoria.addEventListener("click", () => filtroPorCategoria(nomeCategoria))
})  

function filtroPorCategoria(nomeCategoria) {
    const videos = document.querySelectorAll(".videos__item")
        for(let video of videos){
            let categoria = video.querySelector(".categoria").textContent.toLocaleLowerCase()
            let valorFiltro = nomeCategoria.toLocaleLowerCase();

            if(!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
                video.style.display = "none"
            } else {
                video.style.display = "block"
            }
        }
}


const botaoToggle = document.querySelector(".cabecalho__switch-slider")

botaoToggle.addEventListener("click", () => {
    const html = document.querySelector("html")
    html.classList.toggle("toggle")
})