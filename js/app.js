
let musicas = [
    {titulo: "Cheel", artista: "Blue Dream",  src: "./musicas/Blue Dream - Cheel.mp3", img: "./imagens/img1.jpg"},
    {titulo: "Jeremy Black", artista: "Hannon",  src: "./musicas/Hannon - Jeremy Black.mp3", img: "./imagens/img2.jpg"},
    {titulo: "Squadda B", artista: "North Oakland Extasy",  src: "./musicas/North Oakland Extasy - Squadda B.mp3", img: "./imagens/img3.jpg"}
];

let musica = document.querySelector("audio");
let indexMusica = 0;
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao i");
let duracao = document.querySelector(".fim");

renderizarMusica(indexMusica);

//Eventos 
musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector('.botao-play').addEventListener("click", tocarMusica);

document.querySelector('.botao-pause').addEventListener("click", pararMusica);

document.querySelector(".anterior").addEventListener("click", () => {
    indexMusica--;
    if(indexMusica < 0){
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block";
});

document.querySelector(".proxima").addEventListener("click", () => {
    indexMusica++;
    if(indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block";
});




//funcoes

function renderizarMusica(index){
    musica.setAttribute("src", musicas[index].src);
    musica.addEventListener("loadeddata", () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracao.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector(".botao-pause").style.display = "block";
    document.querySelector(".botao-play").style.display = "none";
}

function pararMusica(){
    musica.pause();
    document.querySelector(".botao-pause").style.display = "none";
    document.querySelector(".botao-play").style.display = "block";
    
}

function atualizarBarra(){
    let barra = document.querySelector("progress");
    barra.style.width = Math.floor((musica.currentTime/musica.duration)* 100) + "%";
    let tempoDecorrido = document.querySelector(".inicio");
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}


function segundosParaMinutos(segundos){
    let campoMinuto = Math.floor(segundos / 60);
    let campoSegundo = segundos % 60;
    if(campoSegundo < 10){
        campoSegundo = `0${campoSegundo}`;
    }
    return `${campoMinuto}:${campoSegundo}`;
}